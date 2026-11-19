import { describe, expect, it } from "vitest";

import { buildWhatsAppBookingUrl, SALON_WHATSAPP_NUMBER, salonBookingSchema } from "@/lib/salon-booking";
import { salonDetails, salonGallery, salonProcessVideos, salonServices } from "@/lib/salon-content";

describe("salon booking requests", () => {
  it("requires a service, date, and preferred time", () => {
    expect(salonBookingSchema.safeParse({ service: "", preferredDate: "2027-05-18", preferredTime: "14:00" }).success).toBe(false);
    expect(salonBookingSchema.safeParse({ service: "Gel Nails", preferredDate: "2027-05-18", preferredTime: "" }).success).toBe(false);
  });

  it("creates a WhatsApp message with the requested booking details", () => {
    const booking = salonBookingSchema.parse({
      service: "Gel Nails",
      preferredDate: "2027-05-18",
      preferredTime: "14:30",
      details: "Short almond shape",
    });
    const url = new URL(buildWhatsAppBookingUrl(booking));
    const message = url.searchParams.get("text");

    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe(`/${SALON_WHATSAPP_NUMBER}`);
    expect(message).toContain("Service: Gel Nails");
    expect(message).toContain("Preferred time: 14:30");
    expect(message).toContain("Additional details: Short almond shape");
    expect(message).toContain("pending salon confirmation");
  });

  it("allows an empty optional note and rejects notes over 500 characters", () => {
    const base = { service: "Manicure", preferredDate: "2027-05-18", preferredTime: "09:00" };

    expect(salonBookingSchema.safeParse(base).success).toBe(true);
    expect(salonBookingSchema.safeParse({ ...base, details: "a".repeat(501) }).success).toBe(false);
  });

  it("offers the selected hair services in the appointment choices", () => {
    const serviceNames = salonServices.map((service) => service.name);

    expect(serviceNames).toContain("Braids & protective styles");
    expect(serviceNames).toContain("Wash & styling");
    expect(serviceNames).toContain("Cuts & colour");
    for (const service of ["Braids & protective styles", "Wash & styling", "Cuts & colour"]) {
      expect(salonBookingSchema.safeParse({ service, preferredDate: "2027-05-18", preferredTime: "14:00" }).success).toBe(true);
    }
  });

  it("includes hairstyles in the gallery and displays the confirmed salon details", () => {
    expect(salonGallery.some((work) => work.category === "Hairstyles")).toBe(true);
    expect(salonGallery.some((work) => work.category === "Haircuts")).toBe(true);
    expect(salonProcessVideos).toHaveLength(3);
    expect(salonDetails.location).toContain("Soshanguve Crossing");
    expect(new URL(salonDetails.mapUrl).searchParams.get("q")).toBe("-25.550888,28.091579");
    expect(salonDetails.mapLink).toBe("https://maps.app.goo.gl/DmUbPT1vMFHQYDUf7");
    expect(salonDetails.instagram).toBe("https://www.instagram.com/friendly_salon?jplx=dTQyMWlhMGszbjNj");
    expect(salonDetails.facebook).toBe("https://www.facebook.com/share/1EEiip1VZF/");
    expect(salonDetails.phone).toBe("+27 64 480 5516");
    expect(salonDetails.whatsapp).toBe(salonDetails.phone);
    expect(salonDetails.hours).toContain("9:00 AM");
    expect(salonDetails.hours).toContain("6:00 PM");
  });
});
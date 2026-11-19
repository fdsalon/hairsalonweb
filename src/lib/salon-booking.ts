import { z } from "zod";

export const salonBookingSchema = z.object({
  service: z.string().trim().min(1, "Please choose a service.").max(80),
  preferredDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date.")
    .refine((value) => {
      const date = new Date(`${value}T12:00:00`);
      return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
    }, "Please choose a valid date."),
  preferredTime: z
    .string()
    .trim()
    .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Please choose a preferred time."),
  details: z.string().trim().max(500, "Please keep your note under 500 characters.").optional(),
});

export type SalonBooking = z.infer<typeof salonBookingSchema>;

export const SALON_WHATSAPP_NUMBER = "27644805516";

export function buildWhatsAppBookingUrl(booking: SalonBooking, phoneNumber = SALON_WHATSAPP_NUMBER) {
  const date = new Date(`${booking.preferredDate}T12:00:00`);
  const readableDate = new Intl.DateTimeFormat("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  const message = [
    "Hello FRIENDLY SALON, I'd love to request an appointment.",
    `Service: ${booking.service}`,
    `Preferred date: ${readableDate}`,
    `Preferred time: ${booking.preferredTime}`,
    booking.details ? `Additional details: ${booking.details}` : undefined,
    "I understand this request is pending salon confirmation.",
  ]
    .filter(Boolean)
    .join("\n");
  const digitsOnlyNumber = phoneNumber.replace(/\D/g, "");
  const recipient = digitsOnlyNumber.length >= 10 ? `${digitsOnlyNumber}?` : "?";

  return `https://wa.me/${recipient}text=${encodeURIComponent(message)}`;
}
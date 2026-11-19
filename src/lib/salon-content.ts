import acrylicImage from "@/assets/friendly pics/acr2.jpg";
import acrylicArtImage from "@/assets/friendly pics/acri4.jpg";
import christmasNailArtImage from "@/assets/friendly pics/acri5.jpg";
import braidsImage from "@/assets/friendly pics/hair2.jpg";
import braidStyleImage from "@/assets/friendly pics/hair1.jpg";
import braidDetailImage from "@/assets/friendly pics/hair3.jpg";
import braidingProcessImage from "@/assets/friendly pics/hair4.jpg";
import haircutImage from "@/assets/friendly pics/cut1.jpg";
import haircutDetailImage from "@/assets/friendly pics/cut2.jpg";
import haircutProcessImage from "@/assets/friendly pics/cut3.jpg";
import salonTeamImage from "@/assets/friendly pics/cut4.jpg";
import gelImage from "@/assets/friendly pics/gel1.jpg";
import manicureImage from "@/assets/friendly pics/mani1.jpg";
import pedicureImage from "@/assets/friendly pics/pdi1.jpg";
import washStylingImage from "@/assets/friendly pics/wash1.jpg";
import braidingVideo from "@/assets/friendly pics/braidingvid.mp4";
import nailFinishVideo from "@/assets/friendly pics/nailingvid.mp4";
import nailArtVideo from "@/assets/friendly pics/nailstuffvid.mp4";

export const salonDetails = {
  name: "FRIENDLY SALON",
  location: "Soshanguve Crossing, Soshanguve",
  address: "Soshanguve Crossing, Soshanguve, South Africa",
  phone: "+27 64 480 5516",
  whatsapp: "+27 64 480 5516",
  email: "Salon email address to be added",
  hours: "Daily, 9:00 AM – 6:00 PM",
  instagram: "https://www.instagram.com/friendly_salon?jplx=dTQyMWlhMGszbjNj",
  tiktok: "TikTok profile to be added",
  facebook: "https://www.facebook.com/share/1EEiip1VZF/",
  mapLink: "https://maps.app.goo.gl/DmUbPT1vMFHQYDUf7",
  mapUrl: "https://maps.google.com/maps?q=-25.550888%2C28.091579&t=&z=17&ie=UTF8&iwloc=&output=embed",
};

export const salonServices = [
  {
    name: "Manicures",
    category: "Care",
    description: "A considered ritual for beautifully groomed nails and softer hands.",
    duration: "Duration to be added",
    price: "Price to be added",
    image: manicureImage,
    imageAlt: "A careful manicure in a softly lit nail studio",
  },
  {
    name: "Gel nails",
    category: "Colour",
    description: "A smooth, glossy finish in a shade that feels entirely your own.",
    duration: "Duration to be added",
    price: "Price to be added",
    image: gelImage,
    imageAlt: "A bold red gel nail set with a glossy finish",
  },
  {
    name: "Acrylic nails",
    category: "Enhancements",
    description: "Beautifully shaped enhancements, tailored to your preferred length.",
    duration: "Duration to be added",
    price: "Price to be added",
    image: acrylicImage,
    imageAlt: "Polished almond nails in rose, ivory, and delicate gold",
  },
  {
    name: "Nail art",
    category: "Colour",
    description: "Thoughtful details and hand-finished designs for your next statement.",
    duration: "Duration to be added",
    price: "Price to be added",
    image: christmasNailArtImage,
    imageAlt: "Fine gold detailing on a soft rose and ivory manicure",
  },
  {
    name: "Pedicures",
    category: "Care",
    description: "A restorative foot-care moment, finished with a beautifully neat polish.",
    duration: "Duration to be added",
    price: "Price to be added",
    image: pedicureImage,
    imageAlt: "A fresh rose-nude pedicure in an ivory spa setting",
  },
  {
    name: "Braids & protective styles",
    category: "Hair",
    description: "Braids and protective styling, tailored to the look you have in mind.",
    duration: "Duration to be added",
    price: "Price to be added",
    image: braidsImage,
    imageAlt: "Long neat braids being finished by a stylist in a warm salon",
  },
  {
    name: "Wash & styling",
    category: "Hair",
    description: "A fresh wash, nourishing treatment, blow-dry or styled finish.",
    duration: "Duration to be added",
    price: "Price to be added",
    image: washStylingImage,
    imageAlt: "A stylist gently washing natural hair at a salon basin",
  },
  {
    name: "Cuts & colour",
    category: "Hair",
    description: "A considered cut or colour refresh, finished to suit your style.",
    duration: "Duration to be added",
    price: "Price to be added",
    image: haircutImage,
    imageAlt: "A barber shaping a short haircut in the salon",
  },
] as const;

export const salonGallery = [
  { image: gelImage, title: "Red, in full gloss", category: "Gel nails", alt: "Long red gel nails with a glossy finish" },
  { image: manicureImage, title: "French finish", category: "Manicures", alt: "A neat French manicure on natural nails" },
  { image: christmasNailArtImage, title: "A little detail", category: "Nail art", alt: "Hand-painted cherry nail art with gems" },
  { image: pedicureImage, title: "Fresh French tips", category: "Pedicures", alt: "A French-tip pedicure with a clean finish" },
  { image: acrylicImage, title: "Soft and sculpted", category: "Acrylic nails", alt: "Long pink and burgundy acrylic nail art" },
  { image: acrylicArtImage, title: "Scarlet statement", category: "Acrylic nails", alt: "Long red acrylic nails with delicate details" },
  { image: braidStyleImage, title: "Soft curls", category: "Hairstyles", alt: "A finished curly hairstyle at the salon" },
  { image: braidsImage, title: "Braided beautifully", category: "Hairstyles", alt: "Neat cornrow braids styled to the side" },
  { image: braidDetailImage, title: "Braids from every angle", category: "Hairstyles", alt: "Neat braids viewed from the back" },
  { image: braidingProcessImage, title: "Hands at work", category: "Hairstyles", alt: "A stylist carefully braiding natural hair" },
  { image: haircutImage, title: "Sharp lines", category: "Haircuts", alt: "A fresh short haircut with a shaved design" },
  { image: haircutDetailImage, title: "A fresh fade", category: "Haircuts", alt: "A young client showing off a fresh fade" },
  { image: haircutProcessImage, title: "The finishing touch", category: "Haircuts", alt: "A stylist brushing a short blonde haircut" },
  { image: salonTeamImage, title: "At the salon", category: "Haircuts", alt: "Salon staff and clients together outside the salon" },
];

export const salonProcessVideos = [
  {
    title: "Braiding, strand by strand",
    description: "See the care and detail behind a protective style.",
    src: braidingVideo,
    poster: braidingProcessImage,
  },
  {
    title: "Nail artistry in progress",
    description: "A closer look at nail art taking shape.",
    src: nailArtVideo,
    poster: christmasNailArtImage,
  },
  {
    title: "The finishing touches",
    description: "From careful prep to a polished nail finish.",
    src: nailFinishVideo,
    poster: manicureImage,
  },
] as const;

export const studioValues = [
  { number: "01", title: "Considered care", description: "A thoughtful, personal approach to every visit." },
  { number: "02", title: "The little details", description: "Beautiful shaping and a careful, polished finish." },
  { number: "03", title: "A fresh perspective", description: "Creative looks, made to feel like you." },
  { number: "04", title: "Time to unwind", description: "A warm welcome and room to slow down." },
] as const;
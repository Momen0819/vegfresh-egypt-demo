/** Company facts shared by every language. Update here once confirmed by the client. */
export const site = {
  // TODO: replace with the real domain once it is registered.
  url: "https://www.vegfreshegypt.com",
  whatsappNumber: "201023838144",
  whatsappDisplay: "+20 102 383 8144",
  whatsappChannel: "https://whatsapp.com/channel/0029Vb8rIBO6WaKqEMwJWQ2D",
  youtube: "https://youtube.com/@vegfreshpotato",
  facebook: "https://www.facebook.com/profile.php?id=61592464941315",
  slogan: "Good Food, Good Life",
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

interface WhatsappMessageParams {
  name: string;
  phone: string;
  message: string;
  recipientNumber: string;
}

/**
 * Helper to generate a prefilled WhatsApp link with proper encoding
 */
export const generateWhatsappLink = ({ name, phone, message, recipientNumber }: WhatsappMessageParams): string => {
  const text = `New enquiry from CoRWA website\n\nFull Name: ${name}\nPhone Number: ${phone}\nMessage: ${message}`;
  return `https://wa.me/${recipientNumber}?text=${encodeURIComponent(text)}`;
};

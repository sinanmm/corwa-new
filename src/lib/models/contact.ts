import mongoose, { Document, Schema, models } from 'mongoose';

export interface IContact extends Document {
  name: string;
  phone: string;
  message: string;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    phone: { type: String, required: [true, 'Phone number is required'] },
    message: { type: String, required: [true, 'Message is required'] },
  },
  { timestamps: true }
);

const Contact = models.Contact || mongoose.model<IContact>('Contact', contactSchema);

export default Contact;

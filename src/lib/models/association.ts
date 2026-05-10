import mongoose, { Document, Schema, models } from 'mongoose';

export interface IAssociation extends Document {
  name: string;
  nameEn?: string;
  taluk: string;
  district: string;
  category: string;
  contactPerson?: string;
  phone?: string;
  slug: string;
  isActive: boolean;
}

const associationSchema = new Schema<IAssociation>(
  {
    name: { type: String, required: [true, 'Association name is required'], trim: true },
    nameEn: { type: String, trim: true },
    taluk: { type: String, required: [true, 'Taluk is required'], index: true },
    district: { type: String, required: [true, 'District is required'], index: true },
    category: { type: String, default: 'General', index: true },
    contactPerson: { type: String },
    phone: { type: String },
    slug: { type: String, index: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

associationSchema.pre('save', async function () {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
});

// models[...] check prevents re-compiling model on hot reload
const Association = models.Association || mongoose.model<IAssociation>('Association', associationSchema);

export default Association;

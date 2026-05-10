import 'dotenv/config';
import mongoose from 'mongoose';
import { associationsData } from '../data/associations';

const MONGODB_URI = process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/corwa';

const associationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    nameEn: { type: String, trim: true },
    taluk: { type: String, required: true },
    district: { type: String, required: true },
    category: { type: String, default: 'General' },
    contactPerson: String,
    phone: String,
    slug: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

associationSchema.pre('save', async function () {
  if (this.isModified('name')) {
    this.slug = (this.name as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
});

const Association = mongoose.models.Association || mongoose.model('Association', associationSchema);

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('DB connection successful!');

  if (process.argv[2] === '--delete') {
    await Association.deleteMany({});
    console.log('Data successfully deleted!');
  } else {
    await Association.deleteMany({});
    await Association.insertMany(associationsData);
    console.log(`Seeded ${associationsData.length} associations.`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

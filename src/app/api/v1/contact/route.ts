import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Contact from '@/lib/models/contact';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const newContact = await Contact.create(body);
    return Response.json(
      {
        status: 'success',
        data: { contact: newContact },
        message: 'Message sent successfully.',
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ status: 'fail', message }, { status: 400 });
  }
}

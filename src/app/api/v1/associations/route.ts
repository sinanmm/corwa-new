import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Association from '@/lib/models/association';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = request.nextUrl;

    const queryObj: Record<string, unknown> = {};
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];

    for (const [key, value] of searchParams.entries()) {
      if (!excludedFields.includes(key)) {
        queryObj[key] = value;
      }
    }

    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const filter = search
      ? { ...queryObj, name: new RegExp(search, 'i') }
      : queryObj;

    const [associations, totalCount] = await Promise.all([
      Association.find(filter).skip(skip).limit(limit),
      Association.countDocuments(filter),
    ]);

    return Response.json({
      status: 'success',
      results: associations.length,
      data: {
        associations,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ status: 'fail', message }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const newAssociation = await Association.create(body);
    return Response.json(
      { status: 'success', data: { association: newAssociation } },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ status: 'fail', message }, { status: 400 });
  }
}

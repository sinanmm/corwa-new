import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Association from '@/lib/models/association';

export async function GET(_req: NextRequest, ctx: RouteContext<'/api/v1/associations/[id]'>) {
  try {
    await connectDB();
    const { id } = await ctx.params;
    const association = await Association.findById(id);

    if (!association) {
      return Response.json(
        { status: 'fail', message: 'No association found with that ID' },
        { status: 404 }
      );
    }

    return Response.json({ status: 'success', data: { association } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ status: 'fail', message }, { status: 404 });
  }
}

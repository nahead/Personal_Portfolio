import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// Migrate icon column to support URLs
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const adminSecret = process.env.ADMIN_SECRET;

  if (!authHeader || !adminSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  if (token !== adminSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Update icon column to support longer URLs
    await sql`
      ALTER TABLE projects
      ALTER COLUMN icon TYPE VARCHAR(500)
    `;

    return NextResponse.json({
      message: 'Migration completed successfully',
      details: 'Icon column updated to VARCHAR(500)'
    });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json({
      error: 'Migration failed',
      details: error.message
    }, { status: 500 });
  }
}

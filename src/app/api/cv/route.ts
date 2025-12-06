import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'cv-luis-betancourt.pdf');
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="CV Garcia Betancourt Jose Luis.pdf"',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error serving CV:', error);
    return new NextResponse('CV not found', { status: 404 });
  }
}

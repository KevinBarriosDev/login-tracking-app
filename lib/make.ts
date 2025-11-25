type NotificationData = {
  usuario: string
  fecha: string
  hora: string
}

export async function notifyMake(data: NotificationData) {
  try {
    const response = await fetch(process.env.MAKE_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Make webhook failed: ${response.status}`)
    }

    console.log('✅ Notificación enviada a Make')
  } catch (error) {
    console.error('❌ Error al notificar Make:', error)
    throw error
  }
}

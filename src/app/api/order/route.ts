import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const now = new Date()
    const date = now.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    const time = now.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    })

    const orderData = {
      order_id: body.order_id,
      date,
      time,
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      anlass: body.anlass,
      empfaenger: body.empfaenger,
      geschichte: body.geschichte,
      klang: body.klang,
      stil: body.stil,
      spezialzeile: body.spezialzeile || ''
    }

    const queueResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/queues/${process.env.CF_QUEUE_ID}/messages/batch`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CF_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [{
            body: orderData
          }]
        })
      }
    )

    const responseText = await queueResponse.text()
    console.log('Cloudflare Response Status:', queueResponse.status)
    console.log('Cloudflare Response Body:', responseText)

    if (!queueResponse.ok) {
      throw new Error(`Queue Fehler: ${queueResponse.status} - ${responseText}`)
    }

    return NextResponse.json({
      success: true,
      order_id: orderData.order_id
    })

  } catch (error) {
    console.error('API Fehler:', error)
    return NextResponse.json(
      { success: false, error: 'Fehler beim Senden' },
      { status: 500 }
    )
  }
}

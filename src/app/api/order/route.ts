import { NextRequest, NextResponse } from 'next/server'

const sendToProducer = async (orderData: any, retries = 3): Promise<boolean> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(
        process.env.CF_PRODUCER_URL!,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.CF_API_KEY!
          },
          body: JSON.stringify(orderData)
        }
      )
      if (response.ok) return true
      throw new Error(`HTTP ${response.status}`)
    } catch (error) {
      if (i === retries - 1) return false
      await new Promise(r => setTimeout(r, 1000 * (i + 1)))
    }
  }
  return false
}

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

    const success = await sendToProducer(orderData)

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Producer nicht erreichbar' },
        { status: 503 }
      )
    }

    return NextResponse.json({
      success: true,
      order_id: orderData.order_id
    })

  } catch (error) {
    console.error('API Fehler:', error)
    return NextResponse.json(
      { success: false, error: 'Interner Fehler' },
      { status: 500 }
    )
  }
}

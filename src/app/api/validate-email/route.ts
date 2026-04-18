import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    const response = await fetch(
      `https://api.zerobounce.net/v2/validate?api_key=${process.env.ZEROBOUNCE_API_KEY}&email=${encodeURIComponent(email)}&ip_address=`,
      { method: 'GET' }
    )

    const data = await response.json()

    const validStatuses = ['valid', 'catch-all']
    const isValid = validStatuses.includes(data.status)

    return NextResponse.json({
      valid: isValid,
      status: data.status,
      subStatus: data.sub_status
    })
  } catch (error) {
    console.error('ZeroBounce Fehler:', error)
    return NextResponse.json({ valid: true })
  }
}

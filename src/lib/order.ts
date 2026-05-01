export function generateOrderId(): number {
  if (typeof window === 'undefined') return 1
  const stored = localStorage.getItem('audynia_last_order_id')
  const last = stored ? parseInt(stored) : 0
  const next = last + 1
  localStorage.setItem('audynia_last_order_id', next.toString())
  return next
}

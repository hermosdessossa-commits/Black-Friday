/** Prochain vendredi 23:59:59 (fin des deals). */
export function nextFriday2359() {
  const d = new Date()
  const day = d.getDay()
  const add = (5 - day + 7) % 7 || 7
  d.setDate(d.getDate() + add)
  d.setHours(23, 59, 59, 0)
  return d.toISOString()
}

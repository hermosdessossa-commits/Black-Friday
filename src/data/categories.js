export const CATEGORIES = [
  { id: 'tech', label: 'Tech', emoji: '🎧', gradient: 'from-sky-500 to-indigo-700' },
  { id: 'mode', label: 'Mode', emoji: '👟', gradient: 'from-fuchsia-500 to-purple-700' },
  { id: 'maison', label: 'Maison', emoji: '🛋️', gradient: 'from-amber-500 to-orange-700' },
  { id: 'beaute', label: 'Beauté', emoji: '💄', gradient: 'from-rose-500 to-pink-700' },
  { id: 'sport', label: 'Sport', emoji: '🏋️', gradient: 'from-emerald-500 to-teal-700' },
]

export const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? id
export const categoryEmoji = (id) => CATEGORIES.find((c) => c.id === id)?.emoji ?? '🛍️'

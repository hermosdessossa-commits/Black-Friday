export const CATEGORIES = [
  { id: 'tech', label: 'Tech', emoji: '🎧', gradient: 'from-sky-500 to-indigo-700' },
  { id: 'mode', label: 'Mode', emoji: '👟', gradient: 'from-fuchsia-500 to-purple-700' },
]

export const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? id
export const categoryEmoji = (id) => CATEGORIES.find((c) => c.id === id)?.emoji ?? '🛍️'

export const dateTimeParsed = (date?: string) => {
  if (!date) return ''

  return new Date(date).toLocaleString('ES-CO', { hourCycle: 'h12' })
}

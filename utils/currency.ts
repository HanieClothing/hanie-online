export const formatToRM = (amount: number) => new Intl.NumberFormat('ms-MY', {
  style: 'currency',
  currency: 'MYR',
}).format(amount)

export function formatDropdownOptions(
  data: any[],
  valueKey: string,
  nameKey: string
) {
  const formattedData = data.map((item, idx) => ({
    key: `${idx}-${item[valueKey]}`,
    value: item[valueKey],
    text: item[nameKey],
  }));

  return formattedData;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

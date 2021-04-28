import moment from 'moment';
import { DateRangeType } from '../components/RangeDatePicker';
import {
  NormalizedProducts,
  Product,
} from '../containers/products/product.types';

export function filterByDateRange(
  items: any[],
  dateKey: string,
  { startDate, endDate }: DateRangeType
) {
  return items.filter((item) => {
    const createdAtMoment = moment(item[dateKey]);
    const startDateMatch = startDate
      ? startDate.isSameOrBefore(createdAtMoment, 'day')
      : true;
    const endDateMatch = endDate
      ? endDate.isSameOrAfter(createdAtMoment, 'day')
      : true;

    return startDateMatch && endDateMatch;
  });
}

export function formatNormalizedProducts(
  products: Product[]
): NormalizedProducts {
  const allIds: NormalizedProducts['allIds'] = [];
  const allNames: NormalizedProducts['allNames'] = [];
  const byId: NormalizedProducts['byId'] = {};
  const byName: NormalizedProducts['byName'] = {};

  products.forEach((product) => {
    const productId = product.id.toString();
    allIds.push(productId);
    allNames.push(product.name);
    byId[productId] = { ...product };
    byName[product.name] = { ...product };
  });
  return {
    allIds,
    allNames,
    byId,
    byName,
  };
}

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

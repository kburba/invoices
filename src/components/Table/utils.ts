import moment from 'moment';
import { TableValueTypes } from './table.types';

export function formatCellValue(value: any, type?: TableValueTypes) {
  switch (type) {
    case TableValueTypes.DATE: {
      const intValue = parseInt(value);
      return moment(intValue).format('L');
    }
    default:
      return value;
  }
}

import React, { useState } from 'react';
import moment from 'moment';
import { DateRangePicker, FocusedInputShape } from 'react-dates';

type Props = {
  dateRange: DateRangeType;
  onChange: (dateRange: DateRangeType) => void;
};

export type DateRangeType = {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
};

export default function RangeDatePicker({ dateRange, onChange }: Props) {
  const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(
    null
  );

  return (
    <div>
      <DateRangePicker
        startDate={dateRange.startDate} // momentPropTypes.momentObj or null,
        startDateId="start_date_id" // PropTypes.string.isRequired,
        endDate={dateRange.endDate} // momentPropTypes.momentObj or null,
        endDateId="end_date_id" // PropTypes.string.isRequired,
        isOutsideRange={() => false}
        onDatesChange={({ startDate, endDate }) =>
          onChange({ startDate, endDate })
        } // PropTypes.func.isRequired,
        focusedInput={dateFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={(focused) => setDateFocused(focused)}
      />
    </div>
  );
}

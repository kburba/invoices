import React, { useState } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

type Props = {
  value: moment.Moment;
  onChange: (value: moment.Moment | null) => void;
};

export default function DatePicker({ value, onChange }: Props) {
  const [dateFocused, setDateFocused] = useState(false);

  return (
    <div>
      <SingleDatePicker
        date={value}
        onDateChange={onChange}
        isOutsideRange={() => false}
        focused={dateFocused}
        numberOfMonths={1}
        onFocusChange={({ focused }) => setDateFocused(focused)}
        id="singleDatePicker"
      />
    </div>
  );
}

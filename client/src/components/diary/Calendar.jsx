import { useState } from 'react';
import { Group } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mantine/dates';
import { updateDate } from '../../slices/dateSlice';

function Calendar() {
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.date.selectedDate);
  const [newDate, setNewDate] = useState(currentDate);

  const handleDateChange = (newDate) => {
    const unixTime = new Date(newDate).getTime();
    dispatch(updateDate(unixTime));
    setNewDate(newDate);
  };

  return (
    <Group position="center">
      <DatePicker
        defaultDate={newDate}
        value={newDate}
        onChange={handleDateChange}
      />
    </Group>
  );
}

export default Calendar;

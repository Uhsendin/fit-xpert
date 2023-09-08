import { useState } from 'react';
import { Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

function Calendar() {
  const currentDate = new Date();

  const [selectedDate, setSelectedDate] = useState(currentDate);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <Group position="center">
      <DatePicker
        defaultDate={currentDate}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </Group>
  );
}

export default Calendar;

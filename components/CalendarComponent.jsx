import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleSelectDate = (date) => {
    setSelectedDate(date.dateString);
    onSelectDate(date.dateString); // Skicka tillbaka det valda datumet till CalendarScreen
  };

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

  const markedDates = {
    //'2023-04-15': { marked: true, dotColor: 'green' },
    //'2023-04-20': { marked: true, dotColor: 'blue' },
    //'2023-04-25': { marked: true, dotColor: 'red' },
    [selectedDate]: { selected: true },
    [tomorrow.toISOString().slice(0, 10)]: { marked: true, dotColor: 'purple' },
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleSelectDate}
        markedDates={markedDates}
        theme={{
          calendarBackground: '#ffffff',
          todayTextColor: '#3452A2',
          dayTextColor: '#3452A2',
          arrowColor: '#3452A2',
          monthTextColor: '#3452A2',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default CalendarComponent;

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today.toISOString().slice(0, 10));
  }, []);

  const handleSelectDate = (date) => {
    setSelectedDate(date.dateString);
    onSelectDate(date.dateString); // Skicka tillbaka det valda datumet till CalendarScreen
  };

  const markedDates = {
    [selectedDate]: { selected: true },
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

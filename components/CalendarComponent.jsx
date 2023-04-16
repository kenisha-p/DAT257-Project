import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleSelectDate = (date) => {
    setSelectedDate(date.dateString);
    onSelectDate(date.dateString); // Skicka tillbaka det valda datumet till CalendarScreen
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleSelectDate}
        markedDates={{ [selectedDate]: { selected: true } }}
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

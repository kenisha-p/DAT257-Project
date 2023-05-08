import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

const Calendar = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(moment());

  const handlePreviousMonth = () => {
    setSelectedDate(prev => prev.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setSelectedDate(prev => prev.clone().add(1, 'month'));
  };

  const renderCalendarHeader = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <TouchableOpacity onPress={handlePreviousMonth}>
          <Text style={{ fontSize: 20 }}>{'<'} Prev</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>{selectedDate.format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={{ fontSize: 20 }}>Next {'>'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCalendarDays = () => {
    const weekdays = moment.weekdaysShort();
    return (
      <View style={{ flexDirection: 'row' }}>
        {weekdays.map((weekday, index) => (
          <Text key={index} style={{ flex: 1, textAlign: 'center' }}>{weekday}</Text>
        ))}
      </View>
    );
  };

  const renderCalendarDates = () => {
    const monthStart = selectedDate.clone().startOf('month');
    const monthEnd = selectedDate.clone().endOf('month');
    const startDate = monthStart.clone().subtract(monthStart.day(), 'days');
    const endDate = monthEnd.clone().add(6 - monthEnd.day(), 'days');
    const dates = [];

    while (startDate.isBefore(endDate)) {
      dates.push(startDate.clone());
      startDate.add(1, 'day');
    }

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {dates.map((date, index) => (
          <TouchableOpacity key={index} onPress={() => handleSelectDate(date.format('YYYY-MM-DD'))}>
            <Text style={{ flex: 1, textAlign: 'center', marginVertical: 5, color: selectedDate.isSame(date, 'day') ? 'red' : 'black' }}>{date.format('D')}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={{ padding: 10 }}>
      {renderCalendarHeader()}
      {renderCalendarDays()}
      {renderCalendarDates()}
    </View>
  );
};

export default Calendar;

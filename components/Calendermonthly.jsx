import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const UsageDaily = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonthPress = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonthPress = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const getMonthName = (date) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[date.getMonth()];
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonthPress}>
          <MaterialIcons name="chevron-left" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{getMonthName(selectedDate)} {selectedDate.getFullYear()}</Text>
        <TouchableOpacity onPress={handleNextMonthPress}>
          <MaterialIcons name="chevron-right" size={32} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <View style={styles.contentContainer}>
        <Text style={styles.selectedDateText}>Your usage on: {selectedDate.toLocaleDateString()}</Text>
        {/* Render the rest of the content here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: '#3452A2',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UsageDaily;
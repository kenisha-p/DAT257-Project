import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const BookingOverviewItem = ({ date, startTime, endTime }) => {
  return (
    <View style={styles.bookingItem}>
      <Text style={styles.bookingDate}>{date}</Text>
      <Text style={styles.bookingTime}>{startTime} - {endTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bookingItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 10,
  },
  bookingDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookingTime: {
    fontSize: 16,
  },
});

export default BookingOverviewItem;

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { deleteDoc } from "firebase/firestore";
import db from '../config';

const BookedTimes = ({ id, date, startTime, endTime, removeItem }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(db, `myCollection/${id}`);
      removeItem(id); // call the function passed as prop to update the state in the parent component
    } catch (error) {
      console.log('Error deleting document:', error);
    }
  };

  return (
    <View style={styles.bookingItem}>
      <Text style={styles.bookingDate}>{date}</Text>
      <Text style={styles.bookingTime}>{startTime} - {endTime}</Text>
      <TouchableOpacity onPress={handleDelete}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bookingItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    flex: 1,
  },
  bookingTime: {
    fontSize: 16,
    flex: 1,
  },
  removeText: {
    color: '#ff0000',
    fontSize: 16,
  },
});

export default BookedTimes;
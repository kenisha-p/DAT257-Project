import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { collection, query, orderBy, getDocs } from "firebase/firestore"; 
import db from '../config';

const BookingOverviewScreen = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const q = query(collection(db, "time"), orderBy("date"));
      const querySnapshot = await getDocs(q);
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      setBookings(docs);
    };
    fetchBookings();
  }, []);

  const renderBookingItem = ({ item }) => {
    return (
      <View style={styles.bookingItem}>
        <Text style={styles.bookingDate}>{item.date}</Text>
        <Text style={styles.bookingTime}>{item.startTime} - {item.endTime}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.date}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
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

export default BookingOverviewScreen;

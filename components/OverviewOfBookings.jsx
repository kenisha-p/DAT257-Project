import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { collection, query, orderBy, getDocs } from "firebase/firestore"; 
import db from '../config';
import BookingOverviewItem from './BookingOverviewItem';

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
      <BookingOverviewItem
        date={item.date}
        startTime={item.startTime}
        endTime={item.endTime}
      />
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
});

export default BookingOverviewScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import db from '../config';

const BookingTimesScreen = () => {
  const [bookingTimes, setBookingTimes] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('bookingTimes')
      .onSnapshot((snapshot) => {
        const times = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookingTimes(times);
      });

    return () => unsubscribe();
  }, []);

  const renderBookingTime = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.date}</Text>
      <Text>{item.startTime} - {item.endTime}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={bookingTimes}
        renderItem={renderBookingTime}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default BookingTimesScreen;

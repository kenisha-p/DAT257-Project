import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Calendar from '../components/Calendar';
import TimePicker from '../components/TimePicker';
import SaveButton from '../components/SaveButton';
import { collection, addDoc } from "firebase/firestore"; 
import db from '../config';

const BookingTimesScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [bookingTimes, setBookingTimes] = useState([]);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const handleSelectStartTime = (time) => {
    setStartTime(time);
  };

  const handleSelectEndTime = (time) => {
    setEndTime(time);
  };

  const saveBookingTime = async () => {
    console.log(`Selected Date: ${selectedDate}`);
    console.log(`Start Time: ${startTime.toLocaleTimeString()}`);
    console.log(`End Time: ${endTime.toLocaleTimeString()}`);

    try {
      const docRef = await addDoc(collection(db, "bookingTimes"), {
        date: selectedDate,
        startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      console.log("Document written with ID: ", docRef.id);

      setBookingTimes([
        ...bookingTimes,
        { date: selectedDate, startTime, endTime }
      ]);
      
      setSelectedDate(null);
      setStartTime(new Date());
      setEndTime(new Date());

    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar onSelectDate={handleSelectDate} />
      </View>
      <View style={styles.timePickersContainer}>
        <View style={styles.timePickerWrapper}>
          <Text style={styles.timePickerLabel}>Start Time</Text>
          <View style={styles.timePickerContainer}>
            <TimePicker onChange={handleSelectStartTime} date={startTime} />
          </View>
        </View>
        <View style={{ width: 80 }} />
        <View style={styles.timePickerWrapper}>
          <Text style={styles.timePickerLabel}>End Time</Text>
          <View style={styles.timePickerContainer}>
            <TimePicker onChange={handleSelectEndTime} date={endTime} />
          </View>
        </View>
      </View>
      <View style={styles.saveButton}>
        <SaveButton onPress={saveBookingTime} />
      </View>
      <View style={styles.bookingTimesContainer}>
        {bookingTimes.map((bookingTime, index) => (
          <View key={index} style={styles.bookingTime}>
            <Text style={styles.bookingTimeText}>
              {bookingTime.date.toDateString()}
            </Text>
            <Text style={styles.bookingTimeText}>
              {bookingTime.startTime.toLocaleTimeString()} - {bookingTime.endTime.toLocaleTimeString()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  calendarContainer: {
    flex: 1,
  },
  timePickersContainer: {
    flexDirection: 'row',
    alignItems: '

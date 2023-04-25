import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Calendar from "../components/CalendarComponent";
import { collection, addDoc } from "firebase/firestore";
import db from "../config";
import axios from "axios";

const UsageDaily = () => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleSelectDate = (date) => {
      setSelectedDate(date);
      // Do something with the selected date
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <Calendar onSelectDate={handleSelectDate} />
        </View>
        <View style={styles.contentContainer}>
        <Text style={styles.selectedDateText}>Your usage on: {selectedDate}</Text>
          {/* Add additional content here */}
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
      margin: 10,
      borderRadius: 10,
      overflow: 'hidden',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    selectedDateText: {
        fontSize: 16, // Change font size as needed
        fontWeight: 'bold', // Make text bold
      },
  });
  
  export default UsageDaily;
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Calendar from "../components/CalendarComponent";
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from "../config";
import axios from "axios";


const UsageDaily = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [numWashes, setNumWashes] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const [electricCost, setElectricCost] = useState(0);
  const [waterUsage, setWaterUsage] = useState(0);

  

  const getBookingInfo = async (selectedDate) => {
    const bookingsRef = db.collection('time');
    const querySnapshot = await bookingsRef.where('date', '==', selectedDate).get();
    
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push(doc.data());
    });
  
    return bookings;
  };
  
  const handleSelectDate = async (date) => {
    setSelectedDate(date);
  
    const timeRef = collection(db, 'time');
    const q = query(timeRef, where('date', '==', date));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const totalPrice = querySnapshot.docs.reduce((total, doc) => total + doc.data().price, 0); //calculates the total cost of one day
      const avgPrice = totalPrice / querySnapshot.size; //calculates average cost per booking of that day, is that what we want?
      setAvgPrice(avgPrice.toFixed(2));
    } else {
      setAvgPrice(0);
    }

    if (!querySnapshot.empty) {
        const totalPrice = querySnapshot.docs.reduce((total, doc) => total + doc.data().price, 0); 
        setElectricCost(totalPrice.toFixed(2));
      } else {
        setElectricCost(0);
      }

      if (!querySnapshot.empty) {
        const numBookings = querySnapshot.docs.length;
        setNumWashes(numBookings);
        setWaterUsage(numBookings*150 + ' litres') //a washer uses about 50 litres of water per cycle, and an average cycle is about 1 hour
      } else {
        setNumWashes(0);
        setWaterUsage(0)
      }

  };


  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
         onSelectDate={handleSelectDate}/>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.selectedDateText}>Your usage on: {selectedDate}</Text>
        <View style={styles.blueSquare}>
          <View style={styles.leftLabelContainer}>
            <Text style={styles.leftLabel}>Number of washes:</Text>
            <Text style={styles.leftLabel}>Average price:</Text>
            <Text style={styles.leftLabel}>Electric cost:</Text>
            <Text style={styles.leftLabel}>Water usage:</Text>
          </View>
          <View style={styles.rightLabelContainer}>
            <Text style={styles.rightLabel} >{numWashes}</Text>
            <Text style={styles.rightLabel}>{avgPrice}</Text>
            <Text style={styles.rightLabel}>{electricCost}</Text>
            <Text style={styles.rightLabel}>{waterUsage}</Text>
          </View>
        </View>
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
  blueSquare: {
    backgroundColor: '#3452A2',
    borderRadius: 10,
    padding: 30,
    margin: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    height: '85%'
  },
  leftLabelContainer: {
    alignItems: 'flex-start',
    marginRight: 10,
  },
  leftLabel: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20
  },
  rightLabelContainer: {
    alignItems: 'flex-end',
  },
  rightLabel: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20
  },
  selectedDateText: {
    fontSize: 16, // Change font size as needed
    fontWeight: 'bold', // Make text bold
  },
});
export default UsageDaily;
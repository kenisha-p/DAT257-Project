import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import CalendarComponent from "../components/Calendermonthly";
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from "../config";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";


const UsageMonthly = ({ navigation }) => {
  const [numWashes, setNumWashes] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const [electricCost, setElectricCost] = useState(0);
  const [waterUsage, setWaterUsage] = useState(0);

  const BLUE_BAR_HEIGHT = 50;

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
    // Get the first day of the selected month
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    
    // Get the last day of the selected month
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
    // Get the bookings for the selected month
    const bookingsRef = db.collection('time');
    const querySnapshot = await bookingsRef
      .where('date', '>=', firstDayOfMonth)
      .where('date', '<=', lastDayOfMonth)
      .get();
      
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push(doc.data());
    });
  
    // Calculate the combined usage
    const totalPrice = bookings.reduce((total, booking) => total + booking.price, 0);
    const avgPrice = totalPrice / bookings.length;
    setAvgPrice(avgPrice.toFixed(2));
  
    const numBookings = bookings.length;
    setNumWashes(numBookings);
  
    const washingTime = 60; // in minutes
    const waterPerWash = 50; // in liters
    const waterUsage = numBookings * washingTime * waterPerWash;
    setWaterUsage(waterUsage + ' litres');
  
    // Calculate the electric cost
    const electricCost = totalPrice + 0.1 * waterUsage;
    setElectricCost(electricCost.toFixed(2));
  };

  const handleBlueBarPress = () => {
    console.log('Blue Bar pressed');
    // Add your code to handle the press event here

    navigation.navigate('UsageDaily'); // Changed to 'UsageDaily'
  };
  return (
    <View style={styles.container}>
      <View style={styles.blueBarContainer}>
        <View style={styles.blueBarLeft}>
          <Text style={styles.blueBarText}>Monthly</Text>
        </View>
        <View style={styles.whiteLine}/>
        <View style={styles.blueBarRight}>
          <TouchableOpacity onPress= {handleBlueBarPress}>
            <Text style={styles.blueBarText}>Daily</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <CalendarComponent onSelectDate={handleSelectDate} />
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
backgroundColor: '#F2F2F2',
},
blueBarContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#3452A2',
  height: 50,
  paddingHorizontal: 20,
},
blueBarLeft: {
marginRight: 10,
},
blueBarRight: {
marginLeft: 10,
},
blueBarText: {
color: '#FFFFFF',
fontSize: 20,
},
whiteLine: {
width: 2,
height: 30,
backgroundColor: '#FFFFFF',
},
contentContainer: {
padding: 20,
flex: 1,
justifyContent: 'space-between',
},
blueSquare: {
backgroundColor: '#0066CC',
paddingVertical: 20,
paddingHorizontal: 30,
borderRadius: 10,
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
},
leftLabelContainer: {
flex: 1,
},
rightLabelContainer: {
flex: 1,
alignItems: 'flex-end',
},
leftLabel: {
color: '#FFFFFF',
fontSize: 16,
marginBottom: 10,
},
rightLabel: {
color: '#FFFFFF',
fontSize: 16,
marginBottom: 10,
},
});

export default UsageMonthly;
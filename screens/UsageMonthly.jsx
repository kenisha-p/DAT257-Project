import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Calendar from "../components/CalendarComponent";
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from "../config";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";


const UsageMonthly = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
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

  const handleBlueBarPress = () => {
    console.log('Blue Bar pressed');
    // Add your code to handle the press event here

    navigation.navigate('UsageDaily');
  };

  const handleMonthBarPress = () => {
    console.log('Month Bar pressed');
    // Add your code to handle the press event here
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
        <View style={styles.MonthBarContainer}>
          <View style={styles.MonthBarLeft}>
            <Text style={styles.MonthBarText}>Previous</Text>
          </View>
          <View style={styles.whiteLine}/>
          <View style={styles.MonthBarRight}>
          <TouchableOpacity onPress= {handleMonthBarPress}>
            <Text style={styles.MonthBarText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      <View style={styles.contentContainer}>
        <Text style={styles.selectedDateText}>Your usage for: January{selectedDate}</Text>
        <View style={styles.whiteSquare}>
          <View style={styles.leftLabelContainer}>
            <Text style={styles.leftLabel}>Number of washes:</Text>
            <Text style={styles.leftSubLabel}>+4 compared to previous month</Text>
            <Text style={styles.leftLabel}>Average price:</Text>
            <Text style={styles.leftSub2Label}>-0,18kr/kWh compared to previous month</Text>
            <Text style={styles.leftLabel}>Electric cost:</Text>
            <Text style={styles.leftSub3Label}>+24 kr compared to last month</Text>
            <Text style={styles.leftLabel}>Water usage:</Text>
            <Text style={styles.leftSub4Label}>+40 litres compared to last month</Text>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  whiteSquare: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 30,
    margin: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    height: '70%'
  },
  leftLabelContainer: {
    alignItems: 'flex-start',
    marginRight: 10,
  },
  leftLabel: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  leftSubLabel: {
    color: '#FF0000',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 20,
    marginTop: 2,
  },
  leftSub2Label: {
    color: '#00ff00',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 20,
    marginTop: 2,
  },
  leftSub3Label: {
    color: '#FF0000',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 20,
    marginTop: 2,
  },
  leftSub4Label: {
    color: '#FF0000',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 20,
    marginTop: 2,
  },
  rightLabelContainer: {
    alignItems: 'flex-end',
  },
  rightLabel: {
    color: '#000000',
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20
  },
  selectedDateText: {
    fontSize: 16, // Change font size as needed
    fontWeight: 'bold', // Make text bold
  },
  blueBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: '#3452A2',
  },
  blueBarLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: '#ffffff',
    borderRightWidth: 2,
    borderLeftColor: '#ffffff',
    borderLeftWidth: 2,
    height: '100%',
    backgroundColor: '#8292C4',
  },
  blueBarRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: '#ffffff',
    borderRightWidth: 2,
    height: '100%',
    backgroundColor: '#3452A2',
  },
  blueBarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  MonthBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    marginTop: 15,
  },
  MonthBarLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: '#ffffff',
    borderRightWidth: 2,
    borderLeftColor: '#ffffff',
    borderLeftWidth: 2,
    height: '100%',
    backgroundColor: '#ffffff',
  },
  MonthBarRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: '#ffffff',
    borderRightWidth: 2,
    height: '100%',
    backgroundColor: '#ffffff',
  },
  MonthBarText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default UsageMonthly;
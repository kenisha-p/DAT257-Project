import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, } from "react-native";
import Calendar from "../components/CalendarComponent";
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from "../config";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDoc, doc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';


const getStartOfPrevMonth = (selectedDate) => {
  const [year, month] = selectedDate.split('-');
  const prevMonth = month === '01' ? '12' : String(Number(month) - 1).padStart(2, '0');
  const prevYear = month === '01' ? String(Number(year) - 1) : year;
  return `${prevYear}-${prevMonth}-01`;
};

const getEndOfPrevMonth = (selectedDate) => {
  const [year, month] = selectedDate.split('-');
  const prevMonth = month === '01' ? '12' : String(Number(month) - 1).padStart(2, '0');
  const prevYear = month === '01' ? String(Number(year) - 1) : year;
  const lastDay = new Date(prevYear, prevMonth, 0).getDate();
  return `${prevYear}-${prevMonth}-${lastDay}`;
};
const getMonthName = (dateString) => {
  const date = new Date(dateString);
  const monthIndex = date.getMonth();
  const monthNames = [
    'January','February','March','April','May','June','July','August','September','October','November',
    'December',
  ];
  return monthNames[monthIndex];
};
const UsageMonthly = ({ navigation }) => {
  const BLUE_BAR_HEIGHT = 50;

  const getCurrentMonth = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentMonth());
  const [numWashes, setNumWashes] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const [electricCost, setElectricCost] = useState(0);
  const [waterUsage, setWaterUsage] = useState(0);


  const [prevNumWashes, setPrevNumWashes] = useState(0);
  const [prevAvgPrice, setPrevAvgPrice] = useState(0);
  const [prevElectricCost, setPrevElectricCost] = useState(0);
  const [prevWaterUsage, setPrevWaterUsage] = useState(0);
  const [currentMonthName, setCurrentMonthName] = useState('');


  const getEndOfMonth = (selectedDate) => {
    const [year, month] = selectedDate.split('-');
    const lastDay = new Date(year, month - 1, 0).getDate();
    return `${year}-${month}-${lastDay}`;
  };

  const getBookingInfo = async (selectedDate) => {
    const bookingsRef = db.collection('time');
    const querySnapshot = await bookingsRef
      .where('date', '>=', selectedDate)
      .where('date', '<=', getEndOfMonth(selectedDate))
      .get();

    console.log('Query Snapshot:', querySnapshot);

    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push(doc.data());
    });

    console.log('Bookings:', bookings);

    return bookings;
  };

  useEffect(() => {
    const fetchBookingInfo = async () => {
      const bookings = await getBookingInfo(selectedDate);
      console.log('Fetched Bookings:', bookings);
      // Update the state with the fetched bookings or perform any required operations
    };
  
    fetchBookingInfo();
  }, [selectedDate]);
  
  useEffect(() => {
    const fetchDataForSelectedDate = async () => {
      await handleSelectDate(selectedDate);
      // Perform any additional operations based on the selected date
    };
  
    fetchDataForSelectedDate();
  }, [selectedDate]);

  const handleSelectDate = async (date) => {
    setSelectedDate(date);
  
    // Update current month name
    const monthName = getMonthName(date);
    setCurrentMonthName(monthName);
    const timeRef = collection(db, 'time');
    const startOfMonth = date + '-01';
    const endOfMonth = getEndOfMonth(date);
    const q = query(timeRef, where('date', '>=', startOfMonth), where('date', '<=', endOfMonth));
    const querySnapshot = await getDocs(q);
  
    console.log('Query Snapshot:', querySnapshot);
  
    if (!querySnapshot.empty) {
      const totalPrice = querySnapshot.docs.reduce((total, doc) => total + doc.data().price, 0);
      const avgPrice = totalPrice / querySnapshot.size;
      console.log('Total Price:', totalPrice);
      console.log('Avg Price:', avgPrice);
      setAvgPrice(avgPrice.toFixed(2));
    } else {
      setAvgPrice(0);
    }
  
    if (!querySnapshot.empty) {
      const totalPrice = querySnapshot.docs.reduce((total, doc) => total + doc.data().price, 0); 
      setElectricCost(totalPrice.toFixed(2) + 'kr' );
    } else {
      setElectricCost(0);
    }
  
   if (!querySnapshot.empty) {
      const numBookings = querySnapshot.docs.length;
      const docRef = doc(db, 'Settings', 'settings');
      const docSnap = await getDoc(docRef);
      const waterValue = docSnap.data().Water; // Accessing the 'Water' field from the 'Settings' document
      setNumWashes(numBookings*docSnap.data().Wash);
      setWaterUsage(numBookings * waterValue * docSnap.data().Wash + ' litres');
    } else {
      setNumWashes(0);
      setWaterUsage(0);
    }

  
    // Calculate usage for previous month
    const startOfPrevMonth = getStartOfPrevMonth(date);
    const endOfPrevMonth = getEndOfPrevMonth(date);
  
    const prevMonthQ = query(timeRef, where('date', '>=', startOfPrevMonth), where('date', '<=', endOfPrevMonth));
    const prevMonthSnapshot = await getDocs(prevMonthQ);
  
    if (!prevMonthSnapshot.empty) {
      const prevTotalPrice = prevMonthSnapshot.docs.reduce((total, doc) => total + doc.data().price, 0);
      const prevAvgPrice = prevTotalPrice / prevMonthSnapshot.size;
      const prevNumBookings = prevMonthSnapshot.docs.length;

      const docRef = doc(db, 'Settings', 'settings');
      const docSnap = await getDoc(docRef);
      const waterValue = docSnap.data().Water; // Accessing the 'Water' field from the 'Settings' document
  
      setPrevAvgPrice(prevAvgPrice.toFixed(2));
      setPrevNumWashes(prevNumBookings*docSnap.data().Wash);
      setPrevElectricCost(prevTotalPrice.toFixed(2) + 'kr');
      setPrevWaterUsage(prevNumBookings * waterValue * docSnap.data().Wash + ' litres');
    } else {
      setPrevAvgPrice(0);
      setPrevNumWashes(0);
      setPrevElectricCost(0);
      setPrevWaterUsage(0);
    }
  };
    

  

  const handleBlueBarPress = () => {
    console.log('Blue Bar pressed');
    // Add your code to handle the press event here

    navigation.navigate('UsageDaily');
  };

  const handlePrevPress = () => {
    // Extract the current year and month from the selected date
    const [year, month] = selectedDate.split('-');
  
    // Convert the year and month to numbers
    const yearNumber = Number(year);
    const monthNumber = Number(month);
  
    // Calculate the year and month of the previous month
    const previousMonthYear = monthNumber === 1 ? yearNumber - 1 : yearNumber;
    const previousMonth = monthNumber === 1 ? 12 : monthNumber - 1;
  
    // Format the previous month as a string with leading zeros
    const previousMonthString = `${previousMonthYear}-${previousMonth.toString().padStart(2, '0')}`;
  
    // Update the selected date to the first day of the previous month
    setSelectedDate(previousMonthString);
  };

  const handleNextPress = () => {
    // Extract the current year and month from the selected date
    const [year, month] = selectedDate.split('-');
  
    // Convert the year and month to numbers
    const yearNumber = Number(year);
    const monthNumber = Number(month);
  
    // Calculate the year and month of the next month
    const nextMonthYear = monthNumber === 12 ? yearNumber + 1 : yearNumber;
    const nextMonth = monthNumber === 12 ? 1 : monthNumber + 1;
  
    // Format the next month as a string with leading zeros
    const nextMonthString = `${nextMonthYear}-${nextMonth.toString().padStart(2, '0')}`;
  
    // Update the selected date to the next month
    setSelectedDate(nextMonthString);
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
            <TouchableOpacity onPress={handlePrevPress}>
              <Icon name="chevron-left" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.whiteLine} />
          <View style={styles.MonthBarCenter}> 
            <Text style={styles.currentMonthText}>
                {getMonthName(selectedDate)}
             </Text>
          </View>
          <View style={styles.whiteLine} />
          <View style={styles.MonthBarRight}>
            <TouchableOpacity onPress={handleNextPress}>
              <Icon name="chevron-right" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.MonthBarCenter}>
           <Text style={styles.currentMonthText}>{currentMonthName}</Text>
        </View>
      <View style={styles.contentContainer}>
        <Text style={styles.selectedDateText}>Your usage for: {selectedDate}</Text>
        <View style={styles.whiteSquare}>
        <View style={styles.leftLabelContainer}>
            <Text style={styles.leftLabel}>Number of washes:</Text>
            <Text style={[styles.leftSubLabel, { color: (numWashes - prevNumWashes) < 0 ? '#00FF00' : '#FF0000' }]}>
              {(numWashes - prevNumWashes) >= 0 ? '+' : '-'}{Math.abs(numWashes - prevNumWashes).toFixed(0)} compared to previous month
            </Text>
            <Text style={styles.leftLabel}>Average price:</Text>
            <Text style={[styles.leftSub2Label, { color: (avgPrice - prevAvgPrice) < 0 ? '#00FF00' : '#FF0000' }]}>
              {(avgPrice - prevAvgPrice) < 0 ? '-' : '+'}
              {Math.abs(avgPrice - prevAvgPrice).toFixed(2)} kr/kWh compared to previous month
            </Text>
            <Text style={styles.leftLabel}>Electric cost:</Text>
            <Text style={[styles.leftSub3Label,{ color: parseFloat(electricCost) - parseFloat(prevElectricCost) < 0 ? '#00FF00' : '#FF0000' }]}>
              {(parseFloat(electricCost) - parseFloat(prevElectricCost)) < 0 ? '-' : '+'}
              {Math.abs(parseFloat(electricCost) - parseFloat(prevElectricCost)).toFixed(2)} kr compared to last month
            </Text>
            <Text style={styles.leftLabel}>Water usage:</Text>
            <Text style={[styles.leftSub4Label,{ color: parseFloat(waterUsage) - parseFloat(prevWaterUsage) < 0 ? '#00FF00' : '#FF0000' }]}>
              {(parseFloat(waterUsage) - parseFloat(prevWaterUsage)) < 0 ? '-' : '+'}
              {Math.abs(parseFloat(waterUsage) - parseFloat(prevWaterUsage)).toFixed(0)} litres compared to last month
            </Text>
          </View>
          <View style={styles.rightLabelContainer}>
            <Text style={styles.rightLabel} >{numWashes}</Text>
            <Text style={styles.rightLabel}>{avgPrice + 'kr/kWh'}</Text>
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
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  
  currentMonthText: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 20,
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
    marginBottom: 49,
    marginTop: 25
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
    backgroundColor: '#3452A2',
    marginTop: 10, // Add margin top to create space between the blue bar and the month bar
  },
  MonthBarLeft: {
    flex: 1,
    alignItems: 'flex-start', // Align arrow to the left
  },
  MonthBarRight: {
    flex: 1,
    alignItems: 'flex-end', // Align arrow to the right
  },
  MonthBarText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default UsageMonthly; 
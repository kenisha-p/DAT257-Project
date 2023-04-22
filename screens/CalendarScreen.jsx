import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Calendar from "../components/CalendarComponent";
import SaveButton from "../components/add_time";
import { collection, addDoc } from "firebase/firestore";
import db from "../config";
import axios from 'axios';
import AddButton from "../components/AddButton";



//The available timeSLots which are displayed in the application. 
/*const timeSlots = [
  { start: 8, end: 11 },
  { start: 11, end: 14 },
  { start: 14, end: 17 },
  { start: 17, end: 19 },
];*/

//This function returns the UI for the calendar and handles the selection of date
const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };
  const handleSelectTimeSlot = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

// This function saves the selected date and time slot to the Firestore database
  const saveTime = async (date) => {
    console.log(`Selected Date: ${date}`);

    console.log(`Selected Time Slot: ${selectedTimeSlot.start}-${selectedTimeSlot.end}`);
    try {
      const docRef = await addDoc(collection(db, "time"), {
        date: selectedDate,
        startTime: selectedTimeSlot.start,
        endTime: selectedTimeSlot.end,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

//Get from API. 
async function fetchElectricityPrices() {
  try {
    const today = new Date();
    
    // formattedDate gets put into the 'axios.get' request to retrieve the current day's electricity prices 
    const formattedDate = `${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, '0')}-${
      today.getDate().toString().padStart(2, '0')}`;
    
    // Send a GET request to the API endpoint with the formatted date
    const response = await axios.get(`https://www.elprisetjustnu.se/api/v1/prices/${formattedDate}_SE3.json`);
    
    //At this stage, data from API only is printed in console.
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching electricity prices: ', error);
  }
}

  //Calls the function which displays the API
  fetchElectricityPrices();


  
//Render for the UI or "View". Handles the textbars for "Time" and "Total cost". Handles as well the (sort of) 
//radio buttons which the user is to press for booking. 
  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar onSelectDate={handleSelectDate} />
      </View>
  
      <View style={styles.textContainer}>
        <View style={styles.timeText}>
          <Text style={{ fontSize: 20 }}>Time</Text>
        </View>
        <View style={styles.priceText}>
          <Text style={{ fontSize: 20 }}>Total cost</Text>
        </View>
        <View style={styles.bookText}>
          <Text style={{ fontSize: 20 }}>Book</Text>
        </View>
      </View>
      <View style={styles.listan}>
        <Text style={[styles.item, { textAlign: 'left' }]}>08:00-11:00</Text>
        <AddButton onPress={() => {}} />
      </View>
      <View style={styles.listan}>
        <Text style={[styles.item, { textAlign: 'left' }]}>11:00-14:00</Text>
        <AddButton onPress={() => {}} />
      </View>
      <View style={styles.listan}>
        <Text style={[styles.item, { textAlign: 'left' }]}>14:00-17:00</Text>
        <AddButton onPress={() => {}} />
      </View>
      <View style={styles.listan}>
        <Text style={[styles.item, { textAlign: 'left' }]}>17:00-20:00</Text>
        <AddButton onPress={() => {}} />
      </View>
  
  
      <View style={styles.saveButton}>
        <SaveButton onPress={() => saveTime(selectedDate)} />
      </View>
    </View>
  );
  
};
const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: "#ffffff",
  },
  calendarContainer: {
    flex: 1,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  timeText: {
    flex: 0,
    alignItems: "left",
    justifyContent: "flex-end",
    paddingLeft: 15,
  },
  priceText: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  bookText: {
    flex: 0,
    alignItems: "right",
    justifyContent: "flex-end",
    paddingRight: 15,
  },
  /*timeSlotsContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    height: 200,
    marginBottom: 50,
    backgroundColor: "#ffffff",
    paddingHorizontal: 28,
    paddingBottom: 0, // add some space between time slots and text views
  },*/
  listan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: '#e6e6e6',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  /*timeSlotWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 8,
  },
  selectedTimeSlot: {
    backgroundColor: "#ccc",
  },
  timeSlotText: {
    fontSize: 18,
    fontWeight: "bold",
  },*/
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 22,
    marginBottom: 80,
  },
});


export default CalendarScreen;
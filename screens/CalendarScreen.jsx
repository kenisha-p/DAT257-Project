import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Calendar from "../components/CalendarComponent";
import SaveButton from "../components/add_time";
import { collection, addDoc } from "firebase/firestore";
import db from "../config";
import axios from 'axios';

const timeSlots = [
  { start: 8, end: 11 },
  { start: 11, end: 14 },
  { start: 14, end: 17 },
  { start: 17, end: 20 },
];
const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };
  const handleSelectTimeSlot = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };
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
  async function fetchElectricityPrices() {
    try {
      const response = await axios.get('https://www.elprisetjustnu.se/api/v1/prices/2023/04-18_SE3.json');
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching electricity prices: ', error);
    }
  }

  fetchElectricityPrices();


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
        
      </View>
  
      <View style={styles.timeSlotsContainer}>
        {timeSlots.map((timeSlot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeSlotWrapper,
              selectedTimeSlot === timeSlot && styles.selectedTimeSlot,
            ]}
            onPress={() => handleSelectTimeSlot(timeSlot)}
            activeOpacity={0.7}
          >
            <Text style={styles.timeSlotText}>{`${timeSlot.start}-${timeSlot.end}`}</Text>
          </TouchableOpacity>
        ))}
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
    paddingBottom: 10,
  },
  timeText: {
    alignItems: "center",
    paddingRight: 60,
  },
  priceText: { 
    flex: 1,
    flexDirection: "row", 
    alignItems: "center", 
    paddingRight: 110,
    justifyContent: 'center',
  },
  bookText: {
    

  },
  timeSlotsContainer: {
    flexDirection: "column",
    alignItems: "right",
    justifyContent: "center",
    height: 200,
    marginBottom: 65,
    backgroundColor: "#ffffff",
    paddingHorizontal: 330,
    paddingBottom: 0, // add some space between time slots and text views
  },
  timeSlotWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 8, // add margin between buttons
  },
  selectedTimeSlot: {
    backgroundColor: "#ccc",
  },
  timeSlotText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 22,
    marginBottom: 80,
  },
});

export default CalendarScreen;
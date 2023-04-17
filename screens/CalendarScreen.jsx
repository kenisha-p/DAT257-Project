import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Calendar from "../components/CalendarComponent";
import SaveButton from "../components/add_time";
import { collection, addDoc } from "firebase/firestore";
import db from "../config";
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
  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar onSelectDate={handleSelectDate} />
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
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  calendarContainer: {
    flex: 1,
  },
  timeSlotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    marginBottom: 100,
  },
  timeSlotWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 80,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedTimeSlot: {
    backgroundColor: "#3c3",
  },
  timeSlotText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 60,
    marginBottom: 80,
  },
});
export default CalendarScreen;
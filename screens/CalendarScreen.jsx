import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Calendar from "../components/CalendarComponent";
import TimePicker from "../components/SelectTimeComponent";
import SaveButton from "../components/add_time";
import { collection, addDoc } from "firebase/firestore";
import db from "../config";
const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };
  const handleSelectStartTime = (time) => {
    const startHour = time.getHours();
    if (startHour < 8 || startHour >= 11) {
      alert("Please select a valid start time between 8am and 11am.");
      return;
    }
    setStartTime(time);
  };
  const handleSelectEndTime = (time) => {
    const endHour = time.getHours();
    if (endHour <= 8 || endHour > 11) {
      alert("Please select a valid end time between 9am and 12pm.");
      return;
    }
    setEndTime(time);
  };
  const saveTime = async (date) => {
    console.log(`Selected Date: ${date}`);
    console.log(`Start Time: ${startTime.toLocaleTimeString()}`);
    console.log(`End Time: ${endTime.toLocaleTimeString()}`);
    try {
      const docRef = await addDoc(collection(db, "time"), {
        date: selectedDate,
        startTime: startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        endTime: endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
      <View style={styles.timePickersContainer}>
        <View style={styles.timePickerWrapper}>
          <Text style={styles.timePickerLabel}>Starttid</Text>
          <View style={styles.timePickerContainer}>
            <TimePicker onChange={handleSelectStartTime} date={startTime} />
          </View>
        </View>
        <View style={{ width: 80 }} />
        <View style={styles.timePickerWrapper}>
          <Text style={styles.timePickerLabel}>Sluttid</Text>
          <View style={styles.timePickerContainer}>
            <TimePicker onChange={handleSelectEndTime} date={endTime} />
          </View>
        </View>
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
  timePickersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    marginBottom: 100,
  },
  timePickerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  timePickerLabel: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom:100,
  },
  timePickerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    width: 100,
  },
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 60,
    marginBottom: 80,
  },
});
export default CalendarScreen;
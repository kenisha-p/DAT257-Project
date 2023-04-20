import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Calendar from "../components/CalendarComponent";
import SaveButton from "../components/add_time";
import { collection, addDoc } from "firebase/firestore";
import db from "../config";
import axios from 'axios';


//The available timeSLots which are displayed in the application. 
const timeSlots = [
  { start: 8, end: 11 },
  { start: 11, end: 14 },
  { start: 14, end: 17 },
  { start: 17, end: 19 },
];

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

  //this function modifies the data from the api in a usable way
  function getSEKValues(inputData) {
    
    // Create an empty dictionary to hold the results
    let outputDict = {};
    
    // Loop through the input data and add each date/SEK value pair to the output dictionary
    inputData.forEach(data => {
      const date = data.time_start.split('T')[0]; // Extract the date portion of the timestamp
      
      const time = data.time_start.split('T')[1]; // Extract the time portion of the timestamp
      const timeSlice = time.slice(0, 5); // Extract the first four characters, or just the hours

      datetime = date + " / " + timeSlice;

      const SEKvalue = data.SEK_per_kWh;
      
      outputDict[datetime] = SEKvalue; // Use the date as the key
    });
    
    // Return the output dictionary
    return outputDict;
  }
  
  async function asynchronousFunction() {
    try {
      const today = new Date();

      // formattedDate gets put into the 'axios.get' request to retrieve the current day's electricity prices 
      const formattedDate = `${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

      // Send a GET request to the API endpoint with the formatted date
      const response = await axios.get(`https://www.elprisetjustnu.se/api/v1/prices/${formattedDate}_SE3.json`);

      console.log("under fetch");
      console.log(response)
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function fetchElectricityPrices() {
    let SEKValuesFinal = {}; // declare SEKValuesFinal with let keyword
    const response = asynchronousFunction();

    console.log("efter fetch");
    console.log(response.data);
    //At this stage, data from API only is printed in console.
    SEKValuesFinal = getSEKValues(response.data);   
    return SEKValuesFinal; // return the value from the function
  }

  const sekValuesFinal = fetchElectricityPrices();

  console.log ("SEKvaluesfinal");
  console.log (SEKvaluesfinal);
  
  
//Render for the UI or "View". Handles the textbars for "Time" and "Total cost". Handles as well the (sort of) 
//radio buttons which the user is to press for booking. 
  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar onSelectDate={handleSelectDate} />
      </View>


      <View style={styles.textContainer}>
      {Object.keys(sekValuesFinal).map((key) => (
        <View key={key} style={styles.textItem}>
          <Text style={{ fontSize: 20 }}>{key}</Text>
          <Text style={{ fontSize: 16, color: '#888' }}>{sekValuesFinal[key]}</Text>
        </View>
      ))}
    </View>
  

      <View style={styles.textContainer}>
        <View style={styles.timeText}>
          <Text style={{ fontSize: 20 }}>Times</Text>
          <Text style={{ fontSize: 16, color: '#888' }}>{}</Text>
        </View>
        <View style={styles.priceText}>
          <Text style={{ fontSize: 20 }}>Total cost</Text>
          <Text style={{ fontSize: 16, color: '#888' }}>Enter the total cost:</Text>
        </View>
        <View style={styles.bookText}>
          <Text style={{ fontSize: 20 }}>Book</Text>
          <Text style={{ fontSize: 16, color: '#888' }}>Click to book:</Text>
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
    paddingBottom: 30,
  },
  timeText: {},
  priceText: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  bookText: {
    flex: 0,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingRight: 20,
  },
  timeSlotsContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    height: 200,
    marginBottom: 50,
    backgroundColor: "#ffffff",
    paddingHorizontal: 28,
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
    marginTop: 8,
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
<<<<<<< HEAD
import React, { useState } from "react";
import { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
=======
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
>>>>>>> 55185851fbd2a5c7876f0e2fe89eb48ec42125b0
import Calendar from "../components/CalendarComponent";
import SaveButton from "../components/add_time";
import { collection, addDoc } from "firebase/firestore";
import db from "../config";
import axios from "axios";
import AddButton from "../components/AddButton";

<<<<<<< HEAD



//The available timeSLots which are displayed in the application. 
/*const timeSlots = [
  { start: 8, end: 11 },
  { start: 11, end: 14 },
  { start: 14, end: 17 },
  { start: 17, end: 19 },
];*/

//This function returns the UI for the calendar and handles the selection of date
=======
>>>>>>> 55185851fbd2a5c7876f0e2fe89eb48ec42125b0
const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [todaysDate, setTodaysDate] = useState("");

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // clear selected timeslot when date is changed
  };

  const handleSelectTimeSlot = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const saveTime = async () => {
    try {
      const docRef = await addDoc(collection(db, "time"), {
        date: selectedDate,
        startTime: selectedTimeSlot.start,
        endTime: selectedTimeSlot.end,
        price: selectedTimeSlot.price,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

<<<<<<< HEAD
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
    console.log("response.data");
    console.log(response.data);


    SEKvalue = getSEKValues(response.data)
    console.log("sekvalues");
    console.log(SEKvalue);

  } catch (error) {
    console.error('Error fetching electricity prices: ', error);
  }
  return SEKvalue;
}

  const [sekValuesFinal, setSekValuesFinal] = useState(null);
  //Calls the function which displays the API

  useEffect(() => {
    async function getData() {
      const sekValuesFinal = await fetchElectricityPrices();
      setSekValuesFinal(sekValuesFinal);
    }
    getData();
  }, []);

  console.log ("SEKvaluesfinal");
  console.log (sekValuesFinal);
  
  
//Render for the UI or "View". Handles the textbars for "Time" and "Total cost". Handles as well the (sort of) 
//radio buttons which the user is to press for booking. 
=======
  const [cost8_11, setCost8_11] = useState(0);
  const [cost12_15, setCost12_15] = useState(0);
  const [cost16_19, setCost16_19] = useState(0);

  useEffect(() => {
    const fetchElectricityPrices = async () => {
      try {
        const today = new Date(selectedDate);
      
const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Check if selected date is in the future
        if (today > new Date() ) {
          console.log("Selected date is in the future, skipping electricity prices fetch");
          return;
        }

        setTodaysDate(today.toISOString().slice(0, 10)); // set todaysDate as a string in YYYY-MM-DD format
    
        
       

        const formattedDate = `${today.getFullYear()}/${
          (today.getMonth() + 1).toString().padStart(2, "0")
        }-${today.getDate().toString().padStart(2, "0")}`;
    
        const response = await axios.get(
          `https://www.elprisetjustnu.se/api/v1/prices/${formattedDate}_SE3.json`
        );
    
        setCost8_11(
          (
            (response.data[9].SEK_per_kWh +
              response.data[10].SEK_per_kWh +
              response.data[11].SEK_per_kWh) *
            3
          ).toFixed(1)
        );
    
        setCost12_15(
          (
            (response.data[13].SEK_per_kWh +
              response.data[14].SEK_per_kWh +
              response.data[15].SEK_per_kWh) *
            3
          ).toFixed(1)
        );
    
        setCost16_19(
          (
            (response.data[17].SEK_per_kWh +
              response.data[18].SEK_per_kWh +
              response.data[19].SEK_per_kWh) *
            3
          ).toFixed(1)
        );
      } catch (error) {
        console.error("Error fetching electricity prices: ", error);
      }
    };
    fetchElectricityPrices();
  }, [selectedDate]);

>>>>>>> 55185851fbd2a5c7876f0e2fe89eb48ec42125b0
  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar onSelectDate={handleSelectDate} />
      </View>
<<<<<<< HEAD
  

=======
>>>>>>> 55185851fbd2a5c7876f0e2fe89eb48ec42125b0
      <View style={styles.textContainer}>
        <View style={styles.timeText}>
          <Text style={{ fontSize: 20 }}>Times</Text>
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
        {selectedDate && todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
        <Text style={[styles.item, { textAlign: 'center', marginRight: 50 }]}>{`${cost8_11} kr`}</Text>
        ) : (
        <Text style={[styles.item, { textAlign: 'center', marginRight: 50 }]}>N/A</Text>
        )}
        <AddButton
          onPress={() =>
            handleSelectTimeSlot({
              start: '08:00',
              end: '11:00',
              price:
              selectedDate && todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
              ? Number(cost8_11)
              : 'Hög',
            })
          }
        />
      </View>
      <View style={styles.listan}>
        <Text style={[styles.item, { textAlign: 'left' }]}>12:00-15:00</Text>
         {selectedDate && todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
          <Text style={[styles.item, { textAlign: 'center', marginRight: 50 }]}>{`${cost12_15} kr`}</Text>
        ) : (
          <Text style={[styles.item, { textAlign: 'center', marginRight: 50 }]}>N/A</Text>
        )}
        <AddButton
          onPress={() =>
            handleSelectTimeSlot({
              start: '12:00',
              end: '15:00',
              price:
                selectedDate && todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
                ? Number(cost12_15)
                  : 'Hög',
            })
          }
        />
      </View>
      <View style={styles.listan}>
        <Text style={[styles.item, { textAlign: 'left' }]}>16:00-19:00</Text>
        {selectedDate && todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
          <Text style={[styles.item, { textAlign: 'center', marginRight: 50 }]}>{`${cost16_19} kr`}</Text>
        ) : (
          <Text style={[styles.item, { textAlign: 'center', marginRight: 50 }]}>N/A</Text>
        )}
        <AddButton
          onPress={() =>
            handleSelectTimeSlot({
              start: '16:00',
              end: '19:00',
              price:
              selectedDate && todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
              ? Number(cost16_19)
                  : 'Hög',
            })
          }
        />
      </View>
<<<<<<< HEAD
      <View style={styles.listan}>
        <Text style={[styles.item, { textAlign: 'left' }]}>17:00-20:00</Text>
      </View>
  

    
  
=======
>>>>>>> 55185851fbd2a5c7876f0e2fe89eb48ec42125b0
      <View style={styles.saveButton}>
        <SaveButton onPress={() => saveTime(selectedDate)} />
      </View>

      <View style={styles.textContainer}>
      {Object.keys(sekValuesFinal).map((key) => (
        <View key={key} style={styles.textItem}>
          <Text style={{ fontSize: 20 }}>{key}</Text>
          <Text style={{ fontSize: 16, color: '#888' }}>{sekValuesFinal[key]}</Text>
        </View>
      ))}
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
    paddingBottom: 5,
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

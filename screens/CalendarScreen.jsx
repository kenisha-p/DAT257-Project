import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Calendar from "../components/CalendarComponent";
import SaveButton from "../components/add_time";
import { collection, addDoc } from "firebase/firestore";
import db from "../config";
import axios from "axios";
import AddButton from "../components/AddButton";

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [todaysDate, setTodaysDate] = useState("");
  const [price, setPrice] = useState(null);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // clear selected timeslot when date is changed
  };

//TESTA ATT ÄNDRA OM SÅ MYCKET SOM MÖJLIGT FRÅN MAIN BRANCH FÖR ATT FÅ TILL ETT TILLSTÅND DÄR DEN FAKTISKT SKICKAR IN RÄTT VÄRDE. YOU GOT THIS

  const handleSelectTimeSlot = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setPrice(timeSlot.price)
  };

  const saveTime = async () => {
    try {
      const docRef = await addDoc(collection(db, "time"), {
        date: selectedDate, 
        startTime: selectedTimeSlot.start,
        endTime: selectedTimeSlot.end,
        price: price,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  

  const [cost8_11, setCost8_11] = useState(0);
  const [cost12_15, setCost12_15] = useState(0);
  const [cost16_19, setCost16_19] = useState(0);

  useEffect(() => {
    const fetchElectricityPrices = async () => {
      try {
        const today = new Date(selectedDate);
        setTodaysDate(today.toISOString().slice(0, 10)); // set todaysDate as a string in YYYY-MM-DD format
  
        const formattedDate = `${today.getFullYear()}/${
          (today.getMonth() + 1).toString().padStart(2, "0")
        }-${today.getDate().toString().padStart(2, "0")}`;
  
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
  
        // Check if tomorrow is today
        if (today.getFullYear() === tomorrow.getFullYear() && today.getMonth() === tomorrow.getMonth() && today.getDate() === tomorrow.getDate()) {
          // Check if it is before 3 pm
          if (tomorrow.getHours() <= 15) {
            console.log(`Electricity prices not available for ${selectedDate}`);
            setCost8_11("N/A");
            setCost12_15("N/A");
            setCost16_19("N/A");
            return;
          }
        } else if (today > tomorrow) {
          console.log(`Electricity prices not available for ${selectedDate}`);
          setCost8_11("N/A");
          setCost12_15("N/A");
          setCost16_19("N/A");
          return;
        }
  
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
        {selectedDate && todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
        <Text style={[styles.item, { textAlign: 'center', marginRight: 50 }]}>{`${cost8_11} kr`}</Text>
        ) : (
        <Text style={[styles.item, { textAlign: 'center', marginRight: 50 }]}>N/A kr</Text>
        )}
        <AddButton
          onPress={() =>
            handleSelectTimeSlot({
              start: '08:00',
              end: '11:00',
              price:
              selectedDate && todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
            //  ? Number(cost8_11)
            //  : 'High',
            })
          }
        />
      </View>
      <View style={styles.listan}>
        <Text style={[styles.item, { textAlign: 'left' }]}>12:00-15:00</Text>
         {selectedDate && todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
          <Text style={[styles.item, { textAlign: 'center', marginRight: 50 }]}>{`${cost12_15} kr`}</Text>
        ) : (
          <Text style={[styles.item, { textAlign: 'center', marginRight: 50 }]}>N/A kr</Text>
        )}
        <AddButton
          onPress={() =>
            handleSelectTimeSlot({
              start: '12:00',
              end: '15:00',
              price:
                selectedDate && todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
              //  ? Number(cost12_15)
                //  : 'Medium',
            })
          }
        />
      </View>
      <View style={styles.listan}>
        <Text style={[styles.item, { textAlign: 'left' }]}>16:00-19:00</Text>
        {selectedDate && todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
          <Text style={[styles.item, { textAlign: 'center', marginRight: 50 }]}>{`${cost16_19} kr`}</Text>
        ) : (
          <Text style={[styles.item, { textAlign: 'center', marginRight: 50 }]}>N/A kr</Text>
        )}
        <AddButton
          onPress={() =>
            handleSelectTimeSlot({
              start: '16:00',
              end: '19:00',
              price:
                selectedDate && todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
              //  ? Number(cost16_19)
              //    : 'High',
            })
          }
        />
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
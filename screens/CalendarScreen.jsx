<<<<<<< HEAD
import React, { useState } from "react";
import { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
=======
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Calendar from "../components/CalendarComponent";
import SaveButton from "../components/add_time";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import db from "../config";
import axios from "axios";
import AddButton from "../components/AddButton";
import ConfirmBooking from "../components/ConfirmBooking";

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
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [todaysDate, setTodaysDate] = useState("");
  const [confirmationAlert, setConfirmationAlert] = useState(false);
  const [electricityConsumtion, getElectricityConsumtion] = useState("");
  const [washCykles, getWashCykles] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
      setConfirmationAlert(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const [cost00_2, setCost00_2] = useState(0);
  const [cost2_4, setCost2_4] = useState(0);
  const [cost4_6, setCost4_6] = useState(0);
  const [cost6_8, setCost6_8] = useState(0);
  const [cost8_10, setCost8_10] = useState(0);
  const [cost10_12, setCost10_12] = useState(0);
  const [cost12_14, setCost12_14] = useState(0);
  const [cost14_16, setCost14_16] = useState(0);
  const [cost16_18, setCost16_18] = useState(0);
  const [cost18_20, setCost18_20] = useState(0);
  const [cost20_22, setCost20_22] = useState(0);
  const [cost22_00, setCost22_00] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, 'Settings', 'settings');
      const docSnap = await getDoc(docRef);
      getElectricityConsumtion(docSnap.data().Electricity);
      getWashCykles(docSnap.data().Wash);
      console.log("Collect settings");
    };

    getData().then(() => {
      setIsLoading(false);
    });
  }, []);

  const calculateCost = (start, end, data) =>
  ((data[start].SEK_per_kWh + data[end].SEK_per_kWh) / 2 * electricityConsumtion * washCykles).toFixed(1)

useEffect(() => {
  const fetchElectricityPrices = async () => {
    try {
      const today = new Date(selectedDate);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      let formattedDate = `${today.getFullYear()}/${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

      const isAfter16Today = new Date().getHours() >= 13;
      const isTomorrow = today.getDate() === tomorrow.getDate();

      // Check if selected date is tomorrow and current time is after 16:00
      if (isTomorrow && isAfter16Today) {
        formattedDate = `${tomorrow.getFullYear()}/${(tomorrow.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${tomorrow.getDate().toString().padStart(2, "0")}`;
        console.log("Fetching tomorrow's electricity prices");
      } else if (today > new Date() || (isTomorrow && !isAfter16Today)) {
        console.log("Selected date is in the future, skipping electricity prices fetch");
        return;
      }

      setTodaysDate(today.toISOString().slice(0, 10));

      const response = await axios.get(
        `https://www.elprisetjustnu.se/api/v1/prices/${formattedDate}_SE3.json`
      );

      setCost00_2(calculateCost(0, 1, response.data));
      setCost2_4(calculateCost(2, 3, response.data));
      setCost4_6(calculateCost(4, 5, response.data));
      setCost6_8(calculateCost(6, 7, response.data));
      setCost8_10(calculateCost(8, 9, response.data));
      setCost10_12(calculateCost(10, 11, response.data));
      setCost12_14(calculateCost(12, 13, response.data));
      setCost14_16(calculateCost(14, 15, response.data));
      setCost16_18(calculateCost(16, 17, response.data));
      setCost18_20(calculateCost(18, 19, response.data));
      setCost20_22(calculateCost(20, 21, response.data));
      setCost22_00(calculateCost(22, 23, response.data));
    } catch (error) {
      console.error("Error fetching electricity prices: ", error);
    }
  };

  if (!isLoading) {
    fetchElectricityPrices();
  }
}, [isLoading, selectedDate]);

  const confirmBooking = () => {
    console.log("Confirming booking");
    setConfirmationAlert(true);
  };

  if (!isLoading) {
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.listan}>
          <Text style={[styles.item, { textAlign: "left" }]}>00:00-02:00</Text>
          {selectedDate &&
          todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
            <Text
              style={[styles.item, { textAlign: "center", marginRight: 50 }]}
            >{`${cost00_2} kr`}</Text>
          ) : (
            <Text style={[styles.item, { textAlign: "center", marginRight: 50 }]}>
              N/A
            </Text>
          )}
          <AddButton
            onPress={() =>
              handleSelectTimeSlot({
                start: "00:00",
                end: "02:00",
                price:
                  selectedDate &&
                  todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
                    ? Number(cost00_2)
                    : 0,
              })
            }
          />
        </View>
        <View style={styles.listan}>
          <Text style={[styles.item, { textAlign: "left" }]}>02:00-04:00</Text>
          {selectedDate &&
          todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
            <Text
              style={[styles.item, { textAlign: "center", marginRight: 50 }]}
            >{`${cost2_4} kr`}</Text>
          ) : (
            <Text style={[styles.item, { textAlign: "center", marginRight: 50 }]}>
              N/A
            </Text>
          )}
          <AddButton
            onPress={() =>
              handleSelectTimeSlot({
                start: "02:00",
                end: "04:00",
                price:
                  selectedDate &&
                  todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
                    ? Number(cost2_4)
                    : 0,
              })
            }
          />
        </View>
        <View style={styles.listan}>
          <Text style={[styles.item, { textAlign: "left" }]}>04:00-06:00</Text>
          {selectedDate &&
          todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
            <Text
              style={[styles.item, { textAlign: "center", marginRight: 50 }]}
            >{`${cost4_6} kr`}</Text>
          ) : (
            <Text style={[styles.item, { textAlign: "center", marginRight: 50 }]}>
              N/A
            </Text>
          )}
          <AddButton
            onPress={() =>
              handleSelectTimeSlot({
                start: "04:00",
                end: "06:00",
                price:
                  selectedDate &&
                  todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
                    ? Number(cost4_6)
                    : 0,
              })
            }
          />
        </View>
        <View style={styles.listan}>
          <Text style={[styles.item, { textAlign: "left" }]}>06:00-08:00</Text>
          {selectedDate &&
          todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
            <Text
              style={[styles.item, { textAlign: "center", marginRight: 50 }]}
            >{`${cost6_8} kr`}</Text>
          ) : (
            <Text style={[styles.item, { textAlign: "center", marginRight: 50 }]}>
              N/A
            </Text>
          )}
          <AddButton
            onPress={() =>
              handleSelectTimeSlot({
                start: "06:00",
                end: "08:00",
                price:
                  selectedDate &&
                  todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
                    ? Number(cost6_8)
                    : 0,
              })
            }
          />
        </View>
        <View style={styles.listan}>
          <Text style={[styles.item, { textAlign: "left" }]}>08:00-10:00</Text>
          {selectedDate &&
          todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
            <Text
              style={[styles.item, { textAlign: "center", marginRight: 50 }]}
            >{`${cost8_10} kr`}</Text>
          ) : (
            <Text style={[styles.item, { textAlign: "center", marginRight: 50 }]}>
              N/A
            </Text>
          )}
          <AddButton
            onPress={() =>
              handleSelectTimeSlot({
                start: "08:00",
                end: "10:00",
                price:
                  selectedDate &&
                  todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
                    ? Number(cost8_10)
                    : 0,
              })
            }
          />
        </View>
        <View style={styles.listan}>
          <Text style={[styles.item, { textAlign: "left" }]}>10:00-12:00</Text>
          {selectedDate &&
          todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
            <Text
              style={[styles.item, { textAlign: "center", marginRight: 50 }]}
            >{`${cost10_12} kr`}</Text>
          ) : (
            <Text style={[styles.item, { textAlign: "center", marginRight: 50 }]}>
              N/A
            </Text>
          )}
          <AddButton
            onPress={() =>
              handleSelectTimeSlot({
                start: "10:00",
                end: "12:00",
                price:
                  selectedDate &&
                  todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
                    ? Number(cost10_12)
                    : 0,
              })
            }
          />
        </View>
        <View style={styles.listan}>
          <Text style={[styles.item, { textAlign: "left" }]}>12:00-14:00</Text>
          {selectedDate &&
          todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
            <Text
              style={[styles.item, { textAlign: "center", marginRight: 50 }]}
            >{`${cost12_14} kr`}</Text>
          ) : (
            <Text style={[styles.item, { textAlign: "center", marginRight: 50 }]}>
              N/A
            </Text>
          )}
          <AddButton
            onPress={() =>
              handleSelectTimeSlot({
                start: "12:00",
                end: "14:00",
                price:
                selectedDate &&
                todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
                  ? Number(cost12_14)
                  : 0,
            })
          }
        />
      </View>
      <View style={styles.listan}>
        <Text style={[styles.item, { textAlign: "left" }]}>14:00-16:00</Text>
        {selectedDate &&
        todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
          <Text
            style={[styles.item, { textAlign: "center", marginRight: 50 }]}
          >{`${cost14_16} kr`}</Text>
        ) : (
          <Text style={[styles.item, { textAlign: "center", marginRight: 50 }]}>
            N/A
          </Text>
        )}
        <AddButton
          onPress={() =>
            handleSelectTimeSlot({
              start: "14:00",
              end: "16:00",
              price:
                selectedDate &&
                todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
                  ? Number(cost14_16)
                  : 0,
            })
          }
        />
      </View>
      <View style={styles.listan}>
        <Text style={[styles.item, { textAlign: "left" }]}>16:00-18:00</Text>
        {selectedDate &&
        todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
          <Text
            style={[styles.item, { textAlign: "center", marginRight: 50 }]}
          >{`${cost16_18} kr`}</Text>
        ) : (
          <Text style={[styles.item, { textAlign: "center", marginRight: 50 }]}>
            N/A
          </Text>
        )}
        <AddButton
          onPress={() =>
            handleSelectTimeSlot({
              start: "16:00",
              end: "18:00",
              price:
                selectedDate &&
                todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
                  ? Number(cost16_18)
                  : 0,
            })
          }
        />
      </View>
      <View style={styles.listan}>
        <Text style={[styles.item, { textAlign: "left" }]}>18:00-20:00</Text>
        {selectedDate &&
        todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
          <Text
            style={[styles.item, { textAlign: "center", marginRight: 50 }]}
          >{`${cost18_20} kr`}</Text>
        ) : (
          <Text style={[styles.item, { textAlign: "center", marginRight: 50 }]}>
            N/A
          </Text>
        )}
        <AddButton
          onPress={() =>
            handleSelectTimeSlot({
              start: "18:00",
              end: "20:00",
              price:
                selectedDate &&
                todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
                  ? Number(cost18_20)
                  : 0,
            })
          }
        />
      </View>
      <View style={styles.listan}>
        <Text style={[styles.item, { textAlign: "left" }]}>20:00-22:00</Text>
        {selectedDate &&
        todaysDate === new Date(selectedDate).toISOString().slice(0,        10) ? (
          <Text
            style={[styles.item, { textAlign: "center", marginRight: 50 }]}
          >{`${cost20_22} kr`}</Text>
        ) : (
          <Text style={[styles.item, { textAlign: "center", marginRight: 50 }]}>
            N/A
          </Text>
        )}
        <AddButton
          onPress={() =>
            handleSelectTimeSlot({
              start: "20:00",
              end: "22:00",
              price:
                selectedDate &&
                todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
                  ? Number(cost20_22)
                  : 0,
            })
          }
        />
        </View>
      <View style={styles.listan}>
        <Text style={[styles.item, { textAlign: "left" }]}>22:00-00:00</Text>
        {selectedDate &&
        todaysDate === new Date(selectedDate).toISOString().slice(0,        10) ? (
          <Text
            style={[styles.item, { textAlign: "center", marginRight: 50 }]}
          >{`${cost22_00} kr`}</Text>
        ) : (
          <Text style={[styles.item, { textAlign: "center", marginRight: 50 }]}>
            N/A
          </Text>
        )}
        <AddButton
          onPress={() =>
            handleSelectTimeSlot({
              start: "22:00",
              end: "00:00",
              price:
                selectedDate &&
                todaysDate === new Date(selectedDate).toISOString().slice(0, 10)
                  ? Number(cost22_00)
                  : 0,
            })
          }
          />
      </View>
      </ScrollView>
      <View style={styles.saveButton}>
        <SaveButton onPress={confirmBooking} />
        {confirmationAlert && (
          <ConfirmBooking
            visible={true}
            onCancel={() => {
              setConfirmationAlert(false);
              setSelectedTimeSlot(null);
              setSelectedDate(null);
            }}
            onConfirm={() => saveTime(selectedDate)}
          />
        )}
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
}


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
    position: "absolute",
    paddingHorizontal: 20,
    paddingBottom: 5,
    marginTop: 310,
  },
  timeText: {
    flex: 0,
    alignItems: "center",
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
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 15,
  },

  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    position: "absolute",
    width: "100%",
    marginTop: 10,
  },
  
  listan: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: "#e6e6e6",
    marginHorizontal: 10,
    marginBottom: 10,
  },
 
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 22,
    marginBottom: 30,
    marginTop: 10,
  },
});


export default CalendarScreen;
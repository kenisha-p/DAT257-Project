import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Calendar from '../components/CalendarComponent';
import TimePicker from '../components/SelectTimeComponent';
import SaveButton from '../components/add_time';
import { collection, addDoc } from "firebase/firestore"; 
import db from '../config';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

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
      console.error('Error adding document: ', error);
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.listan}>
          <Text style={[styles.item, { textAlign: "left" }]}>00:00-02:00</Text>
          {selectedDate &&
          todaysDate === new Date(selectedDate).toISOString().slice(0, 10) ? (
            <Text
              style={[styles.item, { textAlign: "center", marginRight: 50 }]}
            >{`${cost00_2} kr`}</Text>
          ) : (
            <Text style={[styles.item, { textAlign: "right", marginRight: 0 }]}>
              Price not avalible for now
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
            <Text style={[styles.item, { textAlign: "right", marginRight: 0 }]}>
              Price not avalible for now
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
            <Text style={[styles.item, { textAlign: "right", marginRight: 0 }]}>
              Price not avalible for now
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
            <Text style={[styles.item, { textAlign: "right", marginRight: 0 }]}>
              Price not avalible for now
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
            <Text style={[styles.item, { textAlign: "right", marginRight: 0 }]}>
              Price not avalible for now
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
            <Text style={[styles.item, { textAlign: "right", marginRight: 0 }]}>
              Price not avalible for now
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
            <Text style={[styles.item, { textAlign: "right", marginRight: 0 }]}>
              Price not avalible for now
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
          <Text style={[styles.item, { textAlign: "right", marginRight: 0 }]}>
            Price not avalible for now
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
          <Text style={[styles.item, { textAlign: "right", marginRight: 0 }]}>
            Price not avalible for now
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
          <Text style={[styles.item, { textAlign: "right", marginRight: 0 }]}>
            Price not avalible for now
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
          <Text style={[styles.item, { textAlign: "right", marginRight: 0 }]}>
            Price not avalible for now
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
          <Text style={[styles.item, { textAlign: "right", marginRight: 0 }]}>
            Price not avalible for now
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
  timePickersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginBottom: 100,
    
  },
  timePickerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  timePickerLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    width: 100,
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 60,
    marginBottom: 80,
  },
});


export default CalendarScreen;
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Remove_bottom from "../components/Remove_bottom";
import Remove_Rectangle from "../components/Remove_Rectangle";
import RemoveAlert from "../components/RemoveAlert";
import {collection, getDocs, deleteDoc, doc,} from "firebase/firestore";
import db from "../config";

const Overview = () => {
  const [times, setTimes] = useState([]);
  const [timeToRemove, setTimeToRemove] = useState(null);
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);

  // Go thru the database, push all the enteties to an array and add and id to every property
  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "time"));
      const timesArray = [];
      querySnapshot.forEach((doc) => {
        timesArray.push({ id: doc.id, ...doc.data() }); // Added id property to each time object
      });

      timesArray.sort((a, b) => {
        const dateA = new Date(a.date + "T" + a.startTime);
        const dateB = new Date(b.date + "T" + b.startTime);
        return dateB - dateA;
      });

      setTimes(timesArray);
    }
    getData();
  }, []);

  const handleSelectTime = (id) => {
    setTimeToRemove(id);
    console.log("Helloooo");
  };

  const handleNotFilled = ()=> {
    console.log("goodbyeee");
    setShowRemoveAlert(false);
  };


  const handleRemoveTime = async () => {
    if (!timeToRemove) {
      console.log("No time to remove selected");
      return;
    }
    try {
      await deleteDoc(doc(db, "time", timeToRemove));
      setTimes((prevTimes) =>
        prevTimes.filter((time) => time.id !== timeToRemove)
      );
      setTimeToRemove(null);
      setShowRemoveAlert(false); // Hide the remove alert after removing the time
      console.log("Confirming removal of time with id:", timeToRemove);
    } catch (error) {
      console.error("Error removing time: ", error);
    }
  };

  const confirmRemoveTime = () => {
    setShowRemoveAlert(true);
  };
  
  const currentDate = new Date();
  const currentDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
  const pastBookings = [];
  const upcomingBookings = [];
  
  times.forEach((time) => {
    const bookingDate = new Date(time.date);
    const bookingTimeParts = time.startTime.split(":");
    const bookingTime = new Date(bookingDate.getFullYear(), bookingDate.getMonth(), bookingDate.getDate(), parseInt(bookingTimeParts[0]), parseInt(bookingTimeParts[1]));
    
    if (bookingTime <= currentDateTime) {
      pastBookings.push(time);
    } else {
      upcomingBookings.push(time);
    }
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { textAlign: "center" }]}>Day</Text>
        <Text style={[styles.headerText, { textAlign: "right" }]}>Time</Text>
        <Text style={[styles.headerText, { textAlign: "right" }]}>Remove</Text>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.splitContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
          <Text style={[styles.title, { textAlign: "left" }]}>
            Upcoming Bookings
          </Text>
        </View>
            {upcomingBookings.map((time) => (
              <View style={styles.list} key={time.id}>
                <Text style={[styles.item, { textAlign: "left" }]}>
                  {time.date}
                </Text>
                <Text
                  style={[styles.item, { textAlign: "left" }]}
                >{`${time.startTime}-${time.endTime}`}</Text>
              <Remove_bottom
                  onPress={() => handleSelectTime(time.id)}
                  onNotFilled={() => setTimeToRemove(null)}
              />
              </View>
            ))}
            <View style={styles.scrollViewHeader}>
              <View style={styles.header}>
                <Text style={[styles.title, { textAlign: "left" }]}>
                  Past Bookings
                </Text>
              </View>
            </View>

        <View style={styles.splitContainer}>
            {pastBookings.map((time) => (
              <View style={styles.list} key={time.id}>
                <Text style={[styles.item, { textAlign: "left" }]}>
                  {time.date}
                </Text>
                <Text
                  style={[styles.item, { textAlign: "left" }]}
                >{`${time.startTime}-${time.endTime}`}</Text>
                <Remove_bottom 
                onPress={() => handleSelectTime(time.id)}
                onNotFilled={() => setTimeToRemove(null)}
                />
              </View>
            ))}
        </View>
          </ScrollView>
        </View>
        <View style={styles.extraSpace} />
      </View>
      {timeToRemove && (
        <View
          style={[
            styles.Remove_Rectangle,
            { position: "absolute", bottom: -30, right: 15 },
          ]}
        >
          <Remove_Rectangle onPress={confirmRemoveTime} timeId={timeToRemove} />
        </View>
      )}
      {showRemoveAlert && (
        <RemoveAlert
          visible={true}
          onCancel={() => {
            setShowRemoveAlert(false);
            setTimeToRemove(null);
          }}
          onConfirm={handleRemoveTime}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#ffffff",
  },

  scrollViewHeader: {
    flex: 1,
    height: "100%",
    backgroundColor: "#f5f6ff",
  },

  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "100%",
    // Ange önskad maxhöjd här med enheten "px"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    //marginBottom: -25,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#001478",
    textAlign: "center",
    flex: 1,
    marginHorizontal: 35,
    marginVertical: -10,
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: "#e6e6e6",
    marginHorizontal: 20,
    marginBottom: 10,
  },

  item: {
    fontSize: 15,
    flex: 1,
    marginHorizontal: 10,
  },

  extraSpace: {
    height: 125, // Höjden på det vita utrymmet under containern
  },

  Remove_Rectangle: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 100,
    marginBottom: 100,
  },
  listContainer: {
    flex: 1,
  },
  splitContainer: {
    flex: 1,
    backgroundColor: "#f5f6ff",
  },
});

export default Overview;
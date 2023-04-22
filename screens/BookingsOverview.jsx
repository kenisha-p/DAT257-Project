import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Remove_bottom from '../components/Remove_bottom';
import Remove_Rectangle from '../components/Remove_Rectangle';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../config";

const Overview = () => {
  const [times, setTimes] = useState([]);
  const [timeToRemove, setTimeToRemove] = useState(null);

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "time"));
      const timesArray = [];
      querySnapshot.forEach((doc) => {
        timesArray.push({ id: doc.id, ...doc.data() }); // Added id property to each time object
      });
      setTimes(timesArray);
    }
    getData();
  }, []);

  const handleSelectTime = (id) => {
    setTimeToRemove(id);
  };

  const handleRemoveTime = async () => {
    if (!timeToRemove) return;
    try {
      await deleteDoc(doc(db, "time", timeToRemove));
      setTimes((prevTimes) => prevTimes.filter((time) => time.id !== timeToRemove));
      setTimeToRemove(null);
    } catch (error) {
      console.error("Error removing time: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { textAlign: 'center' }]}>Day</Text>
        <Text style={[styles.headerText, { textAlign: 'right' }]}>Time</Text>
        <Text style={[styles.headerText, { textAlign: 'right' }]}>Remove</Text>
      </View>
      {times.map((time) => (
        <View style={styles.list} key={time.id}>
          <Text style={[styles.item, { textAlign: 'left' }]}>{time.date}</Text>
          <Text style={[styles.item, { textAlign: 'left' }]}>{`${time.startTime}-${time.endTime}`}</Text>
          <Remove_bottom onPress={() => handleSelectTime(time.id)} />
        </View>
      ))}
      {timeToRemove && (
        <View style={[styles.Remove_Rectangle, { position: 'absolute', bottom: 0 }]}>
          <Remove_Rectangle onPress={handleRemoveTime} timeId={timeToRemove} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: '#e6e6e6',
    marginHorizontal: 40,
    marginBottom: 10,
  },
  
  item: {
    fontSize: 15,
    flex: 1,
    marginHorizontal: 10,
  },
  Remove_Rectangle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 100,
    marginBottom: ,
  }
});

export default Overview;

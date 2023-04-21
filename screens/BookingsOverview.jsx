import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BookedTimes from '../components/BookedTimes';
import RemoveRectangle from '../components/Remove_Rectangle';
import { collection, getDocs, onSnapshot, deleteDoc } from 'firebase/firestore';
import db from '../config';

const Overview = () => {
  const [data, setData] = useState([]);
  const collectionRef = collection(db, 'mycollection');

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collectionRef);
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        date: doc.data().date,
        startTime: doc.data().startTime,
        endTime: doc.data().endTime,
      }));
      setData(docsData);
    };
    getData();

    // Set up a listener to listen for changes to the "mycollection" collection
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        date: doc.data().date,
        startTime: doc.data().startTime,
        endTime: doc.data().endTime,
      }));
      setData(docsData);
    });

    // To stop listening for changes, call the unsubscribe function
    return () => unsubscribe();
  }, []);

  const handleRemove = async (id) => {
    try {
      await deleteDoc(collectionRef, id);
    } catch (error) {
      console.log('Error deleting document:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { textAlign: 'center' }]}>Day</Text>
        <Text style={[styles.headerText, { textAlign: 'right' }]}>Time</Text>
        <Text style={[styles.headerText, { textAlign: 'right' }]}>Remove</Text>
      </View>
      {data.map((item) => (
        <BookedTimes
          key={item.id}
          id={item.id}
          date={item.date}
          startTime={item.startTime}
          endTime={item.endTime}
          onRemove={() => handleRemove(item.id)}
        />
      ))}
      <View style={[styles.Remove_Rectangle, { position: 'absolute', bottom: 0 }]}>
        <RemoveRectangle onPress={() => {}} />
      </View>
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
  Remove_Rectangle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 115,
    marginBottom: 30,
  },
});

export default Overview;
import React, { useState, useEffect} from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import Save_rectangle from "../components/save";

import db from "../config";

const BLUE_BAR_HEIGHT = 50;

const handlePress = () => {
  Keyboard.dismiss(); 
}

const Overview = () => {
  const [washCykles, setWashCykles] = useState("");
  const [electricityConsumtion, setElectricityConsumtion] = useState("");
  const [waterConsumtion, setWaterConsumtion] = useState("");

  const updateSettings = async () => {
    const updateRef = doc(db, 'Settings', 'settings');
    if (washCykles !== "" && electricityConsumtion !== "" && waterConsumtion !== "") {
      try {
      await updateDoc(updateRef, {
        "Wash": washCykles,
        "Electricity": electricityConsumtion,
        "Water": waterConsumtion,
      });
    } catch (error) {
      console.log(error);
    }
    console.log("Settings set");

  }
  else {
    console.log("No settings changed");
  }
  };

useEffect(() => {
  async function getData() {
    const docRef = doc(db, 'Settings', 'settings');
    const docSnap = await getDoc(docRef);
    setWaterConsumtion(docSnap.data().Water);
    setElectricityConsumtion(docSnap.data().Electricity);
    setWashCykles(docSnap.data().Wash);
  }
  getData();
}, []);


  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.blueBarContainer}>
          <View style={styles.blueBar}>
            <Text style={styles.blueBarText}>My washing machine</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.labelContainer}>
            <View style={styles.row}>
              <Text style={styles.leftLabel}>
                How many wash cycles do you do in a time slot?
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={setWashCykles}
                value={washCykles}
                autoFocus={false}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.leftLabel}>
                How much electricity does your machine use per hour?
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={setElectricityConsumtion}
                value={electricityConsumtion}
                autoFocus={false}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.leftLabel}>
                How many litres of water does your machine use per wash?
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={setWaterConsumtion}
                value={waterConsumtion}
                autoFocus={false}
              />
            </View>
          </View>
        </View>
        <View
          style={[
            styles.Remove_Rectangle,
            { position: "absolute", bottom: 100, marginLeft: 100 },
          ]}
        >
          <Save_rectangle onPress={updateSettings} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  blueBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: '#3452A2',
  },

  blueBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffffff',
    height: '100%',
    backgroundColor: '#3452A2',
  },

  blueBarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 100,
    paddingHorizontal: 20,
    marginRight: 10,
  },

  labelContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    padding: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: '90%',
  },

  leftLabel: {
    color: '#000000',
    fontSize: 18,
    marginRight: 40,
    flexWrap: 'wrap',
    width: '80%',
  },

  input: {
    color: '#000000',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 5,
    width: '20%',
    marginLeft: 0,
  },

});

export default Overview;
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native"; // inkludera TextInput
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import db from "../config";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

const BLUE_BAR_HEIGHT = 50;

const Overview = () => {
  const [washCykles, setWashCykles] = useState(null);
  const [electricityConsumtion, setElectricityConsumtion] = useState(null);
  const [waterConsumtion, setWaterConsumtion] = useState(null);

  const updateSettings = async () => {
    const updateRef = doc(db, 'Settings', 'settings');
    try {
      await db.updateDoc(updateRef, {
        "Wash": washCykles,
        "Electricity": electricityConsumtion,
        "Water": waterConsumtion,
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.blueBarContainer}>
        <View style={styles.blueBar}>
          <Text style={styles.blueBarText}>My washing machine</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.labelsContainer}>
          <View style={styles.leftLabelContainer}>
            <Text style={styles.leftLabel}>How many wash cycles do you do in a time slot?</Text>
            <Text style={styles.leftLabel}>How much electricity does your machine use per hour?</Text>
            <Text style={styles.leftLabel}>How many litres of water does your machine use per wash?</Text>
          </View>
          <View style={styles.rightLabelContainer}>
            <View style={styles.inputContainer}> 
              <TextInput style={styles.input} keyboardType="numeric" onChangeText={setWashCykles} value={washCykles} /> 
            </View>
            <View style={styles.inputContainer}> 
              <TextInput style={styles.input} keyboardType="numeric" onChangeText={setElectricityConsumtion} value={electricityConsumtion} /> 
            </View>
            <View style={styles.inputContainer}> 
              <TextInput style={styles.input} keyboardType="numeric" onChangeText={setWaterConsumtion} value={waterConsumtion} /> 
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
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
  },

  leftLabelContainer: {
    marginTop: 100,
    alignItems: 'flex-start',
    marginLeft: 20,
    width: 220,
    backgroundColor: '#ffffff',
    padding: 10,
    alignItems: 'left',

  },
  
  rightLabelContainer: {
    alignItems: 'flex-start',
    width: 220, 
    backgroundColor: '#ffffff',
    padding: 10,
    marginRight: 20, 
    alignItems: 'right',
  },

  leftLabel: {
    color: '#000000',
    fontSize: 18,
    marginBottom: 80,
    flexWrap: 'wrap',
  },

  inputContainer: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: 100,
  },

  input: {
    color: '#000000',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Overview;

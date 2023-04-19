import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Remove_bottom from '../components/Remove_bottom';
import Remove_Rectangle from '../components/Remove_Rectangle';

const Overview = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { textAlign: 'center' }]}>Day</Text>
        <Text style={[styles.headerText, { textAlign: 'right' }]}>Time</Text>
        <Text style={[styles.headerText, { textAlign: 'right' }]}>Remove</Text>
      </View>
      <View style={styles.list}>
        <Text style={[styles.item, { textAlign: 'left' }]}>Monday</Text>
        <Text style={[styles.item, { textAlign: 'left' }]}>10:00 AM</Text>
        <Remove_bottom onPress={() => {}} />
      </View>
      <View style={styles.list}>
        <Text style={[styles.item, { textAlign: 'left' }]}>Tuesday</Text>
        <Text style={[styles.item, { textAlign: 'left' }]}>11:30 AM</Text>
        <Remove_bottom onPress={() => {}} />
      </View>
      <View style={styles.list}>
        <Text style={[styles.item, { textAlign: 'left' }]}>Wednesday</Text>
        <Text style={[styles.item, { textAlign: 'left' }]}>2:45 PM</Text>
        <Remove_bottom onPress={() => {}} />
      </View>
      <View style={[styles.Remove_Rectangle, { position: 'absolute', bottom: 0 }]}>
        <Remove_Rectangle onPress={() => {}} />
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
    marginHorizontal: 115,
    marginBottom: 30,
  }
});

export default Overview;

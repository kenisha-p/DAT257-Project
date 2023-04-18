import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Remove_bottom from '../components/Remove_bottom';

const Overview = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Day</Text>
        <Text style={styles.headerText}>Time</Text>
        <Text style={styles.headerText}>Remove</Text>
      </View>
      <View style={styles.list}>
        <Text style={styles.item}>Monday</Text>
        <Text style={styles.item}>10:00 AM</Text>
        <Remove_bottom onPress={() => {}} />
      </View>
      <View style={styles.list}>
        <Text style={styles.item}>Tuesday</Text>
        <Text style={styles.item}>11:30 AM</Text>
        <Remove_bottom onPress={() => {}} />
      </View>
      <View style={styles.list}>
        <Text style={styles.item}>Wednesday</Text>
        <Text style={styles.item}>2:45 PM</Text>
        <Remove_bottom onPress={() => {}} />
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
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#e6e6e6',
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
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  item: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
  Remove_buttom: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 60,
    marginBottom: 80,
  },
});

export default Overview;

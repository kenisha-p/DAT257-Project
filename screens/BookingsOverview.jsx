import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Overview = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Day</Text>
      <Text style={styles.text}>Time</Text>
      <Text style={styles.text}>Remove</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingTop: 50,
    marginBottom: 20,
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 20, // add some spacing between the texts
  },
});

export default Overview;

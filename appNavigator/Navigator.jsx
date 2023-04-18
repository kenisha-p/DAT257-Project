import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Calendar from '../screens/CalendarScreen';
import BookedTimes from '../screens/BookedTimes';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{ title: 'Add laundry' }}
      />
      <Stack.Screen
        name="BookedTimes"
        component={Overview}
        options={{ title: 'Overview' }}
      />

    </Stack.Navigator>
  );



  
};

export default Navigator;
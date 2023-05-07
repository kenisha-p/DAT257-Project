import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Calendar from '../screens/CalendarScreen';
import Overview from '../screens/BookingsOverview';
import UsageDaily from '../screens/UsageDaily';
import UsageMonthly from '../screens/UsageMonthly';

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
        name="Overview"
        component={Overview}
        options={{ title: 'Your booked times' }}
      />

      <Stack.Screen
        name="UsageDaily"
        component={UsageDaily}
        options={{ title: 'Usage' }}
      />

      <Stack.Screen
        name="UsageMonthly"
        component={UsageMonthly}
        options={{ title: 'UsageMonthly' }}
      />

    </Stack.Navigator>
  );
};

export default Navigator;

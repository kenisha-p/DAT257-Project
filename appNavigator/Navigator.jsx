import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Calendar from '../screens/CalendarScreen';
import Overview from '../screens/BookingsOverview';
import UsageDaily from '../screens/UsageDaily';
import Settings from '../screens/Settings';
import UsageMonthly from '../screens/UsageMonthly';
import { TouchableOpacity, Text, Image } from 'react-native';

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
        name="Settings"
        component={Settings}
        options={{ title: 'Settings' }}
       />

    <Stack.Screen
        name="UsageMonthly"
        component={UsageMonthly}
        options={({ navigation }) => ({
          title: 'UsageMonthly',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{ marginLeft: 7, marginBottom:0.7 }}
            >
              <Image
                source={require('../assets/HomeButton.png')}
                style={{ width: 70, height: 29 }}
              />
            </TouchableOpacity>
          ),
        })}
      />

    </Stack.Navigator>
  );
};



export default Navigator;
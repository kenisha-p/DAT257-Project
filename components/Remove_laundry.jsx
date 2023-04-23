import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const MyButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('../assets/Booked_times.png')}
      />
    </TouchableOpacity>
  );
};


export default MyButton;

import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const MyButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={require('../assets/add.png')} />
    </TouchableOpacity>
  );
};

export default MyButton;

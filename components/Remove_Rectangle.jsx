import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const MyButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('../assets/Remove_Laundry_Rectangle.png')}
        style={{ width: 190, height: 50 }}
      />
    </TouchableOpacity>
  );
};

export default MyButton;

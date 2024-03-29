import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const MyButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('../assets/settingsbutton.png')}
      />
    </TouchableOpacity>
  );
};


export default MyButton;

import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const MyButton = ({ onPress }) => {
  return (
    
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('../assets/remove_selected_times.png')}
        style={{ width: 180, height: 50 }}
      />
    </TouchableOpacity>
  );
};

export default MyButton;

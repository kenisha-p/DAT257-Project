import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

const MyButton = ({ onPress }) => {
  const [isFilled, setIsFilled] = useState(false);

  const buttonImage = isFilled
    ? require('../assets/FilledRemoveButton.png')
    : require('../assets/RemoveBottom.png');

  const handlePress = () => {
    setIsFilled(!isFilled);
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image source={buttonImage} style={{ width: 20, height: 20 }} />
    </TouchableOpacity>
  );
};

export default MyButton;

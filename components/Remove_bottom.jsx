import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

const MyButton = ({ onPress, onNotFilled }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [count, setCount] = useState(0);

  const buttonImage = isFilled
    ? require('../assets/FilledRemoveButton.png')
    : require('../assets/RemoveBottom.png');

    const handlePress = () => {
      if (isFilled) {
        setIsFilled(false);
        setCount(count - 1);
        onNotFilled();
      } else {
        setIsFilled(true);
        setCount(count + 1);
        onPress();
      }
    };
    

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image source={buttonImage} style={{ width: 20, height: 20 }} />
    </TouchableOpacity>
  );
};

export default MyButton;

import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const Electricprice = () => {

  const onPressButton = () => {
    Linking.openURL("https://www.elprisetjustnu.se");
  }

  return (
    <View>
      <TouchableOpacity onPress={onPressButton}>
        <Image
          source={{ uri: 'https://ik.imagekit.io/ajdfkwyt/hva-koster-strommen/elpriser-tillhandahalls-av-elprisetjustnu_ttNExOIU_.png' }}
          style={{ width: 200, height: 45 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Electricprice;

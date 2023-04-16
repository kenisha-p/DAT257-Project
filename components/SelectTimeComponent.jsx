import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimePicker = ({ onChange, date }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleShowPicker = () => {
    setShowPicker(true);
  };

  const handleHidePicker = () => {
    setShowPicker(false);
  };

  const handleSelectTime = (event, selectedTime) => {
    if (selectedTime) {
      onChange(selectedTime);
    }
    setShowPicker(false);
  };

  useEffect(() => {
    let timer;
    if (showPicker) {
      timer = setTimeout(() => {
        setShowPicker(false);
      }, 9000);
    }
    return () => clearTimeout(timer);
  }, [showPicker]);

  return (
    <View>
      <TouchableOpacity onPress={handleShowPicker}>
      <Text style={styles.timePickerText}>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}</Text>
      </TouchableOpacity>
      {showPicker && (
        <View style={styles.timePickerSpinnerContainer}>
          <DateTimePicker
            value={date}
            mode="time"
            display="spinner"
            onChange={handleSelectTime}
            // Tillagt nedan för att ta bort "em" och "pm"
            // Från tidsvisningen i spinner-komponenten
            options={{ showTimeZonePicker: false }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timePickerText: {
    fontSize: 24,
    marginVertical: 10,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  timePickerSpinnerContainer: {
    position: 'absolute',
    top: '80%',
    width: 120,
    //right: 1,
    //left: 1,
  },
});

export default TimePicker;

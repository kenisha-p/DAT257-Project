import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import YesButton from "../assets/yes.png";
import NoButton from "../assets/no.png";

const ConfirmBooking = ({ visible, onCancel, onConfirm }) => {
  const handleConfirm = () => {
    console.log("The yes button was clicked");
    onConfirm();
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Confirm Bookings</Text>
          <Text style={styles.subtitle}>
            Are you sure you want to book this time slot?
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Image source={NoButton} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Image source={YesButton} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    width: 290,
    height: 268,
  },
  title: {
    fontFamily: "Arial",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 32,
    color: "#090A0A",
    textAlign: "center",
    flex: 0,
    order: 0,
    flexGrow: 0,
  },
  subtitle: {
    fontFamily: "Arial",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    color: "#72777A",
    textAlign: "center",
    flex: 0,
    flexGrow: 0,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    right: 45,
  },
  button: {
    flex: 1,
  },
  buttonImage: {
    resizeMode: "stretch",
  },
});

export default ConfirmBooking;

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Confirm_delete = ({ onConfirm, onCancel }) => {
  return (
    <View style={styles.Confirm_delete}>
      <Text style={styles.confirmText}>Confirm booking?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.yesButton} onPress={onConfirm}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.noButton} onPress={onCancel}>
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Confirm_delete: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    marginTop: 200,
  },
  confirmText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  yesButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  noButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Confirm_delete;

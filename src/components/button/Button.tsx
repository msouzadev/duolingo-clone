import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}
const Button = ({ title, disabled, ...restProps }: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      {...restProps}
      style={[styles.buttonContainer, disabled ? styles.disabledContainer : {}]}
    >
      <View style={{ borderBottomWidth: 1.6, borderBottomColor: "white" }}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#58cc02",
    height: 50,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderBottomWidth: 5,
    borderColor: "#57A600",
    marginVertical: 10,
  },
  disabledContainer: {
    backgroundColor: "lightgrey",
    borderColor: "grey",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
export default Button;

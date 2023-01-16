import React from "react";
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  PressableProps,
} from "react-native";

// import { Container } from './styles';

interface WordOptions extends PressableProps {
  text: string;
  isSelected?: boolean;
}
const WordOption = ({ text, isSelected, ...rest }: WordOptions) => {
  return (
    <Pressable {...rest} disabled={isSelected}>
      <View
        style={[
          styles.root,
          { backgroundColor: isSelected ? "lightgray" : "white" },
        ]}
      >
        <Text
          style={[styles.text, { color: isSelected ? "lightgray" : "black" }]}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default WordOption;

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderWidth: 2,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 5,
    borderBottomWidth: 4,
    paddingHorizontal: 15,
    margin: 10,
  },
  text: {},
});

import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import mascot from "../../../assets/images/mascot.png";

import Button from "../button/Button";
const { width } = Dimensions.get("window");

const OpenEndedQuestion = ({ question, onCorrect }) => {
  const checkSentence = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Translate this sentence</Text>
      <View style={styles.row}>
        <Image resizeMode="contain" source={mascot} style={styles.mascot} />
        <View style={styles.sentenceContainer}>
          <Text style={styles.sentence}>{question.text}</Text>
        </View>
      </View>
      <TextInput
        multiline={true}
        style={styles.textInput}
        placeholder="Type in English"
      />
      <Button title="Check" onPress={checkSentence} disabled />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    paddingHorizontal: 15,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "stretch",
  },
  row: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  mascot: {
    width: width * 0.3,
    aspectRatio: 3 / 4,
  },
  sentenceContainer: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    padding: 10,
  },
  sentence: {
    color: "black",
    fontSize: 16,
  },
  textInput: {
    backgroundColor: "#ebebeb",
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
  },
});
export default OpenEndedQuestion;

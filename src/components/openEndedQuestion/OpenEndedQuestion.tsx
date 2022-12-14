import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import { CommonQuestion } from "../../../App";

import Button from "../button/Button";
const { width } = Dimensions.get("window");

const mascot = require("../../../assets/images/mascot.png");
export interface OpenEndedQuestionType extends CommonQuestion {
  sentence: string;
  text: string;
  answer: string;
}
interface OpenEndedQuestionProps {
  question: OpenEndedQuestionType;
  onCorrect: () => void;
  onWrong: () => void;
}
const OpenEndedQuestion = ({
  question,
  onCorrect,
  onWrong,
}: OpenEndedQuestionProps) => {
  const [input, setInputValue] = useState("");
  const checkSentence = () => {
    console.log({ question });
    if (
      question.answer.toLowerCase().trim() === input.toLocaleLowerCase().trim()
    ) {
      setInputValue("");
      return onCorrect();
    }
    setInputValue("");
    onWrong();
  };
  useEffect(() => {
    console.log("render opendeed");
  }, []);
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
        value={input}
        onChangeText={setInputValue}
        multiline={true}
        style={styles.textInput}
        placeholder="Type in English"
      />
      <Button title="Check" onPress={checkSentence} disabled={!input} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    paddingHorizontal: 20,
    flex: 1,
    paddingBottom: 20,
  },
  title: {
    marginVertical: 10,
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

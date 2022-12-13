import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import {
  Alert,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Header from "./src/components/header/Header";
import ImageMultipleChoiceQuestion, {
  ImageMultipleChoiceQuestionType,
} from "./src/components/imageMultipleChoiceQuestion/ImageMultipleChoiceQuestion";
import OpenEndedQuestion, {
  OpenEndedQuestionType,
} from "./src/components/openEndedQuestion/OpenEndedQuestion";
import questions from "./assets/data/allQuestions";

export interface CommonQuestion {
  id: string;
  type: string;
}
const randomizeQuestions = () => {
  const allQuestions = questions;
  let newArray = [];
  let addedIndexes: number[] = [];
  while (newArray.length !== allQuestions.length) {
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    if (!addedIndexes.includes(randomIndex)) {
      addedIndexes.push(randomIndex);
      newArray.push(allQuestions[randomIndex]);
    }
  }
  return newArray;
};
const allQuestions = randomizeQuestions();
console.log({ allQuestions });
export default function App() {
  const [questions, setQuestions] = useState(randomizeQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const { width } = useWindowDimensions();

  const scrollViewRef = useRef<ScrollView>(null);

  const handleNextQuestion = () => {
    if (allQuestions.length === currentQuestionIndex + 1) {
      return;
    }

    scrollViewRef.current?.scrollTo({
      y: 0,
      x: (currentQuestionIndex + 1) * width,
      animated: true,
    });
    setCurrentQuestionIndex((current) => current + 1);
  };

  const onWrong = () => {
    if (lives <= 1) {
      return Alert.alert("Game over", "Try again", [
        { text: "Try again", onPress: restart },
      ]);
    }
    Alert.alert("Wroong");
    setLives((current) => current - 1);
  };
  const restart = () => {
    setLives(5);
    setQuestions(randomizeQuestions());
    scrollViewRef.current?.scrollTo({
      y: 0,
      x: 0,
      animated: false,
    });

    setCurrentQuestionIndex(0);
  };
  return (
    <View style={styles.container}>
      <Header currentQuestionIndex={currentQuestionIndex + 1} lives={lives} />
      <ScrollView
        ref={scrollViewRef}
        horizontal
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: 10 }}
      >
        {questions.map((question) => {
          if (question.type === "OPEN_ENDED") {
            return (
              <OpenEndedQuestion
                key={question.id}
                question={question as OpenEndedQuestionType}
                onCorrect={handleNextQuestion}
                onWrong={onWrong}
              />
            );
          }
          return (
            <ImageMultipleChoiceQuestion
              key={question.id}
              question={question as ImageMultipleChoiceQuestionType}
              onCorrect={handleNextQuestion}
              onWrong={onWrong}
            />
          );
        })}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: Constants.statusBarHeight,
  },
});

import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: 40 }}
      >
        {allQuestions.map((question, index) => {
          if (question.type === "OPEN_ENDED") {
            return (
              <OpenEndedQuestion
                key={question.id}
                question={question as OpenEndedQuestionType}
                onCorrect={handleNextQuestion}
              />
            );
          }
          return (
            <ImageMultipleChoiceQuestion
              key={question.id}
              question={question as ImageMultipleChoiceQuestionType}
              onCorrect={handleNextQuestion}
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

    paddingTop: 10,
  },
});

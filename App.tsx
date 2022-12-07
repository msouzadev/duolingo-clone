import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import imageQuestions from "./assets/data/imageMulatipleChoiceQuestions";
import ImageMultipleChoiceQuestion from "./src/components/imageMultipleChoiceQuestion/ImageMultipleChoiceQuestion";
import OpenEndedQuestion from "./src/components/openEndedQuestion/OpenEndedQuestion";
import openEndedQuestions from "./assets/data/openEndedQuestions";
export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { width } = useWindowDimensions();

  const scrollViewRef = useRef<ScrollView>(null);

  const allQuestions = [...imageQuestions, ...openEndedQuestions].sort();
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
                question={question}
                onCorrect={handleNextQuestion}
              />
            );
          }
          return (
            <ImageMultipleChoiceQuestion
              key={`question-${index}`}
              question={question}
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

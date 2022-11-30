import React, { useState } from "react";
import {
  Alert,
  useWindowDimensions,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Button from "../button/Button";
import ImageOption from "../imageOption/ImageOption";

interface Option {
  id: string;
  correct?: boolean;
  image: string;
  text: string;
}

interface Question {
  question: string;
  options: Option[];
}
interface ImageMultipleChoiceQuestionProps {
  question: Question;
  onCorrect: () => void;
}
const ImageMultipleChoiceQuestion = ({
  question,
  onCorrect,
}: ImageMultipleChoiceQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<Option>();
  const { width } = useWindowDimensions();
  const handleSelectOption = (option: Option) => () =>
    setSelectedOption(option);

  const onPressCheck = () => {
    if (selectedOption?.correct) {
      return onCorrect();
    }
    Alert.alert("Wroong");
  };
  return (
    <View {...{ width }}>
      <Text style={styles.title}>{question.question}</Text>
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <ImageOption
            style={{
              marginLeft: index % 2 === 0 ? 0 : 20,
            }}
            onPress={handleSelectOption(option)}
            key={option.id}
            data={{
              image: option.image,
              text: option.text,
              isSelected: selectedOption?.id === option.id,
            }}
          />
        ))}
      </View>
      <Button title="Check" disabled={!selectedOption} onPress={onPressCheck} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  title: { fontSize: 20, fontWeight: "bold", alignSelf: "stretch" },
  optionsContainer: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default ImageMultipleChoiceQuestion;

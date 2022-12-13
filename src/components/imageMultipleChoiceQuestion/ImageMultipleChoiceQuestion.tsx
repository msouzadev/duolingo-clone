import React, { useEffect, useState } from "react";
import {
  Alert,
  useWindowDimensions,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { CommonQuestion } from "../../../App";
import Button from "../button/Button";
import ImageOption from "../imageOption/ImageOption";

interface Option {
  id: string;
  correct?: boolean;
  image: string;
  text: string;
}

export interface ImageMultipleChoiceQuestionType extends CommonQuestion {
  question: string;
  options: Option[];
}
interface ImageMultipleChoiceQuestionProps {
  question: ImageMultipleChoiceQuestionType;
  onCorrect: () => void;
  onWrong: () => void;
}
const ImageMultipleChoiceQuestion = ({
  question,
  onCorrect,
  onWrong,
}: ImageMultipleChoiceQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<Option>();
  const { width } = useWindowDimensions();
  const handleSelectOption = (option: Option) => () =>
    setSelectedOption(option);

  const onPressCheck = () => {
    if (selectedOption?.correct) {
      return onCorrect();
    }
    onWrong();
  };
  useEffect(() => {
    console.log("render image multiple choice");
  }, []);
  return (
    <View {...{ width }} style={{ paddingHorizontal: 10 }}>
      <Text style={styles.title}>{question.question}</Text>
      <View style={styles.optionsContainer}>
        {question.options.map((option: Option, index: number) => (
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
  title: { fontSize: 20, fontWeight: "bold", alignSelf: "stretch" },
  optionsContainer: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
});

export default ImageMultipleChoiceQuestion;

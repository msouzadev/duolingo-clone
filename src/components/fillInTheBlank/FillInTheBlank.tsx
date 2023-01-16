import React, { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { Text, StyleSheet } from "react-native";
import Button from "../button/Button";
import WordOption from "../wordOption/WordOption";
export interface FillIntheBlankQuestion {
  id: string;
  type: string;
  parts: { text: string; isBlank: boolean; selected: string | null }[];
  options: string[];
}
interface FillIntheBlankProps {
  question: FillIntheBlankQuestion;
  onCorrect: () => void;
  onWrong: () => void;
}
const FillInTheBlank = ({
  question,
  onCorrect,
  onWrong,
}: FillIntheBlankProps) => {
  const [parts, setParts] = useState(question.parts);
  const checkSentence = () => {
    const isCorrect =
      parts.filter((part) => part.isBlank && part.selected !== part.text)
        .length === 0;

    console.log({ parts });
    if (isCorrect) {
      setParts((oldState) =>
        oldState.map((part) => ({ ...part, selected: null }))
      );
      return onCorrect();
    }
    onWrong();
  };

  const { width } = useWindowDimensions();

  const addOptionToSelected = (option: string) => () => {
    const newParts = [...parts];

    const index = newParts.findIndex((part) => part.isBlank && !part.selected);
    console.log(index);
    if (index >= 0) {
      console.log({ current: newParts[index] });
      newParts[index].selected = option;
    }

    setParts(newParts);
  };
  const removeSelectedAt = (index: number) => () => {
    const newParts = [...parts];
    newParts[index].selected = null;
    setParts(newParts);
  };
  const isSelected = (option: string) => {
    return (
      parts.filter((part) => part.isBlank && part.selected === option).length >
      0
    );
  };
  const isReadyToCheck = () => {
    return parts.filter((part) => part.isBlank && !part.selected).length > 0;
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }} {...{ width }}>
      <Text style={styles.title}>Complete the sentence</Text>
      <View style={styles.row}>
        {parts.map((part, index) => {
          return part.isBlank ? (
            <View style={styles.blank} key={part.text}>
              {part.selected && (
                <WordOption
                  text={part.selected}
                  onPress={removeSelectedAt(index)}
                />
              )}
            </View>
          ) : (
            <Text style={styles.text}>{part.text}</Text>
          );
        })}
      </View>
      <View style={styles.optionsContainer}>
        {question.options.map((option) => (
          <WordOption
            key={option}
            onPress={addOptionToSelected(option)}
            text={option}
            isSelected={isSelected(option)}
          />
        ))}
      </View>
      <Button
        title="Check"
        onPress={checkSentence}
        disabled={isReadyToCheck()}
      />
    </View>
  );
};

export default FillInTheBlank;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginVertical: 10,
    height: 60,
  },
  text: { alignSelf: "flex-end", fontSize: 18 },
  blank: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 2,
    width: 100,
  },
  optionsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
  },
});

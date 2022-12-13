import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, Text, Animated } from "react-native";
import ProgressBar from "../progressBar/ProgressBar";
import allQuestions from "../../../assets/data/allQuestions";

interface HeaderProps {
  currentQuestionIndex: number;
  lives: number;
}
const heart = require("../../../assets/images/heart.png");
const Header = ({ currentQuestionIndex, lives }: HeaderProps) => {
  const scaleAnimValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnimValue, {
        toValue: 0.7,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimValue, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, [lives]);
  return (
    <View style={styles.root}>
      <ProgressBar total={allQuestions.length} current={currentQuestionIndex} />

      <Animated.Image
        resizeMode="contain"
        source={heart}
        style={[styles.heart, { transform: [{ scale: scaleAnimValue }] }]}
      />
      <Text style={styles.lives}>{lives}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  heart: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  lives: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default Header;

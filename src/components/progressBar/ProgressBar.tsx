import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from "react-native";

// import { Container } from './styles';

const ProgressBar = ({ total, current }) => {
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const { width } = useWindowDimensions();
  const translatXValue = useRef(new Animated.Value(-width));
  useEffect(() => {
    const progress = -progressBarWidth + (progressBarWidth * current) / total;
    console.log({ progress: progress, total });
    Animated.timing(translatXValue.current, {
      toValue: progress,
      useNativeDriver: true,
    }).start();
  }, [total, current, progressBarWidth]);
  return (
    <View
      style={styles.bg}
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => setProgressBarWidth(width)}
    >
      <Animated.View
        style={[
          styles.fg,
          { transform: [{ translateX: translatXValue.current }] },
        ]}
      >
        <View style={styles.highlight} />
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  bg: {
    backgroundColor: "lightgrey",
    height: 30,
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
  fg: {
    flex: 1,
    backgroundColor: "#FAC800",
    borderRadius: 15,
  },
  highlight: {
    backgroundColor: "#FAD131",
    width: "90%",
    height: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "center",
  },
});
export default ProgressBar;

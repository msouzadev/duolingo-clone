import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");
interface ImageOptionTypes {
  text: string;
  image: string;
  isSelected: boolean;
}
interface ImageOptionProps extends TouchableOpacityProps {
  data: ImageOptionTypes;
}
const ImageOption = ({ data, ...rest }: ImageOptionProps) => {
  const { text, image, isSelected } = data;
  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.optionContainer,
        isSelected ? styles.selectedContainer : {},
        rest.style,
      ]}
    >
      <Image
        source={{
          uri: image,
        }}
        resizeMode="contain"
        style={styles.optionImage}
      />
      <Text style={[styles.optionText, isSelected ? styles.selectedText : {}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    // border
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: "lightgrey",
    borderRadius: 10,

    // size
    width: width * 0.45,
    height: height * 0.4,
    // marginRight: 1,
    //spacing
    padding: 10,
    marginBottom: 5,
    alignItems: "center",
  },
  selectedContainer: {
    backgroundColor: "#DDF4FE",
    borderColor: "#81D5FE",
  },
  optionImage: {
    width: "100%",
    flex: 1,
  },
  optionText: {
    fontWeight: "bold",
    color: "black",
  },
  selectedText: {
    fontWeight: "bold",
    color: "#40BEF7",
  },
});
export default ImageOption;

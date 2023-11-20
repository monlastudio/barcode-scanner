import { Pressable, StyleSheet, View, Text } from "react-native";

function ElevatedButton({ children, style, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed, style]}
      onPress={onPress}
    >
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 24,
    backgroundColor: "black",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    fontWeight: "bold",
    color: "white",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default ElevatedButton;

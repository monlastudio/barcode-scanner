import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function SettingScreen() {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.warningContainer}>
        <Text style={styles.warningText}>Under developing</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "gray",
  },
  warningContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: GlobalStyles.colors.errorBackground,
    borderRadius: 16,
  },
  warningText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.colors.errorForeground,
  },
});

export default SettingScreen;

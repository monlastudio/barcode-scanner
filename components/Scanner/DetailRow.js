import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>{label}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomColor: GlobalStyles.colors.border,
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
    color: GlobalStyles.colors.text50,
    marginRight: 16,
  },
  valueText: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: GlobalStyles.colors.text,
  },
});

export default DetailRow;

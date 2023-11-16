import { View, Text, StyleSheet, Image } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import IconButton from "../UI/IconButton";

function HistoryItem({ id, barcode, code, type, date }) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/barcode.png")}
          contentFit="contain"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.codeText}>{code}</Text>
        <Text style={styles.typeText}>{type}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <View>
        <IconButton icon="trash" size={24} color={GlobalStyles.colors.error}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  imageContainer: {
    flex: 1,
    width: 80,
    height: 64,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flex: 2,
    flexDirection: "column",
    marginHorizontal: 16,
  },
  codeText: {
    color: GlobalStyles.colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
  typeText: {
    color: GlobalStyles.colors.text50,
    fontSize: 12,
    fontWeight: "600",
  },
  dateText: {
    color: GlobalStyles.colors.text50,
    fontSize: 12,
    fontWeight: "500",
  },
});

export default HistoryItem;

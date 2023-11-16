import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";

import HistoryItem from "../components/ScanHistory/HistoryItem";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";

const DUMMY_DATA = [
  {
    id: 1,
    barcode: "123",
    code: "020418191992",
    type: "Type of code",
    date: "2020-06-02 07:10:15",
  },
  {
    id: 2,
    barcode: "123",
    code: "020418191992",
    type: "Type of code",
    date: "2020-06-02 07:10:15",
  },
  {
    id: 3,
    barcode: "123",
    code: "020418191992",
    type: "Type of code",
    date: "2020-06-02 07:10:15",
  },
  {
    id: 4,
    barcode: "123",
    code: "020418191992",
    type: "Type of code",
    date: "2020-06-02 07:10:15",
  },
];

function renderHistoryItem(itemData) {
  return <HistoryItem {...itemData.item} />;
}

function ScanHistoryScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton icon="ellipsis-vertical" size={20} color={tintColor} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={DUMMY_DATA}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background,
  },
  listContainer: {
    padding: 16,
  },
});

export default ScanHistoryScreen;

import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";

import HistoryItem from "../components/ScanHistory/HistoryItem";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { removeHistory } from "../store/redux/histories";

function ScanHistoryScreen({ navigation }) {
  const dispatch = useDispatch();
  const historiesList = useSelector((state) => state.histories.data);

  function onHistoryDeleteHandler(id) {
    dispatch(removeHistory({ id: id }));
  }

  function renderHistoryItem(itemData) {
    return (
      <HistoryItem
        {...itemData.item}
        onDelete={onHistoryDeleteHandler.bind(this, itemData.item.id)}
      />
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton icon="ellipsis-vertical" size={20} color={tintColor} />
      ),
    });
  }, [navigation]);

  if (historiesList.length === 0) {
    return (
      <View
        style={[
          styles.rootContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>No scanned history here</Text>
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={historiesList}
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

import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLayoutEffect, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import HistoryItem from "../components/ScanHistory/HistoryItem";
import { GlobalStyles } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataFromAsyncStorage,
  removeDataFromAsyncStorage,
} from "../store/redux/histories";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";

function ScanHistoryScreen({ navigation }) {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.histories);

  function onHistoryDeleteHandler(id) {
    dispatch(removeDataFromAsyncStorage(id));
  }

  function renderHistoryItem(itemData) {
    return (
      <HistoryItem
        {...itemData.item}
        onDelete={onHistoryDeleteHandler.bind(this, itemData.item.id)}
      />
    );
  }

  useEffect(() => {
    dispatch(fetchDataFromAsyncStorage());
    console.log(data);
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <MenuProvider>
          <Menu>
            <MenuTrigger
              customStyles={{
                triggerWrapper: {
                  top: 16,
                  right: 16,
                },
              }}
            >
              <Ionicons name="ellipsis-vertical" size={20} color={tintColor} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => alert(`Save`)} text="Delete all" />
            </MenuOptions>
          </Menu>
        </MenuProvider>
      ),
    });
  }, [navigation]);

  if (data == null) {
    return (
      <View
        style={[
          styles.rootContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>{error ?? "No scanned history here"}</Text>
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={data}
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

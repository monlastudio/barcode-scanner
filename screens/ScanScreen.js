import { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Dropdown } from "react-native-element-dropdown";

import IconButton from "../components/UI/IconButton";
import ResultBottomSheet from "../components/UI/ResultBottomSheet";

function ScanScreen() {
  const dropdownData = [
    { label: "Default camera", value: BarCodeScanner.Constants.Type.back },
    { label: "Front camera", value: BarCodeScanner.Constants.Type.front },
  ];

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(dropdownData[0].value);
  const [isFocus, setIsFocus] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");

      if (hasPermission) {
        setDropdownValue(dropdownData[0].value);
      }
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View style={{ minWidth: 200 }}>
          <Dropdown
            style={styles.dropdown}
            data={dropdownData}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select item" : "..."}
            value={dropdownValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setDropdownValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <IconButton icon="md-flashlight" size={24} color="white" />
      </View>
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.barcode}
          type={dropdownValue}
        />
      </View>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>
          {scanned ? "Scanning..." : "Point your camera at a barcode"}
        </Text>
      </View>
      <ResultBottomSheet trigger={scanned}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(50, 50, 50, 0.34)",
    padding: 16,
    alignItems: "center",
  },
  topBar: {
    position: "absolute",
    top: 32,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: "white",
  },
  barcodeBox: {
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: "rgba(50, 50, 50, 0.34)",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: "100%",
    overflow: "hidden",
    borderRadius: 8,
  },
  barcode: {
    height: 600,
    width: "100%",
  },
  iconStyle: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
  modalContainer: {
    position: "absolute",
    bottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(50, 50, 50, 0.34)",
    borderRadius: 6,
  },
  modalText: {
    color: "white",
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
  },
});

export default ScanScreen;

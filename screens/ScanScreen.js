import { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import ScannerFrame from "../assets/images/scan-frame.svg";

function ScanScreen() {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
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
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.barcode]}
      >
        <View style={styles.overlay}>
          <ScannerFrame style={styles.overlayCenter} />
        </View>
      </BarCodeScanner>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  barcode: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayCenter: {
    backgroundColor: "transparent",
    opacity: 0.7,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default ScanScreen;

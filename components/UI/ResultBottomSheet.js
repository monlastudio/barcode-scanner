import { StyleSheet, Text, View, Image } from "react-native";
import { useCallback, useMemo, useRef, useEffect, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

import { GlobalStyles } from "../../constants/styles";
import { getProductWithCode } from "../../server/http";
import IconButton from "./IconButton";
import ElevatedButton from "./ElevatedButton";
import DetailRow from "../Scanner/DetailRow";
import { formatDateToISO } from "../../utils/date";
import { useDispatch } from "react-redux";
import { addDataToAsyncStorage } from "../../store/redux/histories";

function ResultBottomSheet({ data, onClosed }) {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef(null);
  const [scannedProduct, setScannedProduct] = useState(null);
  const snapPoints = useMemo(() => ["60%"], []);

  const handleSheetChanges = useCallback(() => {
    if (bottomSheetRef != null) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, []);

  useEffect(() => {
    if (data) {
      getProduct().then(() => {
        handleSheetChanges();
      });
    }
  }, [data]);

  async function getProduct() {
    const result = await getProductWithCode(data);

    if (result !== null && result.devices.length > 0) {
      setScannedProduct(result.devices[0]);
      dispatch(addDataToAsyncStorage(result.devices[0]));
    }
  }

  function closeButtonHandler() {
    bottomSheetRef.current.close();
    onClosed();
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ display: "none" }}
      handleStyle={{ padding: 0 }}
    >
      {scannedProduct != null ? (
        <View style={styles.contentContainer}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>1 match found</Text>
            <IconButton
              icon="md-chevron-down"
              size={24}
              onPress={closeButtonHandler}
            />
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.detailContainer}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require("../../assets/images/medic.jpg")}
                  contentFit="contain"
                />
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.sectionTitle}>
                  {scannedProduct.device_name}
                </Text>
                <Text style={{ fontFamily: "Montserrat-Regular" }}>
                  {scannedProduct.device_description}
                </Text>
              </View>
            </View>
            <DetailRow label="CODE" value={scannedProduct.id} />
            <DetailRow
              label="MANUFACTURED BY"
              value={scannedProduct.manufacture ?? "-"}
            />
            <DetailRow
              label="CREATION DATE"
              value={formatDateToISO(scannedProduct.created_at)}
            />
            <DetailRow
              label="EXPIRATION DATE"
              value={formatDateToISO(scannedProduct.updated_at)}
            />
            <ElevatedButton
              style={{ marginTop: 16 }}
              onPress={closeButtonHandler}
            >
              Close
            </ElevatedButton>
          </View>
        </View>
      ) : (
        <View style={styles.notFoundContainer}>
          <Text style={styles.warningText}>No product found with the code</Text>
        </View>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomColor: GlobalStyles.colors.border,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Montserrat-Bold",
    color: GlobalStyles.colors.text,
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
    marginBottom: 16,
  },
  imageContainer: {
    width: 96,
    height: 96,
    marginRight: 16,
  },
  image: {
    flex: 1,
    width: "100%",
    borderRadius: 2,
  },
  warningText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ResultBottomSheet;

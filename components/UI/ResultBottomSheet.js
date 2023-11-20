import { StyleSheet, Text, View, Image } from "react-native";
import { useCallback, useMemo, useRef, useEffect } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

import { GlobalStyles } from "../../constants/styles";
import IconButton from "./IconButton";
import ElevatedButton from "./ElevatedButton";
import DetailRow from "../Scanner/DetailRow";

function ResultBottomSheet({ trigger, onClosed }) {
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  // callbacks
  const handleSheetChanges = useCallback(() => {
    if (bottomSheetRef != null) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, []);

  useEffect(() => {
    if (trigger) {
      handleSheetChanges();
    }
  }, [trigger]);

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
              <Text style={styles.sectionTitle}>Test Tube</Text>
              <Text style={{ fontFamily: "Montserrat-Regular" }}>
                A test tube, also known as a culture tube or sample tube, is a
                common piece of laboratory glassware consisting.
              </Text>
            </View>
          </View>
          <DetailRow label="CODE" value="392387498347242" />
          <DetailRow label="MANUFACTURED BY" value="Company name" />
          <DetailRow label="CREATION DATE" value="2018-01-01" />
          <DetailRow label="EXPIRATION DATE" value="2023-01-01" />
          <ElevatedButton style={{ marginTop: 16 }}>Close</ElevatedButton>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
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
    alignItems: "center",
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
});

export default ResultBottomSheet;

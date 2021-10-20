import * as React from "react";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import { StyledAutocomplete } from "../components/StyledAutocomplete";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <StyledAutocomplete />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

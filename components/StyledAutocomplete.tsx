import * as React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { Avatar } from "react-native-elements";
import IGitUser from "../interfaces/IGitUser";
import { fetchUsers } from "../utils/fetchUsers";

import { Text, View } from "./Themed";

export function StyledAutocomplete() {
  const [queriedUsers, setQueriedUsers] = useState<any>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const updateMe = async () => {
      try {
        const results = await fetchUsers(query);
        setQueriedUsers(results.items);
      } catch (e) {
        console.log("catch error", e);
      }
    };
    query && updateMe();
  }, [query]);

  return (
    <View style={styles.styledAutocompleteView}>
      <AntDesign
        name="search1"
        size={18}
        color="gray"
        style={styles.searchIcon}
      />
      <Autocomplete
        editable={true}
        autoCorrect={false}
        containerStyle={styles.autocompleteContainer}
        inputContainerStyle={styles.inputContainer}
        data={query ? queriedUsers : []}
        value={query}
        onChangeText={setQuery}
        placeholder="Type in a GitHub username..."
        flatListProps={{
          keyboardShouldPersistTaps: "always",
          keyExtractor: (item: IGitUser) => item.id + "",
          renderItem: ({ item: { login, avatar_url, html_url } }) => (
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                marginVertical: 5,
                alignItems: "center",
                alignContent: "center",
              }}
              onPress={async () => {
                setQuery(login);
                const supported = await Linking.canOpenURL(html_url);
                supported && (await Linking.openURL(html_url));
              }}
            >
              <Avatar
                rounded
                source={{ uri: avatar_url }}
                size="small"
                containerStyle={{
                  justifyContent: "flex-start",
                  alignSelf: "flex-start",
                }}
              />
              <Text style={styles.itemText}>{login}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <AntDesign
        name="close"
        size={18}
        color="gray"
        style={styles.clearIcon}
        onPress={() => setQuery("")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  styledAutocompleteView: {
    // Hack required to make the autocomplete
    // work on Andrdoid
    flexDirection: "row",
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 5,
    borderColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "silver",
    alignItems: "center",
    alignContent: "center",
  },
  autocompleteContainer: {
    borderWidth: 0,
    flex: 1,
    borderColor: "transparent",
  },
  itemText: {
    fontSize: 15,
    margin: 2,
    marginLeft: 10,
  },
  searchIcon: {
    paddingLeft: 10,
    backgroundColor: "transparent",
  },
  clearIcon: {
    paddingRight: 10,
    backgroundColor: "transparent",
  },
  inputContainer: {
    borderColor: "transparent",
  },
});

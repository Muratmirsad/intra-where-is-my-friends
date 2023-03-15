import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Image, ImageStyle, TextStyle, Keyboard, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Card, Screen, Text, TextField, AutoImage, Button } from "../components"
import { colors } from "../theme/colors"
import { spacing } from "../theme/spacing"
import { handleSearch } from "../services/api"
import { addFriend, removeFriend, getFriends, clear } from "../utils/storage"

export const SearchScreen: FC<StackScreenProps<AppStackScreenProps, "Search">> = observer(function SearchScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [friendIndex, setFriendIndex] = useState(0);
  const [isFriend, setIsFriend] = useState(false);

  getFriends().then((data) => {
    if (data.map((friend) => friend.login).includes(searchResults.login)) {
      setIsFriend(true);
      if (data.map((friend) => friend.login).indexOf(searchResults.login) !== friendIndex) {
        setFriendIndex(data.map((friend) => friend.login).indexOf(searchResults.login));
      }
    } else {
      setIsFriend(false);
    }
  }).catch(() => {
    setIsFriend(false);
  });

  // add friend card to friends list in WelcomeScreen and remove from search results

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$container} safeAreaEdges={["top", "bottom"]}>
      <View style={$topContainer}>
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="searchScreen.searchLabel"
          preset="heading"
        />
        <Text tx="searchScreen.searchSublabel" preset="subheading" />
        <TextField
          testID="search-input"
          containerStyle={{ width: "100%", marginTop: spacing.medium }}
          placeholderTx="searchScreen.searchPlaceholder"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          blurOnSubmit={true}
          onSubmitEditing={() => {
            if (searchQuery !== "") {
              handleSearch(searchQuery, setSearchResults);
            }
            Keyboard.dismiss();
          }}
          style={{ marginBottom: spacing.medium, marginTop: spacing.medium }}
        />
      </View>
      <View style={$bottomContainer}>
        {searchResults ? (
          <View>
            <Card
              testID="search-results"
              preset="default"
              verticalAlignment="center"
              style={{ padding: 10, alignItems: "center" }}
              HeadingTextProps={{ weight: "bold" }}
              ContentTextProps={{ weight: "light" }}
              heading={searchResults.login}
              content={searchResults.usual_full_name}
              footer={searchResults.location}
              LeftComponent={
                <AutoImage
                  style={{ borderRadius: 15, marginRight: 10, width: 80, height: 80 }}
                  source={{
                    uri: searchResults.image.link,
                  }}
                />
              }
            />
            {isFriend ? (
              <Button
              testID="add-friend-button"
              preset="default"
              style={{ marginTop: spacing.medium, backgroundColor: colors.palette.angry100, borderRadius: 15 }}
              text="Remove Friend"
              onPress={() => {
                console.log("Friend removed");
                removeFriend(friendIndex);
                setIsFriend(false);
              }}
            />
            ) : (
              <Button
              testID="add-friend-button"
              preset="default"
              style={{ marginTop: spacing.medium, backgroundColor: colors.palette.secondary200, borderRadius: 15 }}
              text="Add Friend"
              onPress={() => {
                console.log("Friend added");
                addFriend(searchResults);
                setIsFriend(true);
              }}
            />
            )}
          </View>
          ) : (
            <Card
              testID="search-results"
              preset="default"
              verticalAlignment="center"
              style={{ padding: 10, alignItems: "center" }}
              headingStyle={{ color: "#000" }}
              HeadingTextProps={{ weight: "bold" }}
              contentStyle={{ color: "#000" }}
              ContentTextProps={{ weight: "light" }}
              heading="No results"
              content="Try searching for a friend's username"
              LeftComponent={
                <AutoImage
                  style={{ borderRadius: 15, marginRight: 10, width: 80, height: 80 }}
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                  }}
                />
              }
            />
          )}
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "55%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "45%",
  backgroundColor: colors.background,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  paddingTop: spacing.large,
}
const $welcomeLogo: ImageStyle = {
  width: 200,
  height: 200,
  marginBottom: spacing.medium,
}

const $welcomeHeading: TextStyle = {
  marginTop: spacing.huge,
  marginBottom: spacing.medium,
}
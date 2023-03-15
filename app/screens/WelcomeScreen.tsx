import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, FlatList, RefreshControl } from "react-native"
import { Screen, Toggle } from "../components"
import {
  EmptyState,
  Text,
  Card,
  Button,
  AutoImage,
} from "../components"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { getFriends, removeFriend } from "../utils/storage"

const welcomeLogo = require("../../assets/images/42logo.png")

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen( { navigation }
) {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const [friends, setFriends] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  async function onRefresh() {
    setRefreshing(true);
    getFriends().then((data) => {
      setFriends(data);
      //console.log(friends);
    }).catch(() => {
      setFriends(null);
    });
    setRefreshing(false);
  }

  useEffect(() => {
    getFriends().then((data) => {
      setFriends(data);
      //console.log(friends);
    }).catch(() => {
      setFriends(null);
    });
  }, []);

  const removeCard = (index) => {
    const newFriends = friends.filter((friend, i) => i !== index);
    setFriends(newFriends);
  }

  return (
    <Screen style={$container} preset="scroll" safeAreaEdges={["top", "bottom"]}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text tx="welcomeScreen.headerSublabel" preset="subheading" />
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.headerLabel"
          preset="heading"
        />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <FlatList
          testID="search-results"
          data={friends}
          keyExtractor={(item) => item.login}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListEmptyComponent={
            <EmptyState
              preset="generic"
              style={{ padding: 10 }}
              imageSource={require("../../assets/images/sad-face.png")}
              imageStyle={{ height: 150, width: 150 }}
              ImageProps={{ resizeMode: "contain" }}
              headingStyle={{ color: "#000" }}
              HeadingTextProps={{ weight: "bold" }}
              contentStyle={{ color: "#000" }}
              ContentTextProps={{ weight: "light" }}
              headingTx="welcomeScreen.emptyStateHeading"
              contentTx="welcomeScreen.emptyStateContent"
              buttonTx="welcomeScreen.addFriendButton"
              buttonOnPress={() => navigation.navigate("Search")}
            />
          }
          renderItem={({ item, index }) => (
            <View key={index}>
              <Card
                preset="default"
                verticalAlignment="center"
                style={{ padding: 10, alignItems: "center", marginBottom: 15 }}
                HeadingTextProps={{ weight: "bold" }}
                ContentTextProps={{ weight: "light" }}
                heading={item.login}
                content={item.usual_full_name}
                footer={item.location}
                LeftComponent={
                  <AutoImage
                    style={{ borderRadius: 15, marginRight: 10, width: 80, height: 80 }}
                    source={{
                      uri: item.image.link,
                    }}
                  />
                }
              />
              <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginBottom: 35 }}>
                <Button
                  testID="open-notifications-button"
                  preset="default"
                  textStyle={{ fontSize: 14 }}
                  style={{ backgroundColor: colors.palette.accent100 , borderRadius: 15, width: 155 }}
                  text="Open Notifications"
                  onPress={() => {
                    console.log("Notifications opened");
                  }}
                />
                <Button
                  testID="remove-friend-button"
                  preset="default"
                  textStyle={{ fontSize: 14}}
                  style={{ backgroundColor: colors.palette.angry100, borderRadius: 15, width: 155, }}
                  text="Remove Friend"
                  onPress={() => {
                    console.log("Friend removed");
                    removeFriend(index);
                    removeCard(index);
                  }}
                />
              </View>
            </View>
          )}
        />
        {/**
        {friends && friends.length > 0 ? friends.map((friend, index) => (
          <View key={index}>
            <Card
            testID="search-results"
            preset="default"
            verticalAlignment="center"
            style={{ padding: 10, alignItems: "center", marginBottom: 15 }}
            HeadingTextProps={{ weight: "bold" }}
            ContentTextProps={{ weight: "light" }}
            heading={friend.login}
            content={friend.usual_full_name}
            footer={friend.location}
            LeftComponent={
              <AutoImage
                style={{ borderRadius: 15, marginRight: 10, width: 80, height: 80 }}
                source={{
                  uri: friend.image.link,
                }}
              />
            }
            />
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginBottom: 35 }}>
              <Button
                testID="open-notifications-button"
                preset="default"
                textStyle={{ fontSize: 14 }}
                style={{ backgroundColor: colors.palette.accent100 , borderRadius: 15, width: 155 }}
                text="Open Notifications"
                onPress={() => {
                  console.log("Notifications opened");
                }}
              />
              <Button
                testID="remove-friend-button"
                preset="default"
                textStyle={{ fontSize: 14}}
                style={{ backgroundColor: colors.palette.angry100, borderRadius: 15, width: 155, }}
                text="Remove Friend"
                onPress={() => {
                  console.log("Friend removed");
                  removeFriend(index);
                  removeCard(index);
                }}
              />
            </View>
          </View>
        )) : (
          <EmptyState
          preset="generic"
          style={{ padding: 10 }}
          imageSource={require("../../assets/images/sad-face.png")}
          imageStyle={{ height: 150, width: 150 }}
          ImageProps={{ resizeMode: "contain" }}
          headingStyle={{ color: "#000" }}
          HeadingTextProps={{ weight: "bold" }}
          contentStyle={{ color: "#000" }}
          ContentTextProps={{ weight: "light" }}
          headingTx="welcomeScreen.emptyStateHeading"
          contentTx="welcomeScreen.emptyStateContent"
          buttonTx="welcomeScreen.addFriendButton"
          buttonOnPress={() => navigation.navigate("Search")}
          />
        )}
          
        */}
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
  flexBasis: "45%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "55%",
  backgroundColor: colors.background,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  width: 200,
  height: 200,
  marginBottom: spacing.medium,
}

const $welcomeHeading: TextStyle = {
  marginTop: spacing.medium,
  marginBottom: spacing.huge,
}

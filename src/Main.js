import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from "react-native";

import Header from "./components/Header";
import Home from "./components/Home";
import CustomModal from "./components/Reusable/CustomModal";
import { getThemeColors } from "./utils/Helper";

export default function Main() {
    const ThemeColors = getThemeColors();
    
    return (
        <View style={[{ backgroundColor: ThemeColors.backgroundColor }, styles.container]}>
            <Header />
            <Home />
            <StatusBar barStyle="light-content" backgroundColor={ThemeColors.statusBarColor} />
            <CustomModal />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

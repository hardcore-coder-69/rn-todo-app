import React, { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Home from "./components/Home";
import CustomModal from "./components/Reusable/CustomModal";
import { getThemeColors } from "./utils/Helper";
import { setAppTheme } from "./store/actions/common";
import Notification from "./components/Reusable/Notification";

export default function Main() {
    const { showNotification, message, type } = useSelector(state => state.common.notification);
    const dispatch = useDispatch();
    const ThemeColors = getThemeColors();

    useEffect(() => {
        dispatch(setAppTheme());
    }, [dispatch])

    return (
        <View style={[{ backgroundColor: ThemeColors.backgroundColor }, styles.container]}>
            <Header />
            <Home />
            <StatusBar style={ThemeColors.statusBarTheme} />
            <CustomModal />
            {showNotification && <Notification message={message} type={type}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

import React, { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Home from "./components/Home";
import CustomModal from "./components/Reusable/CustomModal";
import { getThemeColors } from "./utils/Helper";
import { setAppTheme, setLoading } from "./store/actions/common";
import Notification from "./components/Reusable/Notification";
import Tabs from "./components/Reusable/Tabs";
const TabOptions = [
    { key: 'tasks', text: 'Tasks' },
    { key: 'notes', text: 'Notes' },
    // { key: 'quotes', text: 'Quotes' }
];

export default function Main() {
    const isLoading = useSelector(state => state.common.isLoading);
    const notifications = useSelector(state => state.common.notifications);
    const dispatch = useDispatch();
    const ThemeColors = getThemeColors();

    useEffect(() => {
        dispatch(setLoading(true));
        dispatch(setAppTheme());
    }, [dispatch])

    if (isLoading) {
        return (
            <View style={styles.ActivityIndicator}>
                <ActivityIndicator size="62" color="grey" />
            </View>
        )
    }

    return (
        <View style={[{ backgroundColor: ThemeColors.backgroundColor }, styles.container]}>
            <StatusBar style={ThemeColors.statusBarTheme} />
            <Header />
            <Home />
            <CustomModal />
            {
                notifications.map((item, i) => (
                    <Notification message={item.message} type={item.type} id={item.id} key={item.id} index={i} />
                ))
            }
            <View style={styles.tabsContainer}>
                <Tabs options={TabOptions} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabsContainer: {
        position: 'absolute',
        bottom: 0
    },
    ActivityIndicator: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});

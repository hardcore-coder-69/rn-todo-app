import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import Tabs from "./Reusable/Tabs";
import { setSavedTab, switchTabs } from "../store/actions/common";

import Tasks from "./Tasks";
import Notes from "./Notes";

const TabOptions = [
    {
        key: 'tasks',
        text: 'Tasks'
    },
    {
        key: 'notes',
        text: 'Notes'
    }
]

export default Home = () => {
    const dispatch = useDispatch();
    let selectedTab = useSelector(state => state.common.selectedTab);

    useEffect(() => {
        dispatch(setSavedTab());
    }, [dispatch]);

    let selectedTabComponent;
    if (selectedTab == 'tasks') {
        selectedTabComponent = <Tasks />
    }
    else if (selectedTab == 'notes') {
        selectedTabComponent = <Notes />
    }

    const handleSwipe = (event) => {
        const { translationX } = event.nativeEvent;
        if (translationX < -100 && selectedTab === 'tasks') {
            dispatch(switchTabs('notes')); // Swipe right
        } else if (translationX > 100 && selectedTab === 'notes') {
            dispatch(switchTabs('tasks')); // Swipe left
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PanGestureHandler onGestureEvent={handleSwipe}>
                <ScrollView style={styles.container}>
                    <View style={styles.tabsContainer}>
                        <Tabs options={TabOptions} />
                    </View>
                    {selectedTabComponent}
                </ScrollView>
            </PanGestureHandler>
        </GestureHandlerRootView >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    tabsContainer: {
        paddingVertical: 10
    }
})
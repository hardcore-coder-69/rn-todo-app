import React, { useEffect } from "react";
import { StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { setSavedTab, switchTabs } from "../store/actions/common";
import Tasks from "./Tasks";
import Notes from "./Notes";

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                {/* <GestureHandlerRootView style={{ flex: 1 }}>
                <PanGestureHandler onGestureEvent={handleSwipe}> */}
                {selectedTabComponent}
                {/* </PanGestureHandler>
            </GestureHandlerRootView > */}
            </ScrollView>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
    },
})
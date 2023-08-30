import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Tabs from "./Reusable/Tabs";
import { setSavedTab } from "../store/actions/common";

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

    console.log(selectedTab, selectedTabComponent)
    return (
        <ScrollView style={styles.container}>
            <View style={styles.tabsContainer}>
                <Tabs options={TabOptions} />
            </View>
            {selectedTabComponent}
        </ScrollView>
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
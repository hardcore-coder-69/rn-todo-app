import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getThemeColors } from "../../utils/Helper";
import { switchTabs } from "../../store/actions/common";

export default Tabs = ({ options }) => {
    const dispatch = useDispatch();
    const selectedTab = useSelector(state => state.common.selectedTab);
    const ThemeColors = getThemeColors();

    function changeTab(key) {
        dispatch(switchTabs(key));
    }

    return (
        <View style={[{borderColor: ThemeColors.tabBackgroundColor}, styles.container]}>
            {options.map(tab => (
                <Pressable
                    key={tab.key} onPress={() => changeTab(tab.key)}
                    style={[{ backgroundColor: tab.key == selectedTab ? ThemeColors.tabBackgroundColor : null }, styles.pressable]}
                >
                    <Text style={[{ color: ThemeColors.textColor }, styles.tabLabel]}>{tab.text}</Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 6
    },
    pressable: {
        width: '50%',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    tabLabel: {
        fontSize: 18,
        textAlign: 'center'
    }
})
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
        <View style={styles.container}>
            {options.map(tab => (
                <Pressable key={tab.key} onPress={() => changeTab(tab.key)}
                    style={[
                        {
                            borderColor: ThemeColors.borderColor,
                            backgroundColor: tab.key == selectedTab ? ThemeColors.tabBackgroundColor : null
                        },
                        styles.pressable
                    ]}
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
    },
    pressable: {
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    tabLabel: {
    }
})
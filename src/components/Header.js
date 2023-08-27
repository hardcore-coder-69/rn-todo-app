import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../store/actions/common";
import { getThemeColors } from "../utils/Helper";

export default Header = () => {
    const isDark = useSelector(state => state.common.isDark);
    const dispatch = useDispatch();
    const ThemeColors = getThemeColors();

    return (
        <View style={styles.container}>
            <View>
                <Text style={[{ color: ThemeColors.textColor }, styles.heading]}>TO DO</Text>
                <View style={styles.copyright}>
                    <Image source={require('../../assets/icon.png')} style={styles.logoImage} />
                    <Text style={[{ color: ThemeColors.textColor }]}>hardcore coder</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => dispatch(toggleTheme())}>
                {
                    isDark ?
                        <MaterialIcons name="toggle-on" size={62} color={ThemeColors.textColor} /> :
                        <MaterialIcons name="toggle-off" size={62} color={ThemeColors.textColor} />
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 45,
        paddingBottom: 10,
        paddingTop: 35,
    },
    heading: {
        fontSize: 25
    },
    copyright: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7
    },
    logoImage: {
        height: 20,
        width: 20,
        marginRight: 5
    }
})
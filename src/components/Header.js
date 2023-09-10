import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from "../utils/Helper";
import HeaderModal from "./HeaderModal";
import { toggleTheme } from "../store/actions/common";

export default Header = () => {
    const isDark = useSelector(state => state.common.isDark);
    const selectedTab = useSelector(state => state.common.selectedTab);
    const [isVisible, setIsVisible] = useState(false);
    const ThemeColors = getThemeColors();
    const dispatch = useDispatch();

    function cancelHandler() {
        setIsVisible(false);
    }

    return (
        <View style={[{ borderColor: ThemeColors.borderColor }, styles.container]}>
            <View style={styles.titleLogo}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => setIsVisible(true)} >
                    <Image source={require('../../assets/hardcore-logo.png')} style={styles.logoImage} />
                </TouchableOpacity>
                <Text style={[{ color: ThemeColors.textColor }, styles.heading]}>{selectedTab.toUpperCase()}</Text>

            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.modalButtonToggle} onPress={() => dispatch(toggleTheme({ isDark: !isDark }))}>
                {
                    isDark ?
                        <MaterialCommunityIcons name="toggle-switch" size={42} color={ThemeColors.textColor} /> :
                        <MaterialCommunityIcons name="toggle-switch-off" size={42} color={ThemeColors.textColor} />
                }
            </TouchableOpacity>

            <HeaderModal
                isVisible={isVisible}
                cancelHandler={cancelHandler}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 12,
        paddingBottom: 5,
        paddingTop: 30,
        borderWidth: 1
    },
    titleLogo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    toggleButton: {
    },
    heading: {
        fontSize: 22,
    },
    copyright: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoImage: {
        height: 35,
        width: 35,
        marginRight: 5,
    },
    copyrightText: {
        fontSize: 12
    },
    externalIcons: {
        marginLeft: 5
    }
})
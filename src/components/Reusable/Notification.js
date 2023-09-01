import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { getThemeColors } from "../../utils/Helper";
import { hideNotification } from "../../store/actions/common";

export default Notification = ({ message, type }) => {
    const { showNotification } = useSelector(state => state.common.notification);
    const dispatch = useDispatch();
    const ThemeColors = getThemeColors();
    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (showNotification) {
            Animated.spring(slideAnim, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }
    }, [showNotification]);

    return (
        <Animated.View
            style={[
                { backgroundColor: ThemeColors[type] },
                styles.container,
                {
                    transform: [{
                        translateY: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [500, 0],
                        })
                    }],
                },]}>
            <Text style={[{}, styles.message]}>{message}</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={() => dispatch(hideNotification())} style={[]}>
                <MaterialCommunityIcons name="close" size={28} color="#fff" />
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 5,
        position: 'absolute',
        bottom: '3%',
    },
    message: {
        fontSize: 20,
        width: '90%',
        color: "#fff"
    }
})
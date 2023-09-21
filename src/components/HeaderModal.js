import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getThemeColors } from '../utils/Helper';
import { A } from '@expo/html-elements';

export default HeaderModal = ({ isVisible, cancelHandler }) => {
    const ThemeColors = getThemeColors();

    return (
        <Modal
            isVisible={isVisible}
            backdropColor="#000"
            backdropOpacity={.5}
            animationIn="slideInDown"
            animationInTiming={300}
            onBackdropPress={cancelHandler}
        >
            <View style={[{ backgroundColor: ThemeColors.taskBackgroundColor }, styles.modalContainer]}>
                <View style={styles.actionsHeader}>
                    <Text style={[{ color: ThemeColors.textColor }, styles.modalTitle]}>Hardcore Coder</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => cancelHandler()} style={[]}>
                        <MaterialCommunityIcons name="close" size={28} color={ThemeColors.textColor} />
                    </TouchableOpacity>
                </View>

                <View style={styles.action}>

                    <A href="https://youtube.com/@hardcorecoder" style={styles.modalButton}>
                        <MaterialCommunityIcons name="youtube" size={30} color={ThemeColors.textColor} />
                        <View>
                            <Text style={[{ color: ThemeColors.textColor }, styles.modalButtonText]}>YouTube</Text>
                        </View>
                    </A>

                    <A href="https://instagram.com/hardcore.coder" style={styles.modalButton}>
                        <MaterialCommunityIcons name="instagram" size={30} color={ThemeColors.textColor} />
                        <View>
                            <Text style={[{ color: ThemeColors.textColor }, styles.modalButtonText]}>Instagram</Text>
                        </View>
                    </A>

                    {/* <A href="https://twitter.com/" style={styles.modalButton}>
                        <MaterialCommunityIcons name="twitter" size={30} color={ThemeColors.textColor} />
                        <View>
                            <Text style={[{ color: ThemeColors.textColor }, styles.modalButtonText]}>Twitter</Text>
                        </View>
                    </A> */}

                    <A href="https://www.linkedin.com/in/hardcore-coder-105ab7291/" style={styles.modalButton}>
                        <MaterialCommunityIcons name="linkedin" size={30} color={ThemeColors.textColor} />
                        <View>
                            <Text style={[{ color: ThemeColors.textColor }, styles.modalButtonText]}>LinkedIn</Text>
                        </View>
                    </A>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    modalContainer: {
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        marginBottom: 20,
    },
    modalButtonToggle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        borderRadius: 5,
    },
    modalButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
    },
    modalButtonTextToggle: {
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 18
    },
    modalButtonText: {
        fontWeight: 'bold',
        paddingLeft: 22,
        fontSize: 18,
    },
    modalButtonIcon: {
        marginLeft: 5,
        fontSize: 28
    },
    action: {
        display: 'flex',
        flexDirection: 'column',
    },
    actionsHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20
    }
});

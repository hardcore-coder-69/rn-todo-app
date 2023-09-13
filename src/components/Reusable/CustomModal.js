import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../store/actions/common';
import { getThemeColors } from '../../utils/Helper';

const screenHeight = Dimensions.get('window').height;
export default CustomModal = () => {
    let modal = useSelector(state => state.common.modal);
    const dispatch = useDispatch();
    const ThemeColors = getThemeColors();

    function confirm(data = null) {
        console.log('Confirmation method not provided. Data:', data);
        let modal = {
            isVisible: false
        }
        dispatch(toggleModal(modal));
    }

    function cancel() {
        let modal = {
            isVisible: false
        }
        dispatch(toggleModal(modal));
    }

    const confirmHandlerFunction = modal.confirmHandler ? modal.confirmHandler : confirm;

    return (
        <Modal
            isVisible={modal.isVisible}
            backdropColor="#000"
            backdropOpacity={.5}
            animationIn="slideInDown"
            animationInTiming={300}
            onBackdropPress={cancel}
        >
            <View style={[{ backgroundColor: ThemeColors.taskBackgroundColor }, styles.modalContainer]}>
                <View style={styles.actionsHeader}>
                    {<Text style={[{ color: ThemeColors.textColor }, styles.modalTitle]}>{modal.title}</Text>}
                    <TouchableOpacity activeOpacity={0.5} onPress={() => cancel()} style={[]}>
                        <MaterialCommunityIcons name="close" size={28} color={ThemeColors.textColor} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ maxHeight: screenHeight * 0.75 }}>
                    <Text style={[{ color: ThemeColors.textColor }, styles.modalText]}>{modal.message}</Text>
                </ScrollView>

                <View style={styles.action}>
                    {
                        !modal.noSaveHandler &&
                        <TouchableOpacity activeOpacity={0.5} onPress={() => cancel()} style={[{}, styles.modalButton]}>
                            <Text style={[{ color: ThemeColors.textColor }, styles.modalButtonText]}>{modal.cancelLabel}</Text>
                        </TouchableOpacity>}
                    {
                        !modal.noSaveHandler &&
                        <TouchableOpacity activeOpacity={0.5} onPress={() => confirmHandlerFunction(modal.confirmParameters)} style={[{}, styles.modalButton]}>
                            <Text style={[{ color: ThemeColors.danger }, styles.modalButtonText]}>{modal.confirmLabel}</Text>
                        </TouchableOpacity>
                    }
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
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        marginBottom: 20,
        fontSize: 18
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        // borderWidth: 1,
        marginLeft: 10
    },
    modalButtonText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    actionsHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingBottom: 20
    }
});

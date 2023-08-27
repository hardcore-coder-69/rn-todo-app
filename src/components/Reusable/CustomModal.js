import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../store/actions/common';
import { getThemeColors } from '../../utils/Helper';

export default CustomModal = () => {
    let modal = useSelector(state => state.common.modal);
    const dispatch = useDispatch();
    const ThemeColors = getThemeColors();

    function confirm(data = null) {
        console.log('Confirmation method not provided. Data:', data);
    }

    function cancel() {
        dispatch(toggleModal());
    }

    const confirmHandlerFunction = modal.confirmHandler ? modal.confirmHandler : confirm;

    return (
        <Modal
            isVisible={modal.isVisible}
            backdropColor={ThemeColors.textColor}
            backdropOpacity={0.4}
            animationIn="slideInDown"
            animationInTiming={300}
        >
            <View style={[{ backgroundColor: ThemeColors.taskBackgroundColor }, styles.modalContainer]}>
                <Text style={[{ color: ThemeColors.textColor }, styles.modalTitle]}>{modal.title}</Text>
                <Text style={[{ color: ThemeColors.textColor }, styles.modalText]}>{modal.message}</Text>

                <View style={styles.action}>
                    <TouchableOpacity onPress={() => cancel()} style={[{ backgroundColor: ThemeColors.greyColor }, styles.modalButton]}>
                        <Text style={styles.modalButtonText}>{modal.cancelLabel}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => confirmHandlerFunction(modal.confirmParameters)} style={[{ backgroundColor: ThemeColors.button }, styles.modalButton]}>
                        <Text style={styles.modalButtonText}>{modal.confirmLabel}</Text>
                    </TouchableOpacity>
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
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        marginBottom: 20,
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
});

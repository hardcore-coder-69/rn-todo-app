import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { getThemeColors } from '../../utils/Helper';
import { showNotification } from '../../store/actions/common';

export default ActionsModal = (props) => {
    const dispatch = useDispatch();
    const selectedTab = useSelector(state => state.common.selectedTab);
    const ThemeColors = getThemeColors();

    const isVisible = props.isVisible;
    const id = props.id;
    const text = props.text;
    const completed = props.completed;
    const editHandler = props.editHandler;
    const markCompleteHandler = props.markCompleteHandler;
    const deleteHandler = props.deleteHandler;
    const cancelHandler = props.cancelHandler;

    async function copyToClipboard(text) {
        try {
            await Clipboard.setStringAsync(text);;
            dispatch(showNotification({message: 'Text copied to clipboard', type:'successType'}));
        } catch (error) {
            console.error('Error copying text to clipboard: ', error.message);
        }
        cancelHandler();
    }

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
                    <Text style={[{ color: ThemeColors.textColor }, styles.modalTitle]}>Actions</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => cancelHandler()} style={[]}>
                        <MaterialCommunityIcons name="close" size={28} color={ThemeColors.textColor} />
                    </TouchableOpacity>
                </View>

                <View style={styles.action}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => copyToClipboard(text)} style={[styles.modalButton]}>
                        <MaterialIcons name="content-copy" size={28} style={[{ color: ThemeColors.textColor }, styles.modalButtonIcon]} />
                        <Text style={[{ color: ThemeColors.textColor }, styles.modalButtonText]}>Copy text</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => editHandler()} style={[styles.modalButton]}>
                        <MaterialIcons name="edit" size={28} style={[{ color: ThemeColors.textColor }, styles.modalButtonIcon]} />
                        <Text style={[{ color: ThemeColors.textColor }, styles.modalButtonText]}>Edit {selectedTab.slice(0, -1)}</Text>
                    </TouchableOpacity>

                    {
                        selectedTab == 'tasks' ?
                            <TouchableOpacity activeOpacity={0.5} onPress={() => markCompleteHandler(id)} style={[styles.modalButton]}>
                                <MaterialIcons name="check" size={28} style={[{ color: ThemeColors.textColor }, styles.modalButtonIcon]} />
                                <Text style={[{ color: ThemeColors.textColor }, styles.modalButtonText]}>Mark as {completed ? 'pending' : 'complete'}</Text>
                            </TouchableOpacity>
                            : null
                    }

                    <TouchableOpacity activeOpacity={0.5} onPress={() => deleteHandler(id)} style={[styles.modalButton]}>
                        <MaterialIcons name="delete" size={28} style={[{ color: ThemeColors.textColor }, styles.modalButtonIcon]} />
                        <Text style={[{ color: ThemeColors.textColor }, styles.modalButtonText]}>Delete {selectedTab.slice(0, -1)}</Text>
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
    modalButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    modalButtonText: {
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 18
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

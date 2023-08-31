import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { getThemeColors } from '../../utils/Helper';

export default ActionsModal = (props) => {
    const selectedTab = useSelector(state => state.common.selectedTab);
    const ThemeColors = getThemeColors();

    const isVisible = props.isVisible;
    const id = props.id;
    const editHandler = props.editHandler;
    const markCompleteHandler = props.markCompleteHandler;
    const deleteHandler = props.deleteHandler;
    const cancelHandler = props.cancelHandler;

    return (
        <Modal
            isVisible={isVisible}
            backdropColor="#000"
            backdropOpacity={.5}
            animationIn="slideInDown"
            animationInTiming={300}
        >
            <View style={[{ backgroundColor: ThemeColors.taskBackgroundColor }, styles.modalContainer]}>
                <View style={styles.actionsHeader}>
                    <Text style={[{ color: ThemeColors.textColor }, styles.modalTitle]}>Actions</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => cancelHandler()} style={[]}>
                        <MaterialCommunityIcons name="close" size={28} color={ThemeColors.textColor} />
                    </TouchableOpacity>
                </View>

                <View style={styles.action}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => editHandler(id)} style={[{ backgroundColor: '#8B8000' }, styles.modalButton]}>
                        <MaterialIcons name="edit" size={24} style={styles.modalButtonText} />
                        <Text style={styles.modalButtonText}>Edit {selectedTab.slice(0, -1)}</Text>
                    </TouchableOpacity>

                    {
                        selectedTab == 'tasks' ?
                            <TouchableOpacity activeOpacity={0.5} onPress={() => markCompleteHandler(id)} style={[{ backgroundColor: 'green' }, styles.modalButton]}>
                                <MaterialIcons name="check" size={24} style={styles.modalButtonText} />
                                <Text style={styles.modalButtonText}>Mark as completed</Text>
                            </TouchableOpacity>
                            : null
                    }

                    <TouchableOpacity activeOpacity={0.5} onPress={() => deleteHandler(id)} style={[{ backgroundColor: ThemeColors.danger }, styles.modalButton]}>
                        <MaterialIcons name="delete" size={24} style={styles.modalButtonText} />
                        <Text style={styles.modalButtonText}>Delete {selectedTab.slice(0, -1)}</Text>
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
        fontSize: 18,
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
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5
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

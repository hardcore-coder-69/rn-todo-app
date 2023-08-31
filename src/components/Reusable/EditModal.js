import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getThemeColors } from '../../utils/Helper';

const screenHeight = Dimensions.get('window').height;
export default EditModal = (props) => {
    const isVisible = props.isVisible;
    const id = props.id;
    const text = props.text;
    const cancelHandler = props.cancelHandler;
    const saveHandler = props.saveHandler;
    
    const selectedTab = useSelector(state => state.common.selectedTab);
    const ThemeColors = getThemeColors();
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        setInputText(text);
    }, [text]);

    let placeholderText = 'Start typing...';
    if(selectedTab == 'tasks') {
        placeholderText = 'Add new task...';
    }
    else if(selectedTab == 'notes') {
        placeholderText = 'Add new note...';
    }

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
                    <Text style={[{ color: ThemeColors.textColor }, styles.modalTitle]}>Edit {selectedTab.slice(0, -1)}</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => cancelHandler()} style={[]}>
                        <MaterialCommunityIcons name="close" size={28} color={ThemeColors.textColor} />
                    </TouchableOpacity>
                </View>

                <View>
                    <TextInput
                        value={inputText}
                        style={[{ borderColor: ThemeColors.borderColor, color: ThemeColors.textColor, backgroundColor: ThemeColors.inputBackgroundColor }, styles.input]}
                        placeholder={placeholderText}
                        multiline
                        numberOfLines={4}
                        placeholderTextColor={ThemeColors.greyColor}
                        onChangeText={(value) => setInputText(value)}
                    />
                </View>

                <View style={styles.action}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => cancelHandler()} style={[{ }, styles.modalButton]}>
                        <Text style={[{color: ThemeColors.textColor}, styles.modalButtonText]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => saveHandler(id, inputText)} style={[{ }, styles.modalButton]}>
                        <Text style={[{ color: ThemeColors.enabledButton }, styles.modalButtonText]}>Save</Text>
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
    input: {
        fontSize: 20,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10,
        textAlignVertical: 'top',
        maxHeight: screenHeight * .35
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
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
        // borderWidth: 1,
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
        paddingBottom: 20
    }
});

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { getThemeColors, formateDate } from "../utils/Helper";
import { saveNotes, fetchNotes } from "../store/actions/notes";
import { toggleModal, showNotification } from "../store/actions/common";
import ActionsModal from "./Reusable/ActionsModal";
import EditModal from "./Reusable/EditModal";

const screenHeight = Dimensions.get('window').height;
export default Notes = () => {
    let notes = useSelector(state => state.notes.notes);
    const dispatch = useDispatch();
    const ThemeColors = getThemeColors();

    let [note, setNote] = useState('');
    let [itemId, setItemId] = useState(null);
    let [isVisible, setIsVisible] = useState(false);
    let [showEditModal, setShowEditModal] = useState(false);
    let [itemText, setItemText] = useState(note);

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    function saveNoteHandler() {
        if (note === '') return;

        let time = new Date();

        let obj = {
            id: Math.floor(Math.random() * 100000),
            text: note,
            createdAt: time,
            updatedAt: time
        }
        notes.unshift(obj);
        setNote('');
        dispatch(saveNotes(notes));
        dispatch(showNotification({
            message: 'New note added',
            type: 'successType'
        }))
    }

    function deleteNote(id) {
        const modalData = {
            title: 'Confirmation',
            message: 'This action will permanently delete your note!',
            confirmLabel: 'Delete',
            confirmHandler: deleteNoteConfirmed,
            confirmParameters: {
                noteId: id
            }
        }

        dispatch(toggleModal(modalData));
        setIsVisible(false);
    }

    function deleteNoteConfirmed(confirmParameters) {
        let id = confirmParameters.noteId;
        notes = notes.filter(item => item.id != id);
        dispatch(saveNotes(notes));
        dispatch(toggleModal());
        setItemId(false);
        dispatch(showNotification({
            message: 'Note deleted successfully',
            type: 'dangerType'
        }))
    }

    function editNote() {
        setIsVisible(false);
        setShowEditModal(true);
    }

    function showActions(id, text) {
        setItemId(id);
        setItemText(text);
        setIsVisible(true);
    }

    function cancelHandler() {
        setItemId(null);
        setItemText('');
        setIsVisible(false);
        setShowEditModal(false);
    }

    function saveEditedNote(id, newText) {
        let time = new Date();

        notes = notes.map(item => {
            if (item.id === id) {
                item.text = newText;
                item.updatedAt = time;
                return item;
            }
            return item;
        });
        dispatch(saveNotes(notes));
        setShowEditModal(false);

        dispatch(showNotification({
            message: 'Note edited successfully',
            type: 'successType'
        }))
    }

    function showFullNote(note) {
        const modalData = {
            title: 'Note',
            message: note,
            cancelLabel: 'Close',
            noSaveHandler: true
        }
        dispatch(toggleModal(modalData));
    }

    return (
        <View style={styles.container}>
            <View style={[{ backgroundColor: ThemeColors.taskBackgroundColor }, styles.inputContainer]}>
                <TextInput
                    value={note}
                    style={[{ borderColor: ThemeColors.borderColor, color: ThemeColors.textColor, backgroundColor: ThemeColors.inputBackgroundColor }, styles.input]}
                    placeholder="Add new note..."
                    multiline
                    numberOfLines={4}
                    placeholderTextColor={ThemeColors.greyColor}
                    onChangeText={(value) => setNote(value)}
                />
                <TouchableOpacity
                    style={[{ borderColor: note ? ThemeColors.enabledButton : ThemeColors.disabledButon }, styles.button]}
                    onPress={saveNoteHandler}
                    activeOpacity={note ? 0.5 : 1}
                >
                    <MaterialIcons name="add" size={62} color={note ? ThemeColors.enabledButton : ThemeColors.disabledButon} />
                </TouchableOpacity>
            </View>
            {
                notes.length === 0 ? <Text style={[{ borderColor: ThemeColors.backgroundColor, color: ThemeColors.greyColor, backgroundColor: ThemeColors.inputBackgroundColor }, styles.noNotes]}>No saved notes</Text> : ''
            }
            {
                notes.map((note) => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        key={note.id}
                        style={[{ backgroundColor: ThemeColors.taskBackgroundColor }, styles.taskStyle]}
                        onPress={() => showFullNote(note.text)}
                    >
                        <View style={[styles.taskTextContainer]}>
                            <Text style={[{ color: ThemeColors.textColor }, styles.taskText]} numberOfLines={6} ellipsizeMode="tail">{note.text}</Text>
                            <Text style={[{ color: ThemeColors.createdAtColor }, styles.createdAt]}>{formateDate(note.updatedAt)}</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5} style={styles.deleteButton} onPress={() => showActions(note.id, note.text)}>
                            <MaterialCommunityIcons name="dots-vertical" size={28} color={ThemeColors.textColor} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))
            }
            <ActionsModal
                isVisible={isVisible}
                id={itemId}
                text={itemText}
                completed="false"
                markCompleteHandler="null"
                editHandler={editNote}
                deleteHandler={deleteNote}
                cancelHandler={cancelHandler}
            />
            <EditModal
                isVisible={showEditModal}
                id={itemId}
                text={itemText}
                cancelHandler={cancelHandler}
                saveHandler={saveEditedNote}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 65
    },
    inputContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    input: {
        fontSize: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        paddingBottom: 10,
        marginBottom: 15,
        textAlignVertical: 'top',
        maxHeight: screenHeight * .6
    },
    button: {
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 5
    },
    noNotes: {
        textAlign: 'center',
        fontSize: 25,
        padding: 30,
        borderRadius: 5,
        marginTop: 10,
        borderWidth: 1
    },
    deleteButton: {
        paddingVertical: 5,
        paddingLeft: 10
    },
    taskStyle: {
        paddingVertical: 5,
        marginTop: 10,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    taskTextContainer: {
        width: '90%',
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    taskText: {
        fontSize: 20,
    },
    createdAt: {
        fontSize: 10,
        fontStyle: "italic",
        paddingTop: 5
    },
})
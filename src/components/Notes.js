import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { getThemeColors } from "../utils/Helper";
import { saveNotes, fetchNotes } from "../store/actions/notes";
import { toggleModal } from "../store/actions/common";

export default Notes = () => {
    let [note, setNote] = useState('');
    let notes = useSelector(state => state.notes.notes);
    const dispatch = useDispatch();
    const ThemeColors = getThemeColors();

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    function saveNoteHandler() {
        if (note === '') return;

        let time = new Date();
        time = time.toLocaleTimeString() + ' ' + time.toLocaleDateString();

        let obj = {
            id: Math.floor(Math.random() * 100000),
            text: note,
            createdAt: time
        }
        notes.unshift(obj);
        setNote('');
        dispatch(saveNotes(notes));
    }

    function deleteNote(id) {
        const modalData = {
            title: 'Confirmation!',
            message: 'This action will permanently delete your note!',
            confirmLabel: 'Confirm',
            confirmHandler: deleteNoteConfirmed,
            confirmParameters: {
                noteId: id
            }
        }

        dispatch(toggleModal(modalData));
    }

    function deleteNoteConfirmed(confirmParameters) {
        let id = confirmParameters.noteId;
        notes = notes.filter(item => item.id != id);
        dispatch(saveNotes(notes));
        dispatch(toggleModal());
    }

    return (
        <ScrollView>
            <TextInput
                value={note}
                style={[{ borderColor: ThemeColors.backgroundColor, color: ThemeColors.textColor, backgroundColor: ThemeColors.inputBackgroundColor }, styles.input]}
                placeholder="Start typing..."
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
            {
                notes.length === 0 ? <Text style={[{ borderColor: ThemeColors.backgroundColor, color: ThemeColors.greyColor, backgroundColor: ThemeColors.inputBackgroundColor }, styles.noNotes]}>No saved notes</Text> : ''
            }
            {
                notes.map((note) => (
                    <TouchableOpacity activeOpacity={0.5} key={note.id} style={[{ backgroundColor: ThemeColors.taskBackgroundColor }, styles.taskStyle]}>
                        <View style={[styles.taskTextContainer]}>
                            <Text style={[{ color: ThemeColors.textColor }, styles.taskText]}>{note.text}</Text>
                            <Text style={[{ color: ThemeColors.createdAtColor }, styles.createdAt]}>{note.createdAt}</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5} style={styles.deleteButton} onPress={() => deleteNote(note.id)}>
                            <MaterialIcons name="delete" size={48} color={ThemeColors.danger} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10
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
        padding: 5
    },
    taskStyle: {
        paddingVertical: 5,
        marginTop: 10,
        borderRadius: 5,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'start',
        flexDirection: 'row',
    },
    taskTextContainer: {
        width: '85.5%',
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
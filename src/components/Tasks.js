import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { getThemeColors } from "../utils/Helper";
import { fetchTodos, saveTodos } from "../store/actions/todos";
import { showNotification, toggleModal } from "../store/actions/common";
import ActionsModal from "./Reusable/ActionsModal";
import EditModal from "./Reusable/EditModal";

const screenHeight = Dimensions.get('window').height;
export default Tasks = () => {
    const dispatch = useDispatch();
    let taskList = useSelector(state => state.todos.todos);
    const ThemeColors = getThemeColors();

    let [task, setTask] = useState('');
    let [itemId, setItemId] = useState(null);
    let [completed, setCompleted] = useState(false);
    let [itemText, setItemText] = useState(task);
    let [isVisible, setIsVisible] = useState(false);
    let [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    function addTaskHandler() {
        if (task === '') return;
        if (task.length > 200) {
            const modalData = {
                title: 'Alert',
                message: 'Tasks are limited to 200 characters. Try using the notes instead.',
                cancelLabel: 'Close',
                noSaveHandler: true
            }
            dispatch(toggleModal(modalData));
            return
        }

        let time = new Date();
        time = time.toLocaleTimeString() + ' ' + time.toLocaleDateString();

        let obj = {
            id: Math.floor(Math.random() * 100000),
            text: task,
            completed: false,
            createdAt: time,
            updatedAt: time
        }
        taskList.unshift(obj);
        setTask('');
        dispatch(saveTodos(taskList));
    }


    function deleteTask(id) {
        const modalData = {
            title: 'Confirmation',
            message: 'This action will permanently delete the task!',
            confirmLabel: 'Delete',
            confirmHandler: deleteTaskConfirmed,
            confirmParameters: {
                taskId: id
            }
        }

        dispatch(toggleModal(modalData));
        setIsVisible(false);
    }

    function deleteTaskConfirmed(confirmParameters) {
        let id = confirmParameters.taskId;
        taskList = taskList.filter(item => item.id != id);
        setItemId(null);
        dispatch(saveTodos(taskList));
        dispatch(toggleModal());

        dispatch(showNotification({
            message: 'Task deleted successfully.',
            type: 'dangerType'
        }))
    }

    function toggleCompleted(id) {
        let isCompleted;
        taskList = taskList.map(task => {
            if (task.id === id) {
                isCompleted = !task.completed;
                task.completed = isCompleted;
            }
            return task;
        });
        dispatch(saveTodos(taskList));
        dispatch(showNotification({
            message: `Task marked as ${isCompleted ? 'completed' : 'pending'}.`,
            type: isCompleted ? 'successType' : 'warningType'
        }));
        setItemId(null);
        setIsVisible(false);
    }

    function editTask() {
        setIsVisible(false);
        setShowEditModal(true);
    }

    function showActions(id, text, completed) {
        setItemId(id);
        setCompleted(completed)
        setItemText(text);
        setIsVisible(true);
    }

    function cancelHandler() {
        setItemId(null);
        setItemText('');
        setIsVisible(false);
        setShowEditModal(false);
    }

    function saveEditedTask(id, newText) {
        let time = new Date();
        time = time.toLocaleTimeString() + ' ' + time.toLocaleDateString();

        taskList = taskList.map(item => {
            if (item.id === id) {
                item.text = newText;
                item.completed = false;
                item.updatedAt = time;
                return item;
            }
            return item;
        });
        dispatch(saveTodos(taskList));
        setShowEditModal(false);
        dispatch(showNotification({
            message: 'Task edited successfully.',
            type: 'successType'
        }))
    }

    return (
        <ScrollView style={styles.container}>
            <TextInput
                value={task}
                style={[{ borderColor: ThemeColors.backgroundColor, color: ThemeColors.textColor, backgroundColor: ThemeColors.inputBackgroundColor }, styles.input]}
                multiline
                placeholder="Add new task..."
                placeholderTextColor={ThemeColors.greyColor}
                onChangeText={(value) => setTask(value)}
            />
            <TouchableOpacity
                activeOpacity={task ? 0.5 : 1}
                style={[{ borderColor: task ? ThemeColors.enabledButton : ThemeColors.disabledButon }, styles.button]}
                onPress={addTaskHandler}
            >
                <MaterialIcons name="add" size={62} color={task ? ThemeColors.enabledButton : ThemeColors.disabledButon} />
            </TouchableOpacity>
            {
                taskList.length === 0 ? <Text style={[{ borderColor: ThemeColors.backgroundColor, color: ThemeColors.greyColor, backgroundColor: ThemeColors.inputBackgroundColor }, styles.noTasks]}>No pending tasks</Text> : ''
            }
            {
                taskList.map((task) => (
                    <TouchableOpacity activeOpacity={0.5} key={task.id} style={[{ backgroundColor: ThemeColors.taskBackgroundColor }, styles.taskStyle]} onPress={() => toggleCompleted(task.id)}>
                        <View style={[styles.taskTextContainer, task.completed ? styles.taskContainerCompleted : null]}>
                            <Text style={[{ color: ThemeColors.textColor }, styles.taskText, task.completed ? styles.taskTextCompleted : null]}>{task.text}</Text>
                            <Text style={[{ color: ThemeColors.createdAtColor }, styles.createdAt]}>{task.updatedAt}</Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.5} style={styles.deleteButton} onPress={() => showActions(task.id, task.text, task.completed)}>
                            <MaterialCommunityIcons name="dots-vertical" size={28} color={ThemeColors.textColor} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))
            }
            <ActionsModal
                isVisible={isVisible}
                id={itemId}
                completed={completed}
                editHandler={editTask}
                markCompleteHandler={toggleCompleted}
                deleteHandler={deleteTask}
                cancelHandler={cancelHandler}
            />
            <EditModal
                isVisible={showEditModal}
                id={itemId}
                text={itemText}
                cancelHandler={cancelHandler}
                saveHandler={saveEditedTask}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 65
    },
    input: {
        fontSize: 20,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10,
        textAlignVertical: 'top',
        maxHeight: screenHeight / 7
    },
    button: {
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 20,
        color: '#fff'
    },
    deleteButton: {
        padding: 5,
    },
    taskStyle: {
        paddingVertical: 5,
        marginTop: 10,
        borderRadius: 5,
        display: 'flex',
        // alignItems: "center",
        justifyContent: 'start',
        flexDirection: 'row',
    },
    taskTextContainer: {
        width: '90%',
        paddingLeft: 10,
        paddingVertical: 10,
    },
    taskText: {
        fontSize: 20,
    },
    taskTextCompleted: {
        textDecorationLine: 'line-through'
    },
    taskContainerCompleted: {
        opacity: 0.3,
    },
    createdAt: {
        fontSize: 10,
        fontStyle: "italic",
        paddingTop: 5
    },
    noTasks: {
        textAlign: 'center',
        fontSize: 25,
        padding: 30,
        borderRadius: 5,
        marginTop: 10,
        borderWidth: 1
    }
})
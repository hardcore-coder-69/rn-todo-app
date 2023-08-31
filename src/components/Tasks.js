import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { getThemeColors } from "../utils/Helper";
import { fetchTodos, saveTodos } from "../store/actions/todos";
import { toggleModal } from "../store/actions/common";
import ActionsModal from "./Reusable/ActionsModal";

export default Tasks = () => {
    const dispatch = useDispatch();
    let taskList = useSelector(state => state.todos.todos);
    const ThemeColors = getThemeColors();
    let [task, setTask] = useState('');

    let [itemId, setItemId] = useState(null);
    let [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    function addTaskHandler() {
        if (task === '') return;

        let time = new Date();
        time = time.toLocaleTimeString() + ' ' + time.toLocaleDateString();

        let obj = {
            id: Math.floor(Math.random() * 100000),
            text: task,
            completed: false,
            createdAt: time
        }
        taskList.unshift(obj);
        setTask('');
        dispatch(saveTodos(taskList));
    }


    function deleteTask(id) {
        const modalData = {
            title: 'Confirmation!',
            message: 'This action will permanently delete the task!',
            confirmLabel: 'Confirm',
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
        dispatch(saveTodos(taskList));
        dispatch(toggleModal());
        setItemId(null);
    }

    function toggleCompleted(id) {
        taskList = taskList.map(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
            return task;
        });
        dispatch(saveTodos(taskList));
        setItemId(null);
        setIsVisible(false);
    }

    function editTask(id) {
        console.log(id);
    }

    function showActions(id) {
        setItemId(id);
        setIsVisible(true);
    }

    function cancelHandler() {
        setItemId(null);
        setIsVisible(false);
    }

    return (
        <ScrollView>
            <TextInput
                value={task}
                style={[{ borderColor: ThemeColors.backgroundColor, color: ThemeColors.textColor, backgroundColor: ThemeColors.inputBackgroundColor }, styles.input]}
                placeholder="Enter new task..."
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
                            <Text style={[{ color: ThemeColors.createdAtColor }, styles.createdAt]}>{task.createdAt}</Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.5} style={styles.deleteButton} onPress={() => showActions(task.id)}>
                            <MaterialCommunityIcons name="dots-vertical" size={28} color={ThemeColors.textColor} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))
            }
            <ActionsModal
                isVisible={isVisible}
                id={itemId}
                editHandler={editTask}
                markCompleteHandler={toggleCompleted}
                deleteHandler={deleteTask}
                cancelHandler={cancelHandler}
            />
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
        alignItems: "center",
        justifyContent: 'start',
        flexDirection: 'row',
    },
    taskTextContainer: {
        width: '92%',
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
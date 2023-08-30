import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { getThemeColors } from "../utils/Helper";
import { fetchTodos, saveTodos } from "../store/actions/todos";
import { toggleModal } from "../store/actions/common";

export default Tasks = () => {
    const dispatch = useDispatch();
    let taskList = useSelector(state => state.todos.todos);
    let [task, setTask] = useState('');
    const ThemeColors = getThemeColors();

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
    }

    function deleteTaskConfirmed(confirmParameters) {
        let id = confirmParameters.taskId;
        taskList = taskList.filter(item => item.id != id);
        dispatch(saveTodos(taskList));
        dispatch(toggleModal());
    }

    function toggleCompleted(id) {
        taskList = taskList.map(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
            return task;
        });
        dispatch(saveTodos(taskList));
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
                    <TouchableOpacity activeOpacity={0.5}  key={task.id} style={[{ backgroundColor: ThemeColors.taskBackgroundColor }, styles.taskStyle]} onPress={() => toggleCompleted(task.id)}>
                        <View style={[styles.taskTextContainer, task.completed ? styles.taskContainerCompleted : null]}>
                            <Text style={[{ color: ThemeColors.textColor }, styles.taskText, task.completed ? styles.taskTextCompleted : null]}>{task.text}</Text>
                            <Text style={[{ color: ThemeColors.createdAtColor }, styles.createdAt]}>{task.createdAt}</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5}  style={styles.deleteButton} onPress={() => deleteTask(task.id)}>
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
    buttonText: {
        fontSize: 20,
        color: '#fff'
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
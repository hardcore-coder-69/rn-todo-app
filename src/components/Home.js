import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { getThemeColors } from "../utils/Helper";
import { toggleModal } from "../store/actions/common";

export default Home = () => {
    const dispatch = useDispatch();
    let [task, setTask] = useState('');
    let [taskList, setTaskList] = useState([]);
    
    const ThemeColors = getThemeColors();

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
        setTaskList(taskList);
        setTask('');
    }


    function deleteTask(id) {
        const modalData = {
            title: 'Confirmation!',
            message: 'Are you sure you want to delete this task?',
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
        setTaskList(taskList);
        dispatch(toggleModal());
    }

    function toggleCompleted(id) {
        taskList = taskList.map(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
            return task;
        });
        setTaskList(taskList);
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={task}
                style={[{ borderColor: ThemeColors.greyColor, color: ThemeColors.textColor }, styles.input]}
                placeholder="Enter new task"
                placeholderTextColor={ThemeColors.greyColor}
                onChangeText={(value) => setTask(value)}
            />
            <TouchableOpacity style={[{borderColor: ThemeColors.button}, styles.button]} onPress={addTaskHandler}>
                <MaterialIcons name="add" size={62} color={ThemeColors.button} />
            </TouchableOpacity>
            {
                taskList.length === 0 ? <Text style={[{ color: ThemeColors.greyColor, borderColor: ThemeColors.greyColor }, styles.noTasks]}>No tasks</Text> : ''
            }
            <ScrollView>
                {
                    taskList.map((task) => (
                        <TouchableOpacity key={task.id} style={[{ backgroundColor: ThemeColors.taskBackgroundColor }, styles.taskStyle]} onPress={() => toggleCompleted(task.id)}>
                            <View style={[styles.taskTextContainer, task.completed ? styles.taskContainerCompleted : null]}>
                                <Text style={[{ color: ThemeColors.textColor }, styles.taskText, task.completed ? styles.taskTextCompleted : null]}>{task.text}</Text>
                                <Text style={[{ color: ThemeColors.createdAtColor }, styles.createdAt]}>{task.createdAt}</Text>
                            </View>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(task.id)}>
                                <MaterialIcons name="delete" size={48} color={ThemeColors.danger} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    input: {
        fontSize: 20,
        borderWidth: 1,
        padding: 10,
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
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Pressable, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { getThemeColors, formateDate, formateDateOnly, getNumberOfDays } from "../utils/Helper";
import { fetchTodos, saveTodos } from "../store/actions/todos";
import { showNotification, toggleModal } from "../store/actions/common";
import ActionsModal from "./Reusable/ActionsModal";
import EditModal from "./Reusable/EditModal";
import DateComponent from "./Reusable/DateComponent";

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
    let [datePicker, setDatePicker] = useState(false);
    let [scheduledAt, setScheduledAt] = useState();
    let [currentShow, setCurrentShow] = useState(new Date());
    let [calendarViewMode, setCalendarViewMode] = useState(false);

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

        let obj = {
            id: Math.floor(Math.random() * 100000),
            text: task,
            completed: false,
            createdAt: time,
            updatedAt: time,
            scheduledAt: scheduledAt ? scheduledAt : null
        }
        taskList.unshift(obj);
        setTask('');
        setScheduledAt('');
        dispatch(saveTodos(taskList));
        dispatch(showNotification({
            message: 'New task added',
            type: 'successType'
        }))
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
            message: 'Task deleted successfully',
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
            message: `Task marked as ${isCompleted ? 'completed' : 'pending'}`,
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
            message: 'Task edited successfully',
            type: 'successType'
        }))
    }

    function showScheduleCalendar() {
        setDatePicker(true);
    }

    function dateChangeHandler(selectedDate) {
        setDatePicker(false);
        if (calendarViewMode) {
            setCalendarViewMode(false);
            return;
        }
        setScheduledAt(selectedDate);
        setCalendarViewMode(false);
    }

    function showCalendarWithDate(task) {
        if (task.completed) return;
        setCalendarViewMode(true);
        setCurrentShow(new Date(task.scheduledAt));
        setDatePicker(true);
    }

    function clearScheduledAt() {
        setScheduledAt(null);
    }

    return (
        <View style={styles.container}>
            <View style={[{ backgroundColor: ThemeColors.taskBackgroundColor }, styles.inputContainer]}>
                <TextInput
                    value={task}
                    style={[{ borderColor: ThemeColors.borderColor, color: ThemeColors.textColor, backgroundColor: ThemeColors.inputBackgroundColor }, styles.input]}
                    multiline
                    placeholder="Add new task..."
                    placeholderTextColor={ThemeColors.greyColor}
                    onChangeText={(value) => setTask(value)}
                />

                {
                    task &&
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={[{ borderColor: ThemeColors.borderColor }, styles.calenderButton]}
                        onPress={showScheduleCalendar}
                    >
                        <View style={styles.calenderView}>
                            <MaterialCommunityIcons name="calendar" size={24} color={ThemeColors.textColor} />
                            {
                                scheduledAt ?
                                    <Text style={[{ color: ThemeColors.textColor }, styles.scheduledAtText]}>{formateDateOnly(scheduledAt)}</Text>
                                    :
                                    <Text style={[{ color: ThemeColors.textColor }, styles.scheduledAtText]}>Schedule task</Text>
                            }
                        </View>
                        <TouchableOpacity onPress={clearScheduledAt} >
                            <MaterialCommunityIcons name="close" size={28} color={ThemeColors.textColor} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                }

                <TouchableOpacity
                    activeOpacity={task ? 0.5 : 1}
                    style={[{ borderColor: task ? ThemeColors.enabledButton : ThemeColors.disabledButon }, styles.button]}
                    onPress={addTaskHandler}
                >
                    <MaterialIcons name="add" size={62} color={task ? ThemeColors.enabledButton : ThemeColors.disabledButon} />
                </TouchableOpacity>
            </View>
            {
                taskList.length === 0 ? <Text style={[{ borderColor: ThemeColors.backgroundColor, color: ThemeColors.greyColor, backgroundColor: ThemeColors.inputBackgroundColor }, styles.noTasks]}>No pending tasks</Text> : ''
            }
            {
                taskList.map((task) => (
                    <TouchableOpacity activeOpacity={0.5} key={task.id} style={[{ backgroundColor: ThemeColors.taskBackgroundColor }, styles.taskStyle]} onPress={() => toggleCompleted(task.id)}>
                        <View style={[styles.taskTextContainer, task.completed ? styles.taskContainerCompleted : null]}>
                            <Text style={[{ color: ThemeColors.textColor }, styles.taskText, task.completed ? styles.taskTextCompleted : null]}>{task.text}</Text>
                            {
                                task.scheduledAt &&
                                <TouchableOpacity activeOpacity={task.completed ? 1 : 0.5} onPress={() => showCalendarWithDate(task)}>
                                    <Text style={[{ color: ThemeColors.textColor, backgroundColor: getNumberOfDays(task.scheduledAt) >= 0 ? ThemeColors.backgroundColor : ThemeColors.borderColor }, styles.scheduledAt]}>{getNumberOfDays(task.scheduledAt) >= 0 ? getNumberOfDays(task.scheduledAt) + ' days left' : 'Overdue'}</Text>
                                </TouchableOpacity>
                            }
                            <Text style={[{ color: ThemeColors.createdAtColor }, styles.createdAt]}>{formateDate(task.updatedAt)}</Text>
                        </View>

                        <View style={styles.deleteButton}>
                            <TouchableOpacity style={{ opacity: 0.8 }} activeOpacity={0.3} onPress={() => deleteTask(task.id)}>
                                <MaterialCommunityIcons name="delete" size={24} color={ThemeColors.textColor} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ opacity: 0.8 }} activeOpacity={0.3} onPress={() => showActions(task.id, task.text, task.completed)}>
                                <MaterialCommunityIcons name="dots-vertical" size={28} color={ThemeColors.textColor} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))
            }
            <ActionsModal
                isVisible={isVisible}
                id={itemId}
                text={itemText}
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

            {
                datePicker &&
                <DateComponent
                    currentDate={currentShow}
                    onChangeHandler={dateChangeHandler}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 58,
    },
    inputContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    input: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 15,
        textAlignVertical: 'top',
        maxHeight: screenHeight / 7
    },
    button: {
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 5
    },
    calenderButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        borderWidth: 2,
        borderRadius: 5,
        paddingVertical: 5,
        marginBottom: 10,
        borderRadius: 100,
        paddingHorizontal: 20
    },
    calenderView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
    },
    scheduledAtText: {
        fontSize: 20,
        marginLeft: 10
    },
    buttonText: {
        fontSize: 20,
        color: '#fff'
    },
    deleteButton: {
        // paddingVertical: 5,
        paddingLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    taskStyle: {
        paddingVertical: 5,
        marginTop: 5,
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'row',
        paddingHorizontal: 10,
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
    },
    scheduledAt: {
        marginTop: 10,
        marginBottom: 5,
        paddingVertical: 8,
        textAlign: 'center',
        borderRadius: 35
    }
})
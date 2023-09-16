import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

export default DateComponent = ({ currentDate, onChangeHandler }) => {
    const onChangeHanlderLocal = (event, selectedDate) => {
        onChangeHandler(selectedDate);
    }

    return (
        <SafeAreaView>
            <DateTimePicker
                testID="dateTimePicker"
                value={currentDate}
                mode='date'
                onChange={(event, selectedDate) => onChangeHanlderLocal(event, selectedDate)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
})
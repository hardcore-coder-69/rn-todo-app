import { useSelector } from "react-redux";
import { COMMON } from "../constants/constants";

export function getThemeColors() {
    const isDark = useSelector(state => state.common.isDark);

    if (isDark) {
        return COMMON.dark;
    }
    return COMMON.light;
}

export function formateDate(date) {
    let visibleDate = new Date(date);
    try {
        let day = visibleDate.getDate();
        let month = visibleDate.toLocaleString('en-US', { month: 'short' });
        let year = visibleDate.getFullYear();
        visibleDate = day + ' ' + month + ' ' + year + ', ' + visibleDate.toLocaleTimeString();
        return visibleDate;
    } catch (error) { }
    return visibleDate.toDateString();
}

export function formateDateOnly(date) {
    let visibleDate = new Date(date);
    try {
        let day = visibleDate.getDate();
        let month = visibleDate.toLocaleString('en-US', { month: 'short' });
        let year = visibleDate.getFullYear();
        visibleDate = day + ' ' + month + ', ' + year + ' ';
        return visibleDate;
    } catch (error) { }
    return visibleDate.toDateString();
}

export function getNumberOfDays(date) {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const timeDifference = targetDate - currentDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
    return daysDifference;
}
import { useSelector } from "react-redux";
import { COMMON } from "../constants/constants";

export function getThemeColors() {
    const isDark = useSelector(state => state.common.isDark);

    if (isDark) {
        return COMMON.dark;
    }
    return COMMON.light;
}
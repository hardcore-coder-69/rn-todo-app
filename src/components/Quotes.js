import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { getThemeColors } from "../utils/Helper";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { fetchQuotes } from "../store/actions/quotes";
import { setLastPageNumber } from "../store/actions/quotes";

export default Quotes = () => {
    const { quotes, isLoading, isError, pageNumber } = useSelector(state => state.quotes);
    const selectedHeaderTab = useSelector(state => state.common.selectedHeaderTab);
    const dispatch = useDispatch();
    const ThemeColors = getThemeColors();

    useEffect(() => {
        dispatch(fetchQuotes(pageNumber));
    }, [dispatch, selectedHeaderTab]);

    function loadNext() {
        dispatch(fetchQuotes(pageNumber + 1));
        dispatch(setLastPageNumber(pageNumber + 1));
    }

    function loadPrevious() {
        if (pageNumber <= 0) return;
        dispatch(fetchQuotes(pageNumber - 1));
        dispatch(setLastPageNumber(pageNumber - 1));
    }

    if (isLoading) {
        return (
            <View style={styles.ActivityIndicator}>
                <ActivityIndicator size="62" color={ThemeColors.textColor} />
            </View>
        )
    }

    if (isError) {
        return (
            <View style={styles.ActivityIndicator}>
                <Text style={{ color: 'red' }}>Something went wrong.</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {quotes && quotes.length > 0 &&
                quotes.map((quote, index) => (
                    <TouchableOpacity activeOpacity={0.5} key={index} style={[{ backgroundColor: ThemeColors.taskBackgroundColor }, styles.quotesContainer]}>
                        <Text style={[{ color: ThemeColors.textColor }, styles.quote]}>{quote.quote}</Text>
                        <Text style={[{ color: ThemeColors.greyColor }, styles.name]}>- {`${quote.name} (${quote.profession})`}</Text>
                    </TouchableOpacity>
                ))
            }
            {quotes && quotes.length > 0 &&
                <View style={[{ borderColor: ThemeColors.borderColor, backgroundColor: ThemeColors.taskBackgroundColor }, styles.actionsContainer]}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => loadPrevious()} style={styles.prevContainer}>
                        <MaterialIcons name="skip-previous" size={30} color={ThemeColors.textColor} />
                        <Text style={[{ color: ThemeColors.textColor }, styles.prevNextText]}>Prev</Text>
                    </TouchableOpacity>
                    <Text style={[{ color: ThemeColors.textColor }, styles.pageNumber]}>Page {pageNumber}</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => loadNext()} style={styles.nextContainer}>
                        <Text style={[{ color: ThemeColors.textColor }, styles.prevNextText]}>Next</Text>
                        <MaterialIcons name="skip-next" size={30} color={ThemeColors.textColor} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 58
    },
    ActivityIndicator: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quotesContainer: {
        marginBottom: 5,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    quote: {
        fontSize: 20,
        paddingBottom: 15
    },
    name: {
        fontSize: 18,
        textAlign: 'right'
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingBottom: 5,
        // borderWidth: 1
    },
    prevContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    prevNextText: {
        fontSize: 18
    },
    pageNumber: {
        opacity: 0.7,
        textAlignVertical: 'center'
    },
    nextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
})
export const QUOTES_LOADED = 'QUOTES_LOADED';
export const LOADING_QUOTES = 'LOADING_QUOTES';
export const ERROR = 'ERROR';
export const SET_LAST_QUOTE_PAGE = 'SET_LAST_QUOTE_PAGE';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

export const fetchQuotes = (pageNumber = 0) => {
    return async (dispatch) => {

        const options = {
            method: 'POST',
            url: 'https://quotel-quotes.p.rapidapi.com/topic',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '577bb29bbamshe066511c2502220p18b019jsn453b91b7555d',
                'X-RapidAPI-Host': 'quotel-quotes.p.rapidapi.com'
            },
            data: {
                pageSize: 10,
                page: pageNumber,
                topic: "motivational"
            }
        };

        dispatch({ type: LOADING_QUOTES })
        try {
            const response = await axios.request(options);
            dispatch({
                type: QUOTES_LOADED,
                payload: response.data
            })
        } catch (error) {
            dispatch({ type: ERROR })
            console.log(error.message);
        }
    }
}

export const setLastPageNumber = (pageNumber) => {
    return async (dispatch) => {
        const path = FileSystem.documentDirectory + 'last_quote_page.json';
        await FileSystem.writeAsStringAsync(path, JSON.stringify({ pageNumber: pageNumber }));

        dispatch({
            type: SET_LAST_QUOTE_PAGE,
            payload: pageNumber
        });
    }
}
import { types } from "./types";

export const initialState = {
    data: [],
    meta: {},
    selfData: [],
    selfMeta: {},
    mapData: [],
    loading: false,
    current: {},
    loadingGraph: false,
    dataGraph: [],
    loadingExport: false,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_REPOSITORIES}_PENDING`:
        case `${types.FETCH_REPOSITORY}_PENDING`:
        case `${types.CREATE_REPOSITORY}_PENDING`:
        case `${types.UPDATE_REPOSITORY}_PENDING`:
        case `${types.DELETE_REPOSITORY}_PENDING`:
        case `${types.UPDATE_STATE}_PENDING`:
            return {
                ...state,
                loading: true
            };

        case `${types.FETCH_REPOSITORIES}_REJECTED`:
        case `${types.FETCH_REPOSITORY}_REJECTED`:
        case `${types.CREATE_REPOSITORY}_REJECTED`:
        case `${types.UPDATE_REPOSITORY}_REJECTED`:
        case `${types.DELETE_REPOSITORY}_REJECTED`:
        case `${types.UPDATE_STATE}_REJECTED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.UPDATE_STATE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.map((record) =>
                    record.id === action.payload.data.data.id
                        ? action.payload.data.data
                        : record
                )
            };



        case `${types.FETCH_REPOSITORIES}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta
            };
        case `${types.FETCH_REPOSITORY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: {
                    ...action.payload.data
                }
            };
        case `${types.DELETE_REPOSITORY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(record => record.id !== action.meta.id)
            };

        case `${types.CREATE_REPOSITORY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [action.payload.data.data, ...state.data]
            };
        case `${types.SET_CURRENT_STATE}`:
            return {
                ...state,
                loading: false,
                current: action.payload
            };


        case `${types.UPDATE_REPOSITORY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.map((record) =>
                    record.id === action.payload.data.data.id
                        ? action.payload.data.data
                        : record
                )
            };
        case `${types.EXPORT_REPOSITORY}_PENDING`:
        case `${types.EXPORT_TEMPLATE}_PENDING`:

            return {
                ...state,
                loadingExport: true
            };

        case `${types.EXPORT_REPOSITORY}_REJECTED`:
        case `${types.EXPORT_REPOSITORY}_FULFILLED`:
        case `${types.EXPORT_TEMPLATE}_REJECTED`:
        case `${types.EXPORT_TEMPLATE}_FULFILLED`:
            return {
                ...state,
                loadingExport: false
            };


        default:
            return state
    }
}
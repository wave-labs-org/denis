import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";
import { download } from "../../helper";

export const fetchRepositories = (page = 1, filters = {}) => ({
    type: types.FETCH_REPOSITORIES,
    payload: axios.get(`${window.location.origin}/api/repositories?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchRepository = id => ({
    type: types.FETCH_REPOSITORY,
    payload: axios.get(`${window.location.origin}/api/repositories/${id}`),
});

export const deleteRepository = id => ({
    type: types.DELETE_REPOSITORY,
    payload: axios.delete(`${window.location.origin}/api/repositories/${id}`),
    meta: { id }
});

export const createRepository = data => ({
    type: types.CREATE_REPOSITORY,
    payload: axios.post(`${window.location.origin}/api/repositories`, data),
});

export const updateRepository = (id, data) => ({
    type: types.UPDATE_REPOSITORY,
    payload: axios.put(`${window.location.origin}/api/repositories/${id}`, data),
});

export const setCurrentRepository = data => ({
    type: types.SET_CURRENT_STATE,
    payload: data,
});

export const exportTemplate = () => ({
    type: types.EXPORT_TEMPLATE,
    payload: axios({
        url: `${window.location.origin}/api/export/template`,
        method: "GET",
        responseType: "blob",
    }).then(
        response => {
            download(response, 'template.xlsx')
        },
        error => {
            return error.data;
        }
    ),
    meta: { globalError: true }
});

export const exportRepository = (filters = {}) => ({
    type: types.EXPORT_REPOSITORY,
    payload: axios({
        url: `${window.location.origin}/api/export/reports?${stringify(filters, {
            arrayFormat: "index"
        })}`,
        method: "GET",
        responseType: "blob",
    }).then(
        response => {
            download(response, 'repositories.csv')
        },
        error => {
            return error.data;
        }
    ),
    meta: { globalError: true }
});
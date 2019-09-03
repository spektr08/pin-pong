import config from 'config';
import { authHeader } from '../_helpers';

export const scoreService = {
    getAll,
    getAllRank,
     add,
    // delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/scores`, requestOptions).then(handleResponse);
}

function getAllRank() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/scores/rank`, requestOptions).then(handleResponse);
}

function add(score) {
    const requestOptions = {
        method: 'POST',
        headers:{ ...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(score)
    };

    return fetch(`${config.apiUrl}/scores/add`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
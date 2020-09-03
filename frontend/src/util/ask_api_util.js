import axios from "axios";

export const getAsks = () => {
    return axios.get("/api/asks");
};

export const getAsk = (askId) => {
    return axios.get(`/api/asks/${askId}`);
};

export const postAsk = (ask) => {
    return axios.post("/api/asks/", ask);
};

export const editAsk = (ask) => {
    return axios.patch(`/api/asks/${ask.id}`)
};

export const deleteAsk = (askId) => {
    return axios.delete(`/api/asks/${askId}`)
};

export const getUserAsks = (id) => {
    return axios.get(`/api/asks/user/${id}`)
};

export const addAskComment = (comment) => {
    return axios.post(`/api/asks/${comment.askId}/comments`, comment);
};

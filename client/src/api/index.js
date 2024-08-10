import axios from 'axios';

const api = axios.create({ baseURL: 'https://notesapp-b4by.onrender.com' });

api.interceptors.request.use((req) => {
    const token = localStorage.getItem('token'); // Ensure token is correctly saved in localStorage
    if (token) {
        req.headers['auth-token'] = token; // Use 'auth-token' header key as expected by the server
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});

export const Signup = (data) => api.post('/users/signup', data);
export const Login = (data) => api.post('/users/login', data);
export const getUser = () => api.get('/users/get-user');
export const deleteUser = (userId) => api.delete(`/users/delete-user/${userId}`)


export const createFolder = ( data ) => api.post('/folders/create-folder',data)
export const fetchFolders = () => api.get('/folders/fetch-folders');
export const deleteFolder = (userId)=> api.delete(`/folders/delete-folder/${userId}`)
export const updateFolder = ( id,data ) => api.post(`/folders/update-folder/${id}`,data)


export const createNotes = (data) => api.post('/notes/create-notes',data)
export const fetchAllNotes = () => api.get(`/notes/fetchallnotes`);
export const deleteNote = (id) => api.delete(`/notes/delete-notes/${id}`);
export const updateNote = (id,data) => api.put(`/notes/update-notes/${id}`,data)

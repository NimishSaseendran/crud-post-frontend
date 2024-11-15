const baseUrl = 'http://localhost:3001'
import axios from 'axios'

export const getAllPostsApi = async () => {
    return await axios.get(`https://jsonplaceholder.typicode.com/posts`)
}
export const getDbPostsApi = async () => {
    return await axios.get(`${baseUrl}/posts`)
}

export const addPostApi = async (data) => {
    return await axios.post(`${baseUrl}/posts`, data)
}

export const deleteDbPostApi = async (id) => {
    return await axios.delete(`${baseUrl}/posts/${id}`)
}

export const deletePostApi = async (id) => {
    return await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
}

export const updateDbPostApi = async (id, data) => {
    return await axios.put(`${baseUrl}/posts/${id}`, data)
}

export const updatePostApi = async (id, data) => {
    return await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data)
}


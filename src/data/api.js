import axios from "axios"

const api = axios.create({
    baseURL: 'https://contactsmanager-itw0.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api

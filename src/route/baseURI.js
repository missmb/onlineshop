import axios from 'axios'

const urlBase = axios.create({ baseURL: "http://localhost:5000" });


export default urlBase


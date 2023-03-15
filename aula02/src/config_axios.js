import axios from "axios";

export const webServiceURL = 'http://localhost:3001'

export const inAxios = axios.create({baseURL: webServiceURL})
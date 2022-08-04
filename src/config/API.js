import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost/final_project/index.php?url=',
    // baseURL: 'https://api.kingscoffeegroup.com?url=',
})

export default API
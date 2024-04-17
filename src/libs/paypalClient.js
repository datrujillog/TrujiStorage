// const { paypalApiUrl } = require("../config")
import  env  from "../config/env.js"

// const axios = require("axios").default
import axios from "axios"

const client = axios.create({
    // baseURL:paypalApiUrl
    baseURL: env.PAYPAL_API_URL
})

export default client
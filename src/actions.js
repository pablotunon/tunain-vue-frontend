// import Config from "./config";

const axios = require('axios');

const API_HOST = 'http://127.0.0.1:8000/'

// Axios
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'

export function apiRequest(url, data = {}, method = 'post', sendAsFiles = false) {
  return new Promise((resolve, reject) => {
    // Create form data
    var formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (sendAsFiles) {
        formData.append(key, value)
      } else {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value)
      }
    }

    // Send the request
    axios.request({
      url: API_HOST + url,
      data: formData,
      method,
      ...(sendAsFiles && {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      });
  })
}

export const post = apiRequest

export const simpleRequest = (url, params = {}, method = 'get') => {
  return new Promise((resolve, reject) => {
    // Send the request
    axios.request({ url: API_HOST + url, params, method })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      });
  })
}

export const get = simpleRequest

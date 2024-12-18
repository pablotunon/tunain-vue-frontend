// import Config from "./config";

const axios = require('axios');

const API_HOST = process.env.VUE_APP_API_HOST

// Axios
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// const csrftoken = getCookie("csrftoken")
// axios.defaults.headers.common['X-CSRFToken'] = csrftoken


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
      headers: {
        // 'X-CSRFToken': csrftoken,
        ...(sendAsFiles && {
          'Content-Type': 'multipart/form-data'
        })
      }
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

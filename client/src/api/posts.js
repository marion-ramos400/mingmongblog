import  axios  from 'axios'
import { HTTP } from '@/api/methods.js'

const domain = 'http://localhost:3000' //TODO put in config or .env file
const posts = '/posts'

const endpoint = (suff="") => {
  return domain + posts + suff
}

const makeRequest = (url, method, dataSend, resCallback) => {
  let success = false;
  let resdata = null;
  let errmsg = null;
  axios.request({
    url: url,
    method: method,
    data: dataSend
  })
  .then(res => {
    if (res.status < 300) {
      success = true;
      resdata = res.data;
    }
    else {
      errmsg = `HTTP RESPONSE: ${res.status} : ${res.statusText}`;
    }
  })
  .catch(err => {
    success = false;
    errmsg = String(err);
  })
  .finally(() => {
    if(success) {
      resCallback(resdata) 
    }
    else {
      console.log(`Error calling ${apiEndpoint}: ${errmsg}`)
    }
  })
}


const getAllPosts = (resCallback) => {
  makeRequest(
    endpoint(),
    HTTP.GET,
    null,
    resCallback 
  )
}


const getPost = (id, resCallback) => {
  makeRequest(
    endpoint(`/${id}`),
    HTTP.GET,
    null,
    resCallback
  )
}

const createPost = (data, resCallback) => {
  data.last_update_timestamp = Date.now()
  makeRequest(
    endpoint('/create'),
    HTTP.POST,
    data,
    resCallback
  )
}

const updatePost = (data, resCallback) => {
  data.last_update_timestamp = Date.now()
  if (data.title == null) { delete data.title }
  if (data.content == null) { delete data.content }
  makeRequest(
    endpoint('/update'),
    HTTP.PUT,
    data,
    resCallback
  ) 
}

const deletePost = (id, resCallback) => {
  makeRequest(
    endpoint(`/delete/${id}`),
    HTTP.DELETE,
    {},
    resCallback
  )
}

export default { 
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
}

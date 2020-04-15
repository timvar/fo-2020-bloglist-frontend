import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  try {
    return (await axios.get(baseUrl)).data
  } catch (error) {
    console.log('getAll failed')
  }}
  
const createBlog = async (blog) => {
  const config = {
    headers: {Authorization: token}
  }
  try {
    return await (await (axios.post(baseUrl, blog, config))).data
  } catch (error) {
    console.log('create blog failed')
  }
}

export default { getAll, createBlog, setToken}
 
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
    headers: { Authorization: token }
  }
  try {
    return await (await (axios.post(baseUrl, blog, config))).data
  } catch (error) {
    console.log('create blog failed')
  }
}

const updateBlog = async (blog, id) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    return await (await (axios.put(`${baseUrl}/${id}`, blog, config))).data
  } catch (error) {
    console.log('update blog failed')
  }
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    await await (axios.delete(`${baseUrl}/${id}`, config))
  } catch (error) {
    console.log('update blog failed')
  }
}

export default { getAll, createBlog, setToken, updateBlog, removeBlog }

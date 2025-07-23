import  axios  from 'axios'

const domain = 'http://localhost:3000' //TODO put in config or .env file
const posts = '/posts'

const endpoint = (suff="") => {
  return domain + posts + suff
}

const getAllPosts = async () => {
  try {
    const res = await axios.get(endpoint())
    return res;
    //TODO check status code
  } catch (err) {
    console.log(err) //TODO summon a modal at display
    return;
    //TODO check at caller if error/undefined/etc
  }
}

const getPost = async (id) => {
  try {
    const res = await axios.get(endpoint(`/${id}`))
    return res;
  } catch (err) {
    console.log(err)
    return;
  }
}

const createPost = async (data) => {
  try {
    const res = await axios.post(endpoint('/create'), 
      {
        title: data.title,
        content: data.content,
        last_update_timestamp: Date.now()
      })
    return res;
  } catch (err) {
    console.log(err)
    return;
  }
}

const updatePost = async (data) => {
  const dataSend = {
    id: data.id,
    title: data.title,
    content: data.content,
    last_update_timestamp: Date.now()
  };
  if (dataSend.title == null) { delete dataSend.title }
  if (dataSend.content == null) { delete dataSend.content }
  try {
    const res = await axios.put(
      endpoint('/update'), 
      dataSend
    )
    return res;
  } catch (err) {
    console.log(err)
    return;
  }

}

export default { 
  getAllPosts,
  getPost,
  createPost,
  updatePost,
}

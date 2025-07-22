
import { models } from '../db/cassandra.js'


const findOne = (id, successCb, errCb, raw=true) => {
  models.instance.Post.findOne(
    {id: models.timeuuidFromString(id)},
    { raw: raw},
    (err, post) => {
      if (err) { errCb(500, err); return; }
      if (post) {
        console.log(`Found Post Item with id: ${post.id}`)
        successCb(post)
      }
      else {
        const msg = `Unable to find Post Item with id: ${id}`
        console.log(msg) 
        errCb(404, msg)
      }
    }
  )
}


export const createPost = (data) => {
  let newPost = new models.instance.Post({
    id: models.timeuuid(),
    title: data.title,
    content: data.content,
    last_update_timestamp: Date.now(),
  })
  newPost.save((err) => {
    if (logError(err)) { return; }
    console.log(`created Post Item with id: ${newPost.id}`)
    return newPost.id
  })
}

export const getPost = (id, successCb, errCb) => {
  findOne(id, successCb, errCb)
}

export const deletePost = (id, successCb, errCb)=> {
  const deleteCallback = (post) => {
    post.delete((err) => {
      if (err) { errCb(500, err); return; }
      console.log(`deleted Post Item with id: ${post.id}`)
      successCb(200, { status: "deleted", postId: post.id})
    })
  }
  findOne(id, deleteCallback, errCb, false)
}




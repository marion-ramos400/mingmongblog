
import { models } from '../db/cassandra.js'


const findOne = (id, successCb, errCb, raw=true) => {
  try {
    const timeUuid = models.timeuuidFromString(id)
    models.instance.Post.findOne(
      {id: timeUuid},
      { raw: raw},
      (err, post) => {
        sendIfError(errCb, err);
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
  catch (err) {
    sendIfError(errCb, err);
    return
  }
}

const sendIfError = (errCallback, err) => {
  if (err) {
    errCallback(500, String(err))
  }
}


export const createPost = (data, successCb, errCb) => {
  let newPost = new models.instance.Post({
    id: models.timeuuid(),
    title: data.title,
    content: data.content,
    last_update_timestamp: Date.now(),
  })
  newPost.save((err) => {
    sendIfError(errCb, err)
    console.log(`created Post Item with id: ${newPost.id}`)
    successCb(200, { newPost })
  })
}

export const getPost = (id, successCb, errCb) => {
  findOne(id, successCb, errCb)
}

export const deletePost = (id, successCb, errCb)=> {
  const deleteCallback = (post) => {
    post.delete((err) => {
      sendIfError(errCb, err);
      console.log(`deleted Post Item with id: ${post.id}`)
      successCb(200, { status: "deleted", postId: post.id})
    })
  }
  findOne(id, deleteCallback, errCb, false)
}

export const updatePost = (id, successCb, errCb, newData) => {
  delete newData.id;
  const updateCallback = (post) => {
    models.instance.Post.update(
      { id: models.timeuuidFromString(id) },
      newData,
      (err) => {
        sendIfError(errCb, err);
        console.log(`updated Post Item with id: ${id}`)
        successCb(204, {})
      }
    )
  }
  findOne(id, updateCallback, errCb)
}

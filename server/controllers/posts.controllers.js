
import { models } from '../db/cassandra.js'

export const createPost = (data) => {
  let newPost = new models.instance.Post({
    id: models.timeuuid(),
    title: data.title,
    content: data.content,
    last_update_timestamp: Date.now(),
  })
  newPost.save((err) => {
    if (err) {
      console.log(err); 
      return; 
    }
    console.log(`created Post Item with id: ${newPost.id}`)
    return newPost.id
  })
}

export const getPost = (idStr, resCallback) => {
  models.instance.Post.findOne(
    {id: models.timeuuidFromString(idStr)},
    { raw: true},
    (err, post) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Found Post Item with id: ${post.id}`)
      resCallback(post)
    }
  )
}




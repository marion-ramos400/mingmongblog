
import ExpressCassandra from 'express-cassandra'
import * as path from 'path'
import postSchema from '../models/PostModel.js'

const config = {
  keyspace : 'mingblog',
  localDataCenter : 'datacenter1',
  contactPoints : ['127.0.0.1'],
  port : 9042
}

let models = null;

// setup PostModel to cassandra
const initDbTable = () => {
  models = ExpressCassandra.createClient({
      clientOptions: {
        contactPoints: config.contactPoints,
        localDataCenter: config.localDataCenter,
        protocolOptions: {port: config.port},
        keyspace: config.keyspace,
        queryOptions: { consistency: ExpressCassandra.consistencies.one },
        socketOptions: { readTimeout: 60000 }
      },
      ormOptions: {
        defaultReplicationStrategy: {
          class: 'SimpleStrategy',
          replication_factor: 1
        },
        migration: 'safe'
      }
  })

  let PostModel = models.loadSchema('Post', postSchema);
  PostModel.syncDB((err, result) => {
    if (err) throw err;
//    let test = new models.instance.Post({
//      id: models.timeuuid(),
//      title: 'test-title-title',
//      content: 'content-content-content',
//      images: null,
//      videos: null
//    });
//
//    test.save((saveerr) => {
//      if (saveerr) {console.log(saveerr); return;}
//      console.log('IT WORRRKS');
//    });

  })

}

export { initDbTable, models };

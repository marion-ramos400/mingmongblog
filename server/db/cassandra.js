
import models from 'express-cassandra'
import * as path from 'path'

const __dirname = import.meta.dirname
const serverDir = path.join(__dirname, '..')
console.log(serverDir)



const config = {
  keyspace : 'mingblog',
  localDataCenter : 'datacenter1',
  contactPoints : ['127.0.0.1'],
//  contactPoints : ['localhost'],
  port : 9042
}

// setup models dir to cassandra
const initDbTable = () => {
  console.log('init')
  models.setDirectory(serverDir + '/models').bind(
    {
      clientOptions: {
        contactPoints: config.contactPoints,
        localDataCenter: config.localDataCenter,
        protocolOptions: {port: config.port},
        keyspace: config.keyspace,
        queryOptions: { consistency: models.consistencies.one },
        socketOptions: { readTimeout: 60000 }
      },
      ormOptions: {
        defaultReplicationStrategy: {
          class: 'SimpleStrategy',
          replication_factor: 1
        },
        migration: 'safe'
      }
    },
    function(err) {


      if (err) throw err;
      console.log(models.instance.Post)
//      let test = new models.instance.Post({
//        id: '123123',
//        title: 'test-title-title',
//        content: 'content-content-content',
//        images: {},
//        videos: {}
//      });
//      test.save((saveerr) => {
//        if (saveerr) {console.log(saveerr); return;}
//        console.log('IT WORRRKS');
//      });
    }
  )
};



export default initDbTable;

export default {
  fields: {
    id : 'timeuuid',
    title: 'text',
    content: 'text',
    images: 'set<text>',
    videos: 'set<text>',
    last_update_timestamp: 'timestamp'
  },
  key: ['id']
}

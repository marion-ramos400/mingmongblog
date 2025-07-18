export default {
  fields: {
    id : 'timeuuid',
    title: 'text',
    content: 'text',
    images: {
      type: "set",
      typeDef: "<text>"
    },
    videos: {
      type: "set",
      typeDef: "<text>"
    },
    last_update_timestamp: 'timestamp'
  },
  key: ['id']
}

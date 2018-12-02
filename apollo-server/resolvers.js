import GraphQLJSON from 'graphql-type-json'
import shortid from 'shortid'


export default {
  JSON: GraphQLJSON,

  Counter: {
    countStr: counter => `Current count: ${counter.count}`,
  },


  Query: {
    hello: (root, { name }) => `Hello ${name || 'World'}!`,
    entities: (root, args, { db }) => db.get('entities').value(),
    messages: (root, args, { db }) => db.get('messages').value(),
    uploads: (root, args, { db }) => db.get('uploads').value(),
  },

  Mutation: {
    myMutation: (root, args, context) => {
      const message = 'My mutation completed!'
      context.pubsub.publish('hey', { mySub: message })
      return message
    },

    createEntity(root, { input }, { pubsub, db }) {
      const entity = {
        id: shortid.generate(),
        name: input.name,
        type: input.type,
      }

      db.get('entities')
        .push(entity)
        .last()
        .write()

      pubsub.publish('entities', { entityCreated: entity })

      return entity
    },

    updateEntity(root, { id, input }, { pubsub, db }) {
      let entity = db.get('entities').find({ id });
      entity.assign(input).write();
      return entity.value();
    },

    addMessage: (root, { input }, { pubsub, db }) => {
      const message = {
        id: shortid.generate(),
        text: input.text,
      }

      db
        .get('messages')
        .push(message)
        .last()
        .write()

      pubsub.publish('messages', { messageAdded: message })

      return message
    },

    singleUpload: (root, { file }, { processUpload }) => processUpload(file),
    multipleUpload: (root, { files }, { processUpload }) => Promise.all(files.map(processUpload)),

  },

  Subscription: {
    entityCreated: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('entities'),
    },

    mySub: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('hey'),
    },
    counter: {
      subscribe: (parent, args, { pubsub }) => {
        const channel = Math.random().toString(36).substring(2, 15) // random channel name
        let count = 0
        setInterval(() => pubsub.publish(
          channel,
          {
            // eslint-disable-next-line no-plusplus
            counter: { count: count++ },
          }
        ), 2000)
        return pubsub.asyncIterator(channel)
      },
    },

    messageAdded: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('messages'),
    },

  },
}

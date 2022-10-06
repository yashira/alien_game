const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.mongodb_uri;

const client = new MongoClient(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  },
);

module.exports = {
  getClient: () => client,
};

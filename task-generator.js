const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');
const genRanHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

const userName = process.env.USER_NAME
const userPass = process.env.USER_PASSWORD
const dbIp = process.env.DB_IP
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME
const dbAuth = process.env.DB_AUTH

const main = async function () {
  try {
    const DB_CONNECT = `mongodb://${userName}:${userPass}@${dbIp}:${dbPort}/${dbName}?authSource=${dbAuth}`
    const mongoClient = new MongoClient(DB_CONNECT);
    const mongoConnection = await mongoClient.connect()
    const db_connection = mongoConnection.db(dbName)

    const col3 = db_connection.collection("todotasks")
    let counter = 0
    while (true) {
      let documentList = []
      let c = ''
      for (let i = 0; i < 10000; i++) {
        let d = new Date()
        c = genRanHex(32)
        let doc = {
          content: c,
          date: d,
          __v: 0
        }
        documentList.push(doc)
      }
      // InsertMany
      await col3.insertMany(documentList)
      counter++
      console.log('Insercions: ', counter * 10000);
      console.log('Last insertion: ', c);
    }
  } catch (e) {
    console.error('Alguna cosa ha fallat al intentar generar tasques per omplir mongodb. Error: ', e)
  }
}

main()
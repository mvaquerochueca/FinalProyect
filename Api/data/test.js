const mongodb = require('mongodb')

const { MongoClient, ObjectId } = mongodb

const client = new MongoClient('mongodb://localhost:27017/data')
//El /data se podria borrar y se podria especiiicar en el
//client.db('data') pero se deja para que se vea que se puede

client
    //Primero se conecta a la base de datos
    .connect()
    //Después pasa a la siguiente promesa
    .then((connection) => {
        //Connection es la promesa que devuelve el connect()

        const db = connection.db()

        // const users = db.collection('users')
        const posts = db.collection('posts')

        // return users.insertOne({
        //     //Si la insecion es correcta, pasa a la siguiente promesa que es el .then
        //     name: 'Mateo Vaquero',
        //     email: 'mateo@vaquero.com',
        //     password: '12345678',
        // })

        // return posts.insertOne({
        //     author: new ObjectId('649efc59a0abe328412e758f'),
        //     image: 'https://images.unsplash.com/photo-1621574539434-4f8b9b8b9b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
        //     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        //     date: new Date(),
        // })

        return posts.find({}).toArray()
    })

    //Después pasa a la siguiente promesa
    .then((result) => {
        console.log(result)
    })
    //Si hay un error en cualquiera de las promesas, pasa al catch
    .catch((error) => {
        console.error(error)
    })
    //Finalmente, se desconecta de la base de datos
    .finally(() => {
        client.close()
    })

//Ejemplo similar a las promesas con try catch

// try
// {

// } catch (...){

// } finally {

// }

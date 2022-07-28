

import express from "express"
import cors from "cors"
import {MongoClient} from "mongodb"
import { uri } from "./dbsecrets.js"
console.log(uri)

const client = new MongoClient(uri) // connects with mongodb 
const db = client.db("sample_mflix") // connect to the the database we have in there
const movieCollection = db.collection("movies") // connects to the collection we have in our database
const app = express ()
const port = 4000

app.use(cors()) // we are letting other access the API // cors is solving a problem that used to occur on the browser // cross origin request security // stops request access to unauthorized users 
app.use(express.json()) //allow a POST with json 

// app.get and app.post go here
app.get ("/", (req,res) => {
    res.status(200).send('Hello World')
})
    // if you go to http://localhost:4000/

app.get("/movies", (req, res) => {
    const query = {} // when making a request to mongodb it can return everything 
    
    console.log(movieCollection.countDocuments(query)) // this is to we proved that we were right about the number of movies and how we get the record the movies 

    movieCollection.find(query).limit(10).toArray((err, movies) => {
        console.log("I'm here Carla")
        res.status(200).json(movies)
    })
})
    // if you go to http://localhost:4000/movies

app.post("/movie", (req,res) => {
    const newMovie = req.body // this pointing the the added text in the body message in postman
    
    movieCollection.insertOne(newMovie, (err, results) => {
        if (err) {
            res.status(500).json({error:true})
        } else {
            res.status(201).json(results)
        }
    })
})
    // if you go to  http://localhost:4000/movie in postman under POST you can edit the body and add the new movie


app.listen(port, () => {
    console.log ("Ready on http://localhost:" + port)
})

 
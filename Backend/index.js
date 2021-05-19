const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//used to make the data readable to let the model and human understand 
app.use(express.json());
//using cors as middleware 
app.use(cors());


//schema for foods collection
const foodSchema = new mongoose.Schema({
    name: String,
    calories: Number,
    protien: Number,
    carbs: Number,
    fats: Number,
    fibre: Number,
    weight: Number,

});

//model creation for our db to know to use our schema
const foodModel = new mongoose.model("foods", foodSchema)






//mongo connetion method returns a promise
mongoose.connect("mongodb://127.0.0.1:27017/nutrition", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected");
});

//post request to create an object of food 
app.post("/food/create", (req, res) => {

    const food = req.body;
    // save it futher in the db  by creteating object through model
    let foodObj = new foodModel(food);
    foodObj.save().then(() => {
        res.send({ status: "food Stored" });
        console.log("inside post");
    });

});

//get request for fetching food all food
app.get("/foods",async (req, res) => {
    let foods = await foodModel.find();
    res.send({ foods: foods });
});

app.listen(8000);
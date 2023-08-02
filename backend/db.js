const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://neelpatel:neel29072001@neel.rl99wst.mongodb.net/grocery?retryWrites=true&w=majority';

const mongoDB = async () => {

    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {

        if (err) console.log("---", err);
        else {
            console.log({config})
            console.log("Connect Successfully..");
            const foodCollection = await mongoose.connection.db.collection("grocery_data");
            foodCollection.find({}).toArray(async function (err, data) {


                const foodCategory = await mongoose.connection.db.collection("grocery_category");
                foodCategory.find({}).toArray(function (err, catData){

                        if(err) console.log(err);
                        else {
                                global.food_items = data ;
                                // console.log(global.food_items)
                                global.foodCategory = catData ;
                                // console.log(global.foodCategory)
                        }
                })

            })
        }

    });

};

module.exports = mongoDB;
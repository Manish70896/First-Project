
import dotenv from "dotenv";
import connectDB from "./db/index.js";


dotenv.config({
  path: "./.env",
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    })
})
.catch((error) => {
    console.error("Error while connecting to MongoDB:", error);
})














// yeh code humare MongoDB se connect karne ke liye hai.
// per ye ek achi apprroach nai hai kyoki index file thodi messy ho jygi toh
// hum alag se db ke folder mai rekhnge

/*

import express from "express"

const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        app.on("error", (error) => {
            console.log("Error while connecting to MongoDB1", error)
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })

    } catch (error) {
        console.log("Error while connecting to MongoDB2", error)
        throw error

        
    }
})()

*/
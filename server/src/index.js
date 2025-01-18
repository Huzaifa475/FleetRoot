import connectDB from "./database/mongodb.js"
import dotenv from "dotenv"
import app from "./app.js"

dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT, async () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!!", err);
    })
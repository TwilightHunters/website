// import mongoose
import mongoose, { Model, SchemaType } from "mongoose";

// connecting to mongoose (Get database url from .env.local file)
const { DATABASE_URL } = process.env;

// connection function
export const connect = async () => {
    const connection = await mongoose
        .connect(DATABASE_URL as string)
        .catch(err => console.log(err));
    console.log("MongoDB Connected");

    // user schema
    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    })

    // user model
    const User = mongoose.models.User || mongoose.model("User", userSchema);

    // recipes schema
    const recipeSchema = new mongoose.Schema({
        name: String,
        author: String,
        description: String,
        ingredients: Array,
        instructions: Array,
        image: String,
        rating: Number,
        prep_time: String,
        cook_time: String,
        total_time: String,
        servings: Number,

    })

    // recipe model
    const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

    // authors schema
    const authorSchema = new mongoose.Schema({
        name: String,
        email: String
    })

    // author model
    const Author = mongoose.models.Author || mongoose.model("Author", authorSchema);


    return { connection, User, Recipe, Author }
}


import { Recipe } from "@/utils/types"
import { Link } from "@nextui-org/react"
import Image from "next/image"
import { useState } from "react"
import { Rating } from "react-simple-star-rating"
import ReactStars from "react-stars"

// define Prop Interface
interface Props {
    recipe: Recipe
    url: string
}

// define Component
function RecipePage(props: Props) {
    // set the recipe as state for modification
    const [recipe, setRecipe] = useState<Recipe>(props.recipe)
    // return JSX
    return (
        <div className="m-10">
            <Image src={recipe?.image} alt={recipe?.name} width={300} height={300} className="w-[400px] h-78 object-cover m-auto rounded-3xl" />
            <h1 className="text-[48px] font-bold tracking-tight text-gray-900 sm:text-6xl text-center">{recipe?.name}</h1>
            <div className="text-[20px] flex flex-row justify-center items-center gap-[10px] mt-[-10px]">
                <p>Rating: {recipe?.rating}</p>
                <Rating initialValue={recipe?.rating} readonly size={20} allowFraction />
            </div> 
            <h2 className="text-[30px] font-bold text-center">Instructions</h2>
            <ol className="text-center leading-10 text-[20px]">
                {recipe?.instructions.map((direction, index) => (
                    <li key={index}>{direction}</li>
                ))}
            </ol>
            <p className=" mt-10 text-[28px] text-center font-bold italic">Preparation time: {recipe?.prep_time}</p>
            <p className=" text-[28px] text-center font-bold italic">Cooking time: {recipe?.cook_time}</p>
            <p className=" text-[28px] text-center font-bold italic">Total time: {recipe?.total_time}</p>            
        </div>
    )
}

// define server-side props
export async function getServerSideProps(context: any) {
    // fetch the recipe, the param was recieved via context.query.id
    const res = await fetch(process.env?.API_GET + "/recipes/" + context.query.id)
    
    const recipe = await res.json()
    console.log(recipe)
    // return the Server Side Props the recipe and the url from out env variables for frontend api calls
    return {
        props: { recipe, url: process.env?.API_GET + "/recipes" },
    }
}

// export the component
export default RecipePage;
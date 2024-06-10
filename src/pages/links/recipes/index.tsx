import { Recipe } from "@/utils/types";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import ReactStars from 'react-stars'
import { Rating } from 'react-simple-star-rating'

// define the components props
interface IndexProps {
  recipes: Array<Recipe>;
}

// define the page component
function Recipes({ recipes }: IndexProps) {
  return (
    <> 
    <h1 className="text-[48px] font-bold tracking-tight text-gray-900 sm:text-6xl text-center">Recipes catalog</h1>  
    <div className="grid grid-cols-1 gap-2 mt-5 sm:grid-cols-1 sm:gap-0 md:grid-cols-2 md:gap-3 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 ">
      {recipes?.map((recipe) => (
        <div key={recipe?._id}>
          <Link href={ `/links/recipes/${recipe._id}` }>
            <div className="text-center py-3">
             <Image src={recipe?.image} alt={recipe?.name} className="w-[75%] h-78 object-cover m-auto rounded-3xl" />
              <h3 className=" text-[20px] font-medium">{recipe?.name}</h3>
              <div className="text-[14px] flex flex-row justify-center items-center gap-[10px]">
                <p>Rating: {recipe?.rating}</p>
                <Rating initialValue={recipe?.rating} readonly size={20} allowFraction />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
      
    </>
)
}

// Get props for server side rendering
export async function getServerSideProps() {
    // get recipes data from the API
    const res = await fetch(process.env?.API_GET + "/recipes" as string)
    const recipes = await res.json();

    // return props
    return {
      props: { recipes },
    }
}

export default Recipes;
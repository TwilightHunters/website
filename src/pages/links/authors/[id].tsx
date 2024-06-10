import { Author } from "@/utils/types"
import { Recipe } from "@/utils/types"
import { Avatar, AvatarIcon, Image } from "@nextui-org/react"
import { url } from "inspector"
import Link from "next/link"
import { useState } from "react"
import ReactStars from "react-stars"


// define Prop Interface
interface Props {
    author: Author
    url: string
    recipes: Array<Recipe>
}

// define component
function AuthorPage(props: Props) {
    // set the author as state for modification
    const [author, setAuthor] = useState<Author>(props.author)
    const { recipes } = props
    
    // return JSX
    return (
        <>
            <Avatar icon={<AvatarIcon />} size="lg" className="m-auto mt-4" />
            <h1 className="text-[48px] font-bold tracking-tight text-gray-900 sm:text-6xl text-center">{ author?.name }</h1>
            <div className="text-center w-full"><Link href={`mailto:${author?.email}`} className="text-[30px] text-center underline m-auto">{author?.email}</Link></div>


            <h2 className="text-[30px] ml-5 font-bold">Recipes of { author?.name }</h2>
            <div className="grid grid-cols-1 gap-2 mt-5 sm:grid-cols-1 sm:gap-0 md:grid-cols-2 md:gap-3 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 ">
                {recipes?.map((recipe) => (
                    recipe?.author == author?.name ?
                        <div key={recipe?._id}>
                        <Link href={ `/links/recipes/${recipe._id}` }>
                            <div className="text-center py-3">
                            <Image src={recipe?.image} alt={recipe?.name} className="w-[75%] h-78 object-cover m-auto rounded-3xl" />
                            <h3 className=" text-[20px] font-medium">{recipe?.name}</h3>
                            <div className="text-[14px] flex flex-row justify-center items-center gap-[10px]">
                                <p>Rating: {recipe?.rating}</p>
                                <ReactStars edit={false} half={true} count={5} value={Math.round(recipe?.rating)} size={20} color2={'#ffd700'} />
                            </div>
                            </div>
                        </Link>
                        </div>
                        :
                        <>
                        
                        </>
                ))}
            </div>
        </>
    )
}

// define server-side props
export async function getServerSideProps(context: any) {
    // fetch the author, the param was recieved via context.query.id
    const res = await fetch(process.env?.API_GET + "/authors/" + context.query.id)
    const author = await res.json()

    const recipes_data = await fetch(process.env?.API_GET + "/recipes" as string)
    const recipes = await recipes_data.json()
    

    // return the Server Side Props the author and the url from out env variables for frontend api calls
    return {
        props: { author, recipes, url: process.env?.API_GET },
    }
}

export default AuthorPage;
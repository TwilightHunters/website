import Link from "next/link";
import { Recipe } from "@/utils/types";
import { useRouter } from "next/router";
import { FormEvent, FormEventHandler, useRef } from "react";
import Image from "next/image";
import { Input } from "@nextui-org/react";

// define props
interface CreateProps {
    url: string;
}

const AddRecipe = (props: CreateProps) => {
    // get the next route
    const router = useRouter();

    const recipename = useRef<HTMLInputElement>(null);
    const author = useRef<HTMLInputElement>(null);
    const image = useRef<HTMLInputElement>(null);
    const rating = useRef<HTMLInputElement>(null);
    const prep_time = useRef<HTMLInputElement>(null);
    const cook_time = useRef<HTMLInputElement>(null);
    const total_time = useRef<HTMLInputElement>(null);
    const servings = useRef<HTMLInputElement>(null);
    const ingredients = useRef<HTMLInputElement>(null);
    const instructions = useRef<HTMLInputElement>(null);

    const form_inputs = [
        {
            "label": "Recipe Name",
            "type": "text",
            "ref": recipename,
            "placeholder": "Введіть назву рецепту"

        },
        {
            "label": "Author",
            "type": "text",
            "ref": author,
            "placeholder": "Введіть ім'я"
        },
        {
            "label": "Image",
            "type": "text",
            "ref": image,
            "placeholder": "Введіть силку на зображення"
        },
        {
            "label": "Rating",
            "type": "number",
            "step": "0.1",
            "ref": rating,
            "placeholder": "Введіть рейтинг"
        },
        {
            "label": "Preparation Time",
            "type": "text",
            "ref": prep_time,
            "placeholder": "Введіть час підготовки"
        },
        {
            "label": "Cooking Time",
            "type": "text",
            "ref": cook_time,
            "placeholder": "Введіть час готування страви"
        },
        {
            "label": "Total Time",
            "type": "text",
            "ref": total_time,
            "placeholder": "Введіть сумарний час приготування"
        },
        {
            "label": "Servings",
            "type": "number",
            "step": "1",
            "ref": servings,
            "placeholder": "Введіть калькість порцій"
        },
        {
            "label": "Ingredients",
            "type": "text",
            "ref": ingredients,
            "placeholder": "Введіть інгредієнти через кому"
        }, 
        {
            "label": "Instructions",
            "type": "text",
            "ref": instructions,
            "placeholder": "Введіть інструкції, розділені крапками"
        }
    ]

    // function to create new recipe
    const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault() 
    
        // construct new recipe, create variable, check it to pass type checks
        let recipe: Recipe = {
            name: "",
            author: "",
            ingredients: [],
            instructions: [],
            image: "",
            rating: 0,
            prep_time: "",
            cook_time: "",
            total_time: "",
            servings: 0,
            nutrition: {
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0
            }
        } 
        if (recipename.current !== null || image.current !== null) {
            recipe = {
                // ! - telling the TypeScript that it can trust me and the statement will not be null
                // ? - checking if the value is there
                name: recipename.current?.value!, 
                author: author.current?.value!,
                ingredients: ingredients.current?.value.split(".")!,
                instructions: instructions.current?.value.split(".")!,
                image: image.current?.value!,
                rating: parseFloat(rating.current?.value!),
                prep_time: prep_time.current?.value!,
                cook_time: cook_time.current?.value!,
                total_time: total_time.current?.value!,
                servings: parseInt(servings.current?.value!),
                nutrition: {
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0
                }
            }
            // make the API request
            await fetch(props.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recipe),
            })
            // after API request, redirect to the recipe page
            router.push("/links/recipes");
        }
    }

    // return JSX
    return (
        <>
            <h1 className="text-[48px] font-bold tracking-tight text-gray-900 sm:text-6xl text-center">Add your own recipe</h1>
            <h2 className="text-[24px] italic tracking-tight text-gray-500 sm:text-6xl text-center">* - required</h2>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 mt-4 p-4 rounded-md m-auto text-center w-full sm:w-[60%] md:w-[50%] lg:w-[50%] ">                
                {form_inputs.map(input => (
                    input.ref != ingredients
                        ?
                        <Input
                            isRequired
                            key={input.label}
                            type={input.type}
                            step={input.step}
                            label={input.label}
                            labelPlacement="inside"
                            ref={input.ref}
                            placeholder={input.placeholder}
                            variant="underlined"
                            size="lg"
                        /> 
                        :
                        <div>
                            <Input
                                isRequired
                                key={input.label}
                                type={input.type}
                                step={input.step}
                                label={input.label}
                                labelPlacement="outside"
                                ref={input.ref}
                                placeholder={input.placeholder}
                                variant="underlined"
                                size="lg"
                            />
                        </div>
                ))}

                <input type="submit" value="Створити рецепт" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" />
            </form>
        </>
    )
}

// export getStaticProps to provide API_URL to component
export async function getStaticProps(context: any) {
    return {
        props: {
            url: process.env.API_POST + "/recipes"
        }
    }
}

export default AddRecipe;
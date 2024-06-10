import { User } from "@/utils/types";
import { Input, Link } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FormEventHandler, useRef } from "react";

// define the components props
interface CreateProps {
    url: string;
}

function Signup(props: CreateProps) {
    const router = useRouter();
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const username = useRef<HTMLInputElement>(null)

    const form_inputs = [
        {
            "label": "Ім'я користувача",
            "type": "text",
            "ref": username,
            "placeholder": "Створіть своє ім'я користувача"
        },
        {
            "label": "Електронна пошта",
            "type": "text",
            "ref": email,
            "placeholder": "Введіть адресу електронної пошти"
        },
        {
            "label": "Пароль",
            "type": "password",
            "ref": password,
            "placeholder": "Створіть свій пароль"
        }
    ]

    // function to create new user
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        let user: User = {
            email: "",
            password: "",
            username: ""
        }
        if (email.current !== null || password.current !== null) {
            user = {
                email: email.current?.value!,
                password: password.current?.value!,
                username: username.current?.value!
            }
        }
        await fetch(props.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        })
        // after API request, redirect to the login page
        router.push("/");
    }
    return (
        <div>
            <h1 className="text-[48px] font-bold tracking-tight text-gray-900 sm:text-6xl text-center">Sign up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 mt-4 p-4 rounded-md m-auto text-center w-full sm:w-[50%] md:w-[50%] lg:w-[30%] ">
                {form_inputs.map(input => (
                    <Input
                        isRequired
                        key={input.label}
                        label={input.label}
                        labelPlacement="inside"
                        type={input.type}
                        placeholder={input.placeholder}
                        ref={input.ref}
                        variant="underlined"
                        size="lg"
                    />
                ))}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign up</button>
            </form>
            <h2 className="text-center">Already have an account?<Link isBlock showAnchorIcon href="/links/login" color="primary">Log in</Link></h2>
        </div>
    )
}

// Get props for the server side rendering
export async function getServerSideProps(context : any) {
    return {
        props: {
            url: process.env.API_GET + "/signup",
        },
    }
}

export default Signup;
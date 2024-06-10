import { User } from "@/utils/types";
import { Button, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FormEventHandler, useRef, useState } from "react";
import { useCookies } from "react-cookie";

interface IndexProps {
    users: Array<User>;
    url: string;
}

// define the page component
function LoginPage({ users }: IndexProps) {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['username'])
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [backdrop, setBackdrop] = useState('blur')


    const form_inputs = [
        {
            "label": "Ім'я користувача",
            "type": "text",
            "ref": username,
            "placeholder": "Введіть ваш пароль"
        },
        {
            "label": "Пароль",
            "type": "password",
            "ref": password,
            "placeholder": "Введіть ваш пароль"
        }
    ]
    
    const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault();
        const user = users?.find(user => user.username === username.current?.value && user.password === password.current?.value)
        if (user) {
            removeCookie('Ім`я користувача', { path: '/' });
            router.push("/");
            setCookie('Ім`я користувача', user.username, { path: '/' })
        } else {
            console.log("Неправильне ім'я користувача або пароль!")
            onOpen();
        }
    }    
    
    return (
        <div>
            <h1 className="text-[48px] font-bold tracking-tight text-gray-900 sm:text-6xl text-center">Log in</h1>
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
                <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Log in</Button>
            </form>
            <h2 className="text-center">Don't have an account?<Link isBlock showAnchorIcon href="/links/signup" color="primary">Sign up</Link></h2>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader> Data field error </ModalHeader>
                            <ModalBody> 
                                <p>Invalid username or password! Please check your username and password and try again</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                            </ModalFooter>
                        </>
                    )}    
                </ModalContent>
            </Modal>
        </div>
        
    )
}

export async function getStaticProps(context: any) {
    // get users data from the API
    const res = await fetch(process.env?.API_GET + "/users" as string);
    const users = await res.json();

    return {
        props: {
            url: process.env.API_GET + "/login",
            users 
        }
    }
}

export default LoginPage;
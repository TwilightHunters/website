import { Author } from "@/utils/types";
import Link from "next/link";
import React from "react";
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/react";

// define the components props
interface IndexProps {
    authors: Array<Author>;
}

const Authors = ({ authors }: IndexProps) => {
    return (
        <>
            <h1 className="text-[48px] font-bold tracking-tight text-gray-900 sm:text-6xl text-center">Our Authors</h1>
            
            <div className="grid grid-cols-2 gap-2 mt-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
                {authors?.map((author) => (
                    <div key={author?._id}> 
                        <Link href={ `/links/authors/${author._id}` }>
                            <div className="text-center py-3">
                                <Avatar className="m-auto bg-gradient-to-br from-[#FFB457] to-[#FF705B]" icon={<AvatarIcon />} size="lg"/>
                                <h3 className=" text-[20px] font-medium">{author?.name}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )

}

export async function getServerSideProps() {
    // get authors data from the API
    const res = await fetch(process.env?.API_GET + "/authors" as string)
    const authors = await res.json();

    // return props
    return {
      props: { authors },
    }
}

export default Authors;
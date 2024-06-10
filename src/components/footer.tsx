import Image from 'next/image'
import recipe64 from '../icons/recipe64.png'
import { Link } from '@nextui-org/react'

export default () => {

    const footerNavs = [
        { label: "Головна", href: "/"},
        { label: "Каталог рецептів", href: "/links/recipes"},
        { label: "Наші автори", href: "/links/authors"},
        { label: "Додати власний рецепт", href: "/links/add-recipe"}
    ]

    return (
        <footer className="text-gray-500 bg-white px-4 py-5 max-w-screen-xl mx-auto md:px-8">
            <div className="max-w-lg mx-auto text-center">
                <Image
                    
                    src={ recipe64 }
                    className="mx-auto"
                    width={64}
                    height={64}
                    alt='Logo of the company' />
                <p className="leading-relaxed mt-2 text-tiny sm:text-medium font-black">
                    Taste the World: Your Culinary Journey Begins Here!
                </p>
            </div>
            <ul className="flex flex-col items-center justify-center mt-[10px] sm:flex-row sm:space-x-4 sm:space-y-0">
                {
                    footerNavs.map((item, idx) => (
                        <Link key={idx} isBlock href={item.href} color='foreground' >{ item.label }</Link>   
                    ))
                }
            </ul>
            <div className="mt-[10px] items-center justify-between sm:flex">
                <div className="mt-4 sm:mt-0 w-[100%] text-center text-tiny sm:text-medium">
                    &copy;2024 Розробник - Ілля Іванов
                </div>
            </div>
            <style jsx>{`
                .svg-icon path,
                .svg-icon polygon,
                .svg-icon rect {
                    fill: currentColor;
                }
            `}</style>
        </footer>
    )
}

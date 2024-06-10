import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, menu } from "@nextui-org/react"
import logo  from '../icons/recipe32.png'
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Router, useRouter } from "next/router"

export default function NavbarPage() {
    const pathname = usePathname();

    const menuItems = [
        { label: "Головна", href: "/"},
        { label: "Каталог рецептів", href: "/links/recipes"},
        { label: "Наші автори", href: "/links/authors"},
        { label: "Додати власний рецепт", href: "/links/add-recipe"}
    ]

    return (
        <Navbar isBordered>
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-4" justify="center">
                <NavbarBrand>
                    <Link href="/"><Image src = {logo} alt="Logo"></Image> </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-8" justify="center">
                <NavbarBrand>
                    <Link href="/"><Image src = {logo} alt="Logo"></Image> </Link>
                </NavbarBrand>
                
                {menuItems.map((item, index) => (
                    <NavbarItem isActive={pathname == `${item.href}` ? true : false} key={index}>
                        <Link color="foreground" href={item.href} className="text-[16px]">
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Button className="text-[16px]" as={Link} color="secondary" href="/links/login" variant="light">Log in</Button>
                </NavbarItem>
                <NavbarItem>
                    <Button className="text-[16px] " as={Link} color="secondary" href="/links/signup" variant="ghost">Sign up</Button>    
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link className="w-full" color="foreground" href={item.href} size="lg">{item.label}</Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
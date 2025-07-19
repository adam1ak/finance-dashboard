import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

const directions = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Transactions", path: "/transactions" },
    { label: "Settings", path: "/settings" },
]

function NavBar() {

    const [showNav, toggleShowNav] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    const handleNavigation = (direction: string) => {
        toggleShowNav(false);
        navigate(direction);
    }

    return (

        <>
            <button
                className="sm:hidden bg-white/10 rounded-sm p-1 cursor-pointer"
                onClick={() => toggleShowNav((prev) => !prev)}>
                <Bars3Icon className="size-8 text-white" />
            </button>
            <nav className={`
                ${showNav ? 'fixed inset-0 flex z-50' : ''}
                sm:static
            `}>
                    {showNav && (
                        <div
                            className="sm:hidden fixed inset-0 bg-black/30"
                            onClick={() => toggleShowNav(false)}
                        />
                    )}
                    <div className={`
                    ${showNav ?
                            "fixed left-0 h-screen bg-white w-3/5 "
                            :
                            "hidden sm:flex"
                        }
                    sm:static sm:bg-transparent sm:h-auto sm:w-auto sm:text-white sm:items-end
                    flex
                `}>
                        {showNav && (
                            <button
                                className="sm:hidden absolute top-0 right-0 -translate-x-4 translate-y-4">
                                <XMarkIcon
                                    className="size-7 cursor-pointer"
                                    onClick={() => toggleShowNav(false)} />
                            </button>
                        )}
                        <p className="hidden sm:block sm:mr-12 sm:text-2xl sm:font-semibold">Finance</p>
                        <div className="flex flex-col justify-center w-full sm:w-auto gap-8 sm:flex-row sm:gap-6">
                            {directions.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`
                                    pl-12 text-left
                                    py-2.5
                                    sm:py-1.5 sm:px-2.5 sm:mr-8
                                    cursor-pointer
                                    text-2xl sm:text-base
                                    sm:rounded-md
                                    transition-all duration-300 ease-in-out
                                    ${location.pathname === item.path
                                            ? 'border-gray-500 border-y sm:border-0 sm:bg-white/10 sm:text-neutral-100'
                                            : 'sm:hover:bg-white/5 sm:text-gray-50'}
                                `}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>
            </>
            )
}
export default NavBar;

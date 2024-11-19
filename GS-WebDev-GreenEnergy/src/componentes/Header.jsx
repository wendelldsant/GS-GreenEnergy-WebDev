import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { GiCheckeredFlag } from "react-icons/gi";
import MenuSanduiche from "./MenuSanduiche";


function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false)
    const loginCheck = JSON.parse(localStorage.getItem('login_check'));

    useEffect(() => {
        const loginCheck = JSON.parse(localStorage.getItem('login_check'));

        const userOnline = loginCheck ? loginCheck.userId : false;
        if (userOnline) {
            setIsLogged(true)
        }
    }, [loginCheck]);

    return (
        <div className="bg-gray-900">
            <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="relative flex grid items-center grid-cols-2 lg:grid-cols-3">
                    <ul className="flex items-center hidden space-x-8 lg:flex">
                        <li className="text-lg font-medium  tracking-wide text-gray-100 transition-colors duration-200 hover:text-blue-500">
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                    <Link to="/" aria-label="Motion-Grid" title="Motion-Grid" className="inline-flex items-center lg:mx-auto">
                        <GiCheckeredFlag className="w-8 h-8 text-white" /> {/* Ícone da bandeira */}
                        <span className="ml-2 lg:text-3xl sm:text-lg font-extrabold tracking-wide text-gray-100 uppercase">
                            Sun-Catcher
                        </span>
                    </Link>
                    <ul className="flex items-center hidden ml-auto space-x-8 lg:flex">
                        {!isLogged && (
                            <li className="text-lg font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-blue-500">
                                <Link to="/register">Login/Cadastro</Link>
                            </li>
                        )}

                        {isLogged && (
                            <li className="text-lg font-medium tracking-wide text-xl text-gray-100 transition-colors duration-200 hover:text-blue-500">
                                <Link to="/profile">
                                    <CgProfile />
                                </Link>
                            </li>
                        )}


                    </ul>
                    <div className="ml-auto lg:hidden">
                        <button
                            aria-label="Open Menu"
                            title="Open Menu"
                            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                                />
                            </svg>
                        </button>
                        {isMenuOpen && 
                            <MenuSanduiche setIsMenuOpen = {setIsMenuOpen} isLogged = {isLogged}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { CiSun } from "react-icons/ci";
import MenuSanduiche from "./MenuSanduiche";


function Header() {
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
        <div className="bg-yellow-200">
            <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="relative flex grid items-center grid-cols-2 lg:grid-cols-3">
                    <ul className="flex items-center hidden space-x-8 lg:flex">
                        <li className="text-lg font-medium  tracking-wide text-orange-600 transition-colors duration-200 hover:text-orange-800">
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                    <Link to="/" aria-label="Motion-Grid" title="Motion-Grid" className="inline-flex items-center lg:mx-auto">
                        <CiSun className="w-8 h-8 text-orange-500" />
                        <span className="ml-2 lg:text-3xl sm:text-lg font-extrabold tracking-wide text-orange-500 uppercase">
                            Sun Catcher
                        </span>
                    </Link>
                    <ul className="flex items-center hidden ml-auto space-x-8 lg:flex">
                        {!isLogged && (
                            <li className="text-lg font-medium tracking-wide text-orange-600 transition-colors duration-200 hover:text-orange-800">
                                <Link to="/register">Login/Cadastro</Link>
                            </li>
                        )}

                        {isLogged && (
                            <li className="text-lg font-medium tracking-wide text-xl text-orange-600 transition-colors duration-200 hover:text-orange-800 ">
                                <Link to="/profile">
                                    <CgProfile />
                                </Link>
                            </li>
                        )}


                    </ul>

                    <MenuSanduiche isLogged={isLogged} />

                </div>
            </div>
        </div>
    );
}

export default Header;

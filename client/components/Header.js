import Image from "next/image";

import {
    SearchIcon,
} from "@heroicons/react/outline";
import Link from 'next/link';
import Router from "next/router";

function Header({currentUser}) {
    const goToUserProfile = () => {
        Router.push(`/user/${currentUser.id}`);
    }

    return (
        <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
            <div className="flex items-center">
                <Image src="https://res.cloudinary.com/dwsbhnc1g/image/upload/v1630184633/ci71hrda4ntkbvugi8xe.png"
                       width={40}
                       height={40}
                       layout="fixed"/>

                {currentUser &&
                <div className="hidden md:inline-flex ml-2 items-center rounded-full bg-gray-100 p-2">
                    <SearchIcon className="h-6 text-gray-500 flex-shrink"/>
                    <input
                        className="hidden lg:inline-flex ml-2 items-centered bg-transparent
                outline-none placeholder-gray-500 flex-shrink"
                        type="text"
                        placeholder="Search Fipubook"/>
                </div>}
            </div>

            <div className="flex justify-center flex-grow">

            </div>

            <div className="flex items-center justify-end sm:space-x-2">
                {currentUser &&
                <>
                    <Image
                        onClick={goToUserProfile}
                        className="rounded-full cursor-pointer"
                        src={currentUser.avatar}
                        width={35}
                        height={35}
                        layout="fixed"/>
                    <p className="whitespace-nowrap font-semibold pr-3">
                        {currentUser.name}
                    </p>
                    <Link href={'/auth/signout'}>
                        <a className="nav-link">Sign out</a>
                    </Link>
                </>
                }
                {!currentUser &&
                <>
                    <Link href={'/auth/signup'}>
                        <a className="nav-link">Sign up</a>
                    </Link>
                    <Link href={'/auth/signin'}>
                        <a className="nav-link">Sign in</a>
                    </Link>
                </>
                }
            </div>
        </div>
    )
}

export default Header;
import Image from "next/image";

import Link from 'next/link';
import Router from "next/router";
import SearchBar from "./SearchBar";

function Header({currentUser}) {
    const goToUserProfile = () => {
        Router.push(`/user/${currentUser.id}`);
    }

    const goToHomePage = () => {
        Router.push('/')
    }

    return (
        <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
            <div className="flex items-center">
                <Image
                    className="cursor-pointer"
                    onClick={goToHomePage}
                    src="https://res.cloudinary.com/dwsbhnc1g/image/upload/v1630184633/ci71hrda4ntkbvugi8xe.png"
                    width={40}
                    height={40}
                    layout="fixed"
                />
                {currentUser &&
                <SearchBar />
                }
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
                    <p onClick={goToUserProfile}
                       className="whitespace-nowrap font-semibold pr-3 cursor-pointer">
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
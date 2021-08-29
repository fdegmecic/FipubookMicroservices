import Image from "next/image";
import {useEffect, useState} from "react";

function UserInformation ({currentUser, user}) {
    const [hideFollow, setHideFollow] = useState(true)

    useEffect(() => {
        if(currentUser.id === user.id) {
            setHideFollow(false)
        }
    }, [])

    return (
        <div className="bg-white p-2 rounded-2xl shadow-md
                         font-medium mt-6">
            <div className="flex space-x-4 p-4 items-center">
                <Image
                    width="300"
                    height="300"
                    className="rounded-full opacity-100"
                    src={user.avatar}
                />
            </div>
            <div className="flex justify-evenly p-3 border-t bg-gray-100">
                <p >About</p>
            </div>
            <div className="flex justify-evenly p-3 border-t">
                <p>Name:</p>
                <p>{user.name}</p>
            </div>
            {hideFollow && <div className="flex justify-between items-center rounded-b2xl bg-white shadow-md
            text-gray-400 border-t">
                <div className="inputIcon rounded-none rounded-bl-2xl bg-blue-200">
                    <p className="sm:text-base">Follow</p>
                </div>
                <div className="inputIcon rounded-none rounded-br-2xl bg-red-200">
                    <p className="sm:text-base">Unfollow</p>
                </div>
            </div>}
        </div>
    )
}

export default UserInformation
import Image from "next/image";
import {useEffect, useState} from "react";
import useRequestNoErrors from "../hooks/use-request-no-errors";
import axios from "axios";

function UserInformation({currentUser, user}) {
    const [hideFollow, setHideFollow] = useState(true)
    const [followedStatus, setFollowedStatus] = useState(false)

    const followUser = async () => {
        const {doRequest} = useRequestNoErrors({
            url: `/api/followers/${user.id}`,
            method: 'post'
        })

        await doRequest()
        setFollowedStatus(true)
    }

    const unFollowUser = async() => {
        const {doRequest} = useRequestNoErrors({
            url: `/api/followers/${user.id}`,
            method: 'delete'
        })

        await doRequest()
        setFollowedStatus(false)
    }

    useEffect(async () => {

        const {data} = await axios.get('/api/followers')

        data.map(follower => {
            if (follower.followingId === user.id) {
                setFollowedStatus(true)
            }
        })
        setHideFollow(true)
        if (currentUser.id === user.id) {
            setHideFollow(false)
        }
    }, [followedStatus, user])

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
                <p>About</p>
            </div>
            <div className="flex justify-evenly p-3 border-t">
                <p>Name:</p>
                <p>{user.name}</p>
            </div>
            {hideFollow && <div className="flex justify-between items-center rounded-b2xl bg-white shadow-md
            text-gray-400 border-t">
                {followedStatus ?
                    <div onClick={unFollowUser} className="inputIcon rounded-none rounded-bl-2xl bg-red-200">
                        <button  className="sm:text-base">UnFollow</button>
                    </div>
                    :
                    <div onClick={followUser} className="inputIcon rounded-none rounded-bl-2xl bg-blue-200">
                        <button  className="sm:text-base">Follow</button>
                    </div>
                }
            </div>}
        </div>
    )
}

export default UserInformation
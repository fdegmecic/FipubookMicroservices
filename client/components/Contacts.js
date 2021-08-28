import {useEffect, useState} from "react";
import axios from "axios";
import Contact from "./Contact";

function Contacts({followers}) {
    const [realTimeFollowers, setRealTimeFollowers] = useState([]);

    useEffect(async () => {
        try {
            const {data} = await axios.get(`/api/followers`)

            setRealTimeFollowers(data)
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
            <div className="flex justify-between items-center text-gray-500
            mb-5">
                <h2 className="text-xl">Contacts</h2>
            </div>

            {realTimeFollowers ?
                realTimeFollowers?.map(follower => (
                    <Contact
                        key={follower.followingId}
                        src={follower.followingAvatar}
                        name={follower.followingName}
                    />))
                :
                followers.map(follower => (
                    <Contact
                        key={follower.followingId}
                        src={follower.followingAvatar}
                        name={follower.followingName}
                    />
                ))
            }
        </div>
    )
}

export default Contacts
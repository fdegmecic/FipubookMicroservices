import {useEffect, useState} from "react";
import axios from "axios";
import Contact from "./Contact";

function Contacts() {
    const [realTimeFollowers, setRealTimeFollowers] = useState([]);

    useEffect(async () => {
        const {data} = await axios.get('/api/followers');

        setRealTimeFollowers(data)
    }, [])

    return (
        <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
            {realTimeFollowers.length!==0 && <div className="flex justify-between items-center text-gray-500
            mb-5">
                <h2 className="text-xl">Contacts</h2>
            </div>}

            {realTimeFollowers?.map(follower => (
                <Contact
                    key={follower.followingId}
                    src={follower.followingAvatar}
                    name={follower.followingName}
                />
            ))}
        </div>
    )
}

export default Contacts
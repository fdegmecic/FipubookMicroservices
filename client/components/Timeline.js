import InputBox from "./InputBox";
import Posts from "./Posts";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";

function Timeline({currentUser}) {
    const [posts, setPosts] = useState([]);

    const callBack = useCallback((post) => setPosts(posts => [post, ...posts]), [posts])

    useEffect(async () => {
        const {data: postData} = await axios.get('/api/timeline');
        setPosts(postData)
    }, [])

    return (
        <div className="flex-grow h-screen pb-44 pt-6 mr-4
        xl:mr-40 overflow-y-auto scrollbar-hide">
            <div className="mx-auto mx-w-md md:max-w-lg lg:max-w-2xl">
                <InputBox currentUser={currentUser} callBack={callBack}/>
                <Posts currentUser={currentUser} posts={posts}/>
            </div>
        </div>
    )
}

export default Timeline
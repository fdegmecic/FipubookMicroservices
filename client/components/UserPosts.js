import {useEffect, useState} from "react";
import axios from "axios";
import Post from "./Post";

function UserPosts({posts}) {
    const [realTimePosts, setRealTimePosts] = useState([]);

    useEffect(async () => {
        //TODO drugi api
        const {data} = await axios.get('/api/posts');

        setRealTimePosts(data)
    }, [])

    return (
        <div>
            {realTimePosts ?
                realTimePosts.map(post => (
                    <Post created={post.created}
                          key={post.id}
                          postText={post.postText}
                          postUrl={post.postUrl}
                          user={post.userName}
                          userAvatar={post.userAvatar}
                    />
                )) :
                posts.map(post => (
                    <Post created={post.created}
                          key={post.id}
                          postText={post.postText}
                          postUrl={post.postUrl}
                          user={post.userName}
                          userAvatar={post.userAvatar}
                    />
                ))}
        </div>
    );
}
export default UserPosts
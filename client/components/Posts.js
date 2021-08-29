import Post from "./Post";
import axios from "axios";
import {useEffect, useState} from "react";

function Posts({currentUser, posts}) {
    const [realTimePosts, setRealTimePosts] = useState([]);

    useEffect(async () => {
        const {data} = await axios.get('/api/posts');

        setRealTimePosts(data)
    }, [])

    const getLikesForPost = (postLikes, postId) => {
        return postLikes.filter(likes => (
            likes.post === postId
        ))
    }

    return (
        <div>
            {realTimePosts ?
                realTimePosts.map(post => (
                    <Post created={post.created}
                          key={post.id}
                          postId={post.id}
                          postText={post.postText}
                          postUrl={post.postUrl}
                          postLikes={getLikesForPost(post.postLikes, post.id)}
                          userId={post.userId}
                          userName={post.userName}
                          userAvatar={post.userAvatar}
                          currentUser={currentUser}
                    />))
                :
                posts.map(post => (
                    <Post created={post.created}
                          key={post.id}
                          postId={post.id}
                          postText={post.postText}
                          postUrl={post.postUrl}
                          postLikes={getLikesForPost(post.postLikes, post.id)}
                          userId={post.userId}
                          userName={post.userName}
                          userAvatar={post.userAvatar}
                          currentUser={currentUser}
                    />
                ))
            }
        </div>
    );
}

export default Posts;
import Post from "./Post";

function Posts({currentUser, posts}) {
    const getLikesForPost = (postLikes, postId) => {
        return postLikes?.filter(likes => (
            likes.post === postId
        ))
    }

    return (
        <div>
            {posts.map(post => (
                <Post created={post.created}
                      key={post.id}
                      postId={post.id}
                      postText={post.postText}
                      postUrl={post.postImage}
                      postLikes={getLikesForPost(post.postLikes, post.id)}
                      userId={post.userId}
                      userName={post.userName}
                      userAvatar={post.userAvatar}
                      currentUser={currentUser}
                />))}
        </div>
    );
}

export default Posts;
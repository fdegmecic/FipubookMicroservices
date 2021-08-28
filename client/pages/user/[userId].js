import Image from "next/image";
import UserTimeline from "../../components/UserTimeline";

const UserProfile = ({user, posts}) => {
    return (
        <div>
            <h1>{user.name}</h1>
            <Image
                width="200"
                height="200"
                src={user.avatar}
            />
            <UserTimeline posts={posts}/>
        </div>
    )
}

UserProfile.getInitialProps = async(context, client) =>{
    const {userId} = context.query;
    const {data: userData} = await client.get(`/api/users/${userId}`);
    const {data: postsData} = await client.get('/api/posts/');

    return {
        user:userData,
        posts:postsData
    };
}

export default UserProfile
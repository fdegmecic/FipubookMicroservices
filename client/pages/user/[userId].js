import UserTimeline from "../../components/UserTimeline";
import UserFollowers from "../../components/UserFollowers";
import UserInformation from "../../components/UserInformation";

const UserProfile = ({user, posts, currentUser}) => {
    return (
        <main className="flex mt-10 ml-20">
            <div className="mt-10">
                <div className="p-2 max-w-[600px] pr-6">
                    <div className="mx-auto mx-w-md md:max-w-lg lg:max-w-2x">
                        <UserInformation currentUser={currentUser} user={user}/>
                    </div>
                </div>
            </div>
            <UserTimeline currentUser={currentUser} posts={posts}/>
            <UserFollowers userId={user.id}/>
        </main>
    )
}

UserProfile.getInitialProps = async (context, client) => {
    const {userId} = context.query;
    const {data: userData} = await client.get(`/api/users/${userId}`);
    const {data: postsData} = await client.get(`/api/posts/${userId}`);

    return {
        user: userData,
        posts: postsData,
    };
}

export default UserProfile
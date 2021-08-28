import Timeline from "../components/Timeline";
import Contacts from "../components/Contacts";

function LandingPage({currentUser, posts, followers}) {
    return (
        <div className="h-screen bg-gray-100 overflow-hidden">
            <main className="flex">
                <Timeline currentUser={currentUser} posts={posts} />
                <Contacts followers={followers}/>
            </main>
        </div>
    )
}

LandingPage.getInitialProps = async (context, client) => {
    const {data : postsData} = await client.get('/api/posts');
    const {data: followersData} = await client.get('/api/followers')

    return {
        posts: postsData,
        followers: followersData
    }
}

export default LandingPage
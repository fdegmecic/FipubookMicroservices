import Timeline from "../components/Timeline";
import Contacts from "../components/Contacts";

function LandingPage({currentUser, posts}) {
    return (
        <div className="h-screen bg-gray-100 overflow-hidden">
            <main className="flex">
                <Timeline currentUser={currentUser} posts={posts} />
                <Contacts/>
            </main>
        </div>
    )
}

LandingPage.getInitialProps = async (context, client) => {
    const {data : postsData} = await client.get('/api/posts');

    return {
        posts: postsData,
    }
}

export default LandingPage
import InputBox from "./InputBox";
import Posts from "./Posts";

function Timeline({currentUser, posts}) {
    return (
        <div className="flex-grow h-screen pb-44 pt-6 mr-4
        xl:mr-40 overflow-y-auto scrollbar-hide">
            <div className="mx-auto mx-w-md md:max-w-lg lg:max-w-2xl">
                <InputBox currentUser={currentUser}/>{/*
                <Posts currentUser={currentUser} posts={posts}/>*/}
            </div>
        </div>
    )
}

export default Timeline
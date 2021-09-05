import Timeline from "../components/Timeline";
import Contacts from "../components/Contacts";
import SignIn from "./auth/signin";

function LandingPage({currentUser}) {
    if(!currentUser){
        return <SignIn />
    }

    return (
        <div className="h-screen bg-gray-100 overflow-hidden">
            <main className="flex">
                <Timeline currentUser={currentUser} />
                <Contacts userId={currentUser.id} />
            </main>
        </div>
    )
}

export default LandingPage
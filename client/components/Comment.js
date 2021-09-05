import Image from "next/image";
import Router from "next/router";

function Comment({commentText, userAvatar, userId}) {
    const goToUserProfile = () => {
        Router.push(`/user/${userId}`);
    }

    return (
        <div className="flex space-x-4 p-4 items-center border border-3 rounded-pill bg-gray-100">
            <Image
                onClick={goToUserProfile}
                className="rounded-full cursor-pointer"
                src={userAvatar}
                width={25}
                height={25}
                layout="fixed"/>
            <div>
                <p>{commentText}</p>
            </div>
        </div>
    )
}

export default Comment
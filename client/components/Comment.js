import Image from "next/image";

function Comment({commentText, userAvatar}) {
    return (
        <div className="flex space-x-4 p-4 items-center border border-3 rounded-pill bg-gray-100">
            <Image
                className="rounded-full cursor-pointer"
                src={userAvatar}
                width={25}
                height={25}
                layout="fixed"/>
            <div className="flex flex-1">
                <p className="bg-gray-100">{commentText}</p>
            </div>
        </div>
    )
}

export default Comment
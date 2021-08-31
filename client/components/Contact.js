import Image from "next/image";
import Router from "next/router";

function Contact({followerId, src, name}) {
    const goToUserProfile = () => {
        Router.push(`/user/${followerId}`);
    }

    return (
        <div className="flex items-center space-x-3 mb-2 relative
            hover:bg-gray-200 cursor-pointer p-2 rounded-xl">
            <Image
                onClick={goToUserProfile}
                className="rounded-full"
                objectFit="cover"
                src={src}
                width={50}
                height={50}
                layout='fixed'
            />
            <p>{name}</p>
        </div>
    )
}

export default Contact
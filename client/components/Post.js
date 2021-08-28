import Image from "next/image";
import {ChatAltIcon, ThumbUpIcon} from "@heroicons/react/solid";

function Post({created, postText, postUrl, user, userAvatar}) {
    return (
        <div className="flex flex-col">
            <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
                <div className="flex items-center space-x-2">
                    <Image
                        className="rounded-full"
                        objectFit="cover"
                        src={userAvatar}
                        width={35}
                        height={35}
                        alt=""
                    />
                    <div>
                        <p className="font-medium">{user}</p>
                        {created ? (
                            <p className="text-xs text-gray-400">
                                {new Date(created).toLocaleString()}
                            </p>
                        ) : (
                            <p className="text-xs text-gray-400">
                                Loading
                            </p>
                        )}
                    </div>
                </div>

                <p className="pt-4">{postText}</p>
            </div>

            {postUrl && (
                <div className='relative h-56 md:h-96 bg-white'>
                    <Image src={postUrl}
                           objectFit='cover'
                           layout='fill'
                    />
                </div>
            )}

            <div className="flex justify-between items-center rounded-b2xl bg-white shadow-md
            text-gray-400 border-t">
                <div className="inputIcon rounded-none rounded-bl-2xl">
                    <ThumbUpIcon className="h-4"/>
                    <p className="text-xs sm:text-base">Like</p>
                </div>
                <div className="inputIcon rounded-none rounded-br-2xl">
                    <ChatAltIcon className="h-4"/>
                    <p className="text-xs sm:text-base">Comment</p>
                </div>
            </div>
        </div>
    )
}

export default Post;
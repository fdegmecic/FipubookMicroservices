import Image from "next/image";
import {ChatAltIcon, ThumbUpIcon} from "@heroicons/react/solid";
import {useEffect, useState} from "react";
import Router from "next/router";
import useRequestNoErrors from "../hooks/use-request-no-errors";

function Post({created, postId, postText, postLikes, postUrl, userId, userName, userAvatar, currentUser}) {
    const [likedStatus, setLikedStatus] = useState(false);

    const likePost = async () => {
        const {doRequest} = useRequestNoErrors({
            url: `/api/posts/like/${postId}`,
            method: 'patch',
        })

        await doRequest();
    }

    const unLikePost = async () => {
        const {doRequest} = useRequestNoErrors({
            url: `/api/posts/like/${postId}`,
            method: 'delete',
        })

        await doRequest();
    }

    const goToUserProfile = () => {
        Router.push(`/user/${userId}`);
    }

    const maybePluralize = (count, noun, suffix = 's') =>
        `${count} ${noun}${count !== 1 ? suffix : ''}`;

    useEffect(() => {
        postLikes.map(postLike => {
            if (postLike.userId === currentUser.id) {
                setLikedStatus(true)
            }
        })
    }, [postLikes])

    return (
        <div className="flex flex-col">
            <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
                <div className="flex items-center space-x-2">
                    <Image
                        onClick={goToUserProfile}
                        className="rounded-full cursor-pointer"
                        objectFit="cover"
                        src={userAvatar}
                        width={35}
                        height={35}
                        alt=""
                    />
                    <div>
                        <p className="font-medium">{userName}</p>
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
            {postLikes.length !== 0 && (
                <div className="flex items-center rounded-b2xl bg-white shadow-md
                    text-blue-500 border-t">
                    <div className="justify-start inputIcon rounded-none rounded-bl-2xl">
                        <ThumbUpIcon className="h-4"/>
                        <p className="text-xs sm:text-base">
                            {`${maybePluralize(postLikes.length, "like")}`}
                        </p>
                    </div>
                    <div className="justify-end inputIcon rounded-none rounded-br-2xl">
                        <ChatAltIcon className="h-4"/>
                        <p className="text-xs sm:text-base">{`comments`}</p>
                    </div>
                </div>
            )}
            <div className="flex justify-between items-center rounded-b2xl bg-white shadow-md
            text-gray-400 border-t">
                {likedStatus ?
                    (
                        <div onClick={unLikePost}
                             className="text-blue-400 disabled inputIcon rounded-none rounded-bl-2xl
                             hover:text-red-400">
                            <ThumbUpIcon className="h-4"/>
                            <p className="text-xs sm:text-base">Unlike</p>
                        </div>
                    ) : (
                        <div onClick={likePost}
                             className="inputIcon rounded-none rounded-bl-2xl">
                            <ThumbUpIcon className="h-4"/>
                            <p className="text-xs sm:text-base">Like</p>
                        </div>
                    )}
                <div className="inputIcon rounded-none rounded-br-2xl">
                    <ChatAltIcon className="h-4"/>
                    <p className="text-xs sm:text-base">Comment</p>
                </div>
            </div>
        </div>
    )
}

export default Post;
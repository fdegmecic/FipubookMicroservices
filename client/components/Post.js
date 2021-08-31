import Image from "next/image";
import {ChatAltIcon, ThumbUpIcon} from "@heroicons/react/solid";
import {useCallback, useEffect, useState} from "react";
import Router from "next/router";
import useRequestNoErrors from "../hooks/use-request-no-errors";
import CommentSection from "./CommentSection";
import axios from "axios";

function Post({created, postId, postText, postLikes, postUrl, userId, userName, userAvatar, currentUser}) {
    const [likedStatus, setLikedStatus] = useState(false);
    const [commentsSize, setCommentsSize] = useState([]);
    const [postLikesSize, setPostLikesSize] = useState(postLikes?.length);
    const [commentSectionShow, setCommentSectionShow] = useState(false)
    const [reload, setReload] = useState(false);

    const likePost = async () => {
        const {doRequest} = useRequestNoErrors({
            url: `/api/posts/like/${postId}`,
            method: 'patch',
        })
        setLikedStatus(!likedStatus)
        setPostLikesSize(postLikesSize + 1)
        await doRequest();
    }

    const unLikePost = async () => {
        const {doRequest} = useRequestNoErrors({
            url: `/api/posts/like/${postId}`,
            method: 'delete',
        })
        setLikedStatus(!likedStatus)
        setPostLikesSize(postLikesSize - 1)
        await doRequest();
    }

    const goToUserProfile = () => {
        Router.push(`/user/${userId}`);
    }

    const showCommentSection = () => {
        setCommentSectionShow(!commentSectionShow)
    }

    const maybePluralize = (count, noun, suffix = 's') => {
        if (count === 0) {
            return `0 ${noun}${suffix}`
        }
        return `${count} ${noun}${count !== 1 ? suffix : ''}`;
    }

    const callBack = useCallback(async () => {
        const {data} = await axios.get(`/api/comments/${postId}`)
        setCommentsSize(data.length)
        setReload(true)
    }, [reload])

    useEffect(async () => {
        postLikes.map(postLike => {
            if (postLike.userId === currentUser?.id) {
                setLikedStatus(true)
            }
        })
    }, [])

    return (
        <div className="flex flex-col">
            <div className="p-5 bg-white mt-2 rounded-t-2xl shadow-sm border border-2">
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
            {(postLikesSize !== 0 || commentsSize !== 0) && (
                <div className="flex items-center rounded-b2xl bg-white shadow-md border-t">
                    {(postLikesSize !== 0 ? (
                        <div className="justify-start inputIcon rounded-none rounded-bl-2xl text-blue-500">
                            <ThumbUpIcon className="h-4"/>
                            <p className="text-xs sm:text-base">
                                {`${maybePluralize(postLikesSize, "like")}`}
                            </p>
                        </div>
                    ) : (
                        <div className="justify-start inputIcon rounded-none rounded-bl-2xl text-gray-400">
                            <ThumbUpIcon className="h-4"/>
                            <p className="text-xs sm:text-base">
                                {`${maybePluralize(postLikesSize, "like")}`}
                            </p>
                        </div>
                    ))}
                    {commentsSize !== 0 ?
                        <div className="justify-end inputIcon rounded-none rounded-br-2xl text-blue-500">
                            <ChatAltIcon className="h-4"/>
                            <p className="text-xs sm:text-base">{`${maybePluralize(commentsSize, "comment")}`}</p>
                        </div>
                        :
                        <div className="justify-end inputIcon rounded-none rounded-br-2xl text-gray-400">
                            <ChatAltIcon className="h-4"/>
                            <p className="text-xs sm:text-base">{`${maybePluralize(commentsSize, "comment")}`}</p>
                        </div>
                    }
                </div>
            )}
            <div className="flex justify-between items-center rounded-b2xl bg-white shadow-md
            text-gray-400 border-t">
                {likedStatus ?
                    (
                        <div onClick={unLikePost}
                             className="text-blue-400 inputIcon rounded-none rounded-bl-2xl
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
                <div onClick={showCommentSection}
                     className="inputIcon rounded-none rounded-br-2xl">
                    <ChatAltIcon className="h-4"/>
                    <p className="text-xs sm:text-base">Comment</p>
                </div>
            </div>
            <CommentSection
                commentSectionShow={commentSectionShow}
                currentUser={currentUser}
                postId={postId}
                userId={userId}
                callBack={callBack}
            />
        </div>
    )
}

export default Post;
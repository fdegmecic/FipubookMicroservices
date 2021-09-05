import Image from "next/image";
import {ChatAltIcon, ThumbUpIcon, PencilAltIcon} from "@heroicons/react/solid";
import {useCallback, useEffect, useRef, useState} from "react";
import Router from "next/router";
import useRequestNoErrors from "../hooks/use-request-no-errors";
import CommentSection from "./CommentSection";

function Post({created, postId, postText, postLikes, postUrl, userId, userName, userAvatar, currentUser}) {
    const [likedStatus, setLikedStatus] = useState(false);
    const [commentsSize, setCommentsSize] = useState(0);
    const [postLikesSize, setPostLikesSize] = useState(postLikes?.length);
    const [commentSectionShow, setCommentSectionShow] = useState(false)
    const [showUpdateInputBar, setShowUpdateInput] = useState(false);
    const [updateText, setUpdateText] = useState('');
    const inputRef = useRef(null);
    const [postTextFromUpdate, setPostTextFromUpdate] = useState(postText);

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

    const updatePost = async (e) => {
        e.preventDefault();

        if (!inputRef.current.value) {
            return;
        }

        const {doRequest} = useRequestNoErrors({
            url: `/api/posts/${postId}`,
            method: 'patch',
            body: {
                updateText,
            },
            onSuccess: (post) => setPostTextFromUpdate(post.postText)
        })

        inputRef.current.value = "";
        await doRequest();
        setShowUpdateInput(!showUpdateInputBar)
    }

    const goToUserProfile = () => {
        Router.push(`/user/${userId}`);
    }

    const showCommentSection = () => {
        setCommentSectionShow(!commentSectionShow)
    }

    const showUpdateInput = () => {
        setShowUpdateInput(!showUpdateInputBar)
    }

    const maybePluralize = (count, noun, suffix = 's') => {
        if (count === 0) {
            return `0 ${noun}${suffix}`
        }
        return `${count} ${noun}${count !== 1 ? suffix : ''}`;
    }

    const callBack = useCallback((commentCallback) => {
        setCommentsSize(commentCallback)
    }, [commentsSize])

    useEffect(async () => {
        postLikes.map(postLike => {
            if (postLike.userId === currentUser?.id) {
                setLikedStatus(true)
            }
        })
    }, [])

    return (
        <div className="flex flex-col">
            <div className="p-5 bg-white mt-2 rounded-t-2xl shadow-sm border border-2 items-center">
                <div className="flex space-x-2">
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
                <div className="flex flex-row justify-content-between">
                    {showUpdateInputBar ?
                        <div>
                            <form className="flex flex-1">
                                <input
                                    className="rounded-full h-12 bg-gray-100
                                                flex-grow px-5 focus:outline-none"
                                    type="text"
                                    ref={inputRef}
                                    onChange={(e) => setUpdateText(e.target.value)}/>
                                <button hidden type="submit" onClick={updatePost}>
                                    Submit
                                </button>
                            </form>
                        </div>
                        :
                        <p className="pt-4">{postTextFromUpdate}</p>}
                    {userId === currentUser.id &&
                    <div className="filter hover:brightness-110
                    transition duration-150 transform hover:scale-105 cursor-pointer"
                         onClick={showUpdateInput}>
                        <PencilAltIcon className="h-7"/>
                    </div>}
                </div>
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
                                0 likes
                            </p>
                        </div>
                    ))}
                    {(commentsSize !== 0 ?
                            (<div className="justify-end inputIcon rounded-none rounded-br-2xl text-blue-500">
                                <ChatAltIcon className="h-4"/>
                                <p className="text-xs sm:text-base">{`${maybePluralize(commentsSize, "comment")}`}</p>
                            </div>)
                            :
                            (<div className="justify-end inputIcon rounded-none rounded-br-2xl text-gray-400">
                                <ChatAltIcon className="h-4"/>
                                <p className="text-xs sm:text-base">0 comments</p>
                            </div>)
                    )}
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
                callBack={callBack}
            />
        </div>
    )
}

export default Post;
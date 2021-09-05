import Image from "next/image";
import useRequestNoErrors from "../hooks/use-request-no-errors";
import {useEffect, useRef, useState} from "react";
import Comment from "./Comment";
import axios from "axios";

function CommentSection({commentSectionShow, currentUser, postId, callBack}) {
    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState([])
    const inputRef = useRef(null);

    const sendComment = async (e) => {
        e.preventDefault();

        if (!inputRef.current.value) {
            return;
        }

        const {doRequest} = useRequestNoErrors({
            url: `/api/comments/${postId}`,
            method: 'post',
            body: {commentText},
            onSuccess: (comment) => setComments(comments => [...comments, comment])
        })

        inputRef.current.value = "";
        await doRequest();
    }

    useEffect(async () => {
            const {data} = await axios.get(`/api/comments/${postId}`)
            callBack(comments.length);
            setComments(data)
    }, [])

    useEffect(async () => {
        callBack(comments.length);
    }, [comments])

    return (
        <div>
            {commentSectionShow && (
                <div className="bg-white border border-2">
                    <div className="flex space-x-4 p-4 items-center">
                        <Image
                            className="rounded-full cursor-pointer"
                            src={currentUser.avatar}
                            width={35}
                            height={35}
                            layout="fixed"/>
                        <form className="flex flex-1">
                            <input
                                className="rounded-full h-12 bg-gray-100
                    flex-grow px-5 focus:outline-none"
                                type="text"
                                ref={inputRef}
                                onChange={(e) => setCommentText(e.target.value)}/>
                            <button hidden type="submit" onClick={sendComment}>
                                Submit
                            </button>
                        </form>
                    </div>
                    <div>
                        {comments.map(comment => (
                            <Comment
                                key={comment.id}
                                commentText={comment.commentText}
                                userAvatar={comment.userAvatar}
                                userId={comment.userId}/>))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CommentSection
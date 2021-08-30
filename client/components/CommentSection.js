import Image from "next/image";
import useRequestNoErrors from "../hooks/use-request-no-errors";
import {useEffect, useRef, useState} from "react";
import Comment from "./Comment";
import axios from "axios";

function CommentSection({commentSectionShow, currentUser, postId, userId}) {
    const [commentText, setComment] = useState('')
    const [comments, setComments] = useState('')
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
        })

        inputRef.current.value = "";
        await doRequest()
    }

    useEffect(async () => {
        const {data} = await axios.get(`/api/comments/${postId}`)

        setComments(data)
    }, [])

    return (
        <div>
            {commentSectionShow && (
                <div>
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
                                onChange={(e) => setComment(e.target.value)}/>
                            <button hidden type="submit" onClick={sendComment}>
                                Submit
                            </button>
                        </form>
                    </div>
                    <div >
                        {comments.map(comment => (
                            <Comment commentText={comment.commentText} currentUser={currentUser}/>))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CommentSection
import Image from "next/image";
import useRequestNoErrors from "../hooks/use-request-no-errors";
import {useEffect, useRef, useState} from "react";
import Comment from "./Comment";
import axios from "axios";

function CommentSection({commentSectionShow, currentUser, postId, userId, callBack}) {
    const [commentText, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [render, setRender] = useState(false)
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
        await doRequest();
        setRender(true);
        callBack();
    }

    useEffect(async () => {
        const {data} = await axios.get(`/api/comments/${postId}`)

        setComments(data)
        setRender(false)
    }, [render])

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
                                onChange={(e) => setComment(e.target.value)}/>
                            <button hidden type="submit" onClick={sendComment}>
                                Submit
                            </button>
                        </form>
                    </div>
                    <div >
                        {comments.map(comment => (
                            <Comment key={comment.id} commentText={comment.commentText} userAvatar={comment.userAvatar}/>))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CommentSection
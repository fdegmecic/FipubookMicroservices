import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {CameraIcon} from "@heroicons/react/solid";
import useRequest from "../hooks/use-request";
import Router from "next/router";
import Posts from "./Posts";
import axios from "axios";

const FormData = require('form-data');

function InputBox({currentUser}) {
    const inputRef = useRef(null);
    const filePickerRef = useRef(null);
    const [imageToPost, setImageToPost] = useState('');
    const [imageToDisplay, setImageToDisplay] = useState('');
    const [postText, setPostText] = useState('');
    const [render, setRender] = useState(false)

    const formDataPost = new FormData()
    formDataPost.append("postText", postText)
    formDataPost.append("userName", currentUser.name)
    formDataPost.append("userAvatar", currentUser.avatar)
    formDataPost.append("image", imageToPost)

    const {doRequest} = useRequest({
        url: '/api/posts',
        method: 'post',
        body: formDataPost,
    })

    const sendPost =async  (e) => {
        e.preventDefault();

        if (!inputRef.current.value) {
            return;
        }

        inputRef.current.value = "";
        await doRequest()
        removeImage()
        setRender(true)
    }

    const addImageToPost = (e) => {
        setImageToPost(e.target.files[0])

        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setImageToDisplay(readerEvent.target.result);
        }
    }

    const removeImage = () => {
        setImageToDisplay(null);
        setImageToPost(null);
    }

    const goToUserProfile = () => {
        Router.push(`/user/${currentUser.id}`);
    }

    const [realTimePosts, setRealTimePosts] = useState([]);

    useEffect(async () => {
        const {data} = await axios.get('/api/posts');

        setRealTimePosts(data)
        setRender(false)
    }, [render])

    return (
        <div className="bg-white p-2 rounded-2xl shadow-md
        text-gray-500 font-medium mt-6">
            <div className="flex space-x-4 p-4 items-center">
                <Image
                    onClick={goToUserProfile}
                    className="rounded-full cursor-pointer"
                    src={currentUser.avatar}
                    width={50}
                    height={50}
                    layout="fixed"/>

                <form className="flex flex-1" onSubmit={sendPost}>
                    <input
                        className="rounded-full h-12 bg-gray-100
                    flex-grow px-5 focus:outline-none"
                        type="text"
                        ref={inputRef}
                        onChange={(e) => setPostText(e.target.value)}
                        placeholder={`What's on your mind, ${currentUser.name}?`}/>
                    <button hidden type="submit" onClick={sendPost}>
                        Submit
                    </button>
                </form>
                {imageToDisplay && (
                    <div onClick={removeImage} className="flex flex-col filter hover:brightness-110
                    transition duration-150 transform hover:scale-105 cursor-pointer">
                        <img className="h-10" src={imageToDisplay} alt=""/>
                        <p className="text-xs text-red-500 text-center">Remove</p>
                    </div>
                )}
            </div>
            <div className="flex justify-evenly p-3 border-t">
                <div onClick={() => filePickerRef.current.click()} className="inputIcon">
                    <CameraIcon className="h-7 text-green-400 "/>
                    <p className="text-xs sm:text-sm xl:text-base">
                        Upload a photo
                    </p>
                    <input
                        type="file"
                        ref={filePickerRef}
                        onChange={addImageToPost}
                        hidden/>
                </div>
            </div>
            <Posts currentUser={currentUser} posts={realTimePosts}/>
        </div>
    )
}

export default InputBox;
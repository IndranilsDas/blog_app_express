
'use client';
import React, { ReactEventHandler } from "react";
import { FaImage } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa";
import { raleway } from "@/lib/fonts";

const createBlog = () =>{
    const [title, settitle] = React.useState('')
    const [tagline,settagline] = React.useState('')
    const [body,setbody] = React.useState('')
    const [imgURL, setimgURL] = React.useState('')
    const [img,setimg] = React.useState<File|null>(null)
    const [imgname,setimgname] = React.useState('')
    
    const HandleImage=async(e:React.ChangeEvent<HTMLInputElement>)=>{
    const img_file = e.target.files?.[0] ?? null
    
    if(img_file){
    setimgURL(URL.createObjectURL(img_file))
    setimg(img_file)
    setimgname(img_file.name)
    }
    }

    return (<div className={`${raleway.className} h=screen w-screen flex flex-col justify-center items-center`}>
    <form className="flex flex-col gap-2 h-4/5 w-4/5 px-6 py-6 ring" action="">
        <h1 className="text-[1.7rem]">create</h1>
        <label htmlFor="title">title</label>
        <input id="title" className="outline-none rounded-lg border border-gray-800 px-2 py-1" type="text" />
        <label htmlFor="tagline">tagline</label>
        <input id="tagline" className="outline-none rounded-lg border border-gray-800 px-2 py-1" type="text" />
        <div className="flex justify-evenly">
        <label htmlFor="img" className="text-center py-1 ring-[0.03rem] rounded-lg w-2/6 hover:bg-zinc-800/30 hover:text-white/70 transition-colors duration-200">Choose Image</label>
        <div className='w-2/6 flex items-center justify-center text-sm'>
            <h1 className='truncate'>{imgname.split('.')[0]}</h1><h1 className=''>{'.'+imgname.split('.')[1]}</h1>
            </div>
        </div>
        <div className="flex items-center justify-center h-[20rem]">
        {
            imgURL ? (<img className="bg-fit h-[20rem]" src={imgURL} alt="" />) : <FaRegImage className="text-[3rem]"/>
        }
        </div>
        <input id="img" onChange={HandleImage} className="hidden" type="file" />
        <label htmlFor="body">content</label>
        <textarea name="" className="outline-none rounded-lg border border-gray-800 px-2 py-1" id="body"></textarea>
    </form>
    </div>)


}

export default createBlog
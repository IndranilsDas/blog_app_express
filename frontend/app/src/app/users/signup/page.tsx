'use client';
import React, { useEffect } from 'react'
import axios from 'axios';
import { raleway } from '../../../lib/fonts';
import { CiUser } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { log } from 'node:console';
import { useAuth } from '@/lib/authcontext';


const page = () => {

  const base_url = 'http://localhost:8000'

  const [username,setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [profileImg, setProfileImg] = React.useState<File | null>(null)
  const [previewURL, setPreviewURL] = React.useState<string | null>(null)
  const [previewName, setpreviewName] = React.useState('No image selected.');
  const [loading, setLoading] = React.useState(false)

  const auth = useAuth()
  
  useEffect(()=>{console.log(auth?.user,"auth.user");
    console.log(localStorage.getItem('token'),"inside signup useefftct",
    localStorage.getItem('user'));
    
  },[])

  const handleProfilePic = (e:React.ChangeEvent<HTMLInputElement>) =>{
console.log(e,"E.")
    const file = e.target.files?.[0] ?? null;

    if(file){
    setPreviewURL(URL.createObjectURL(file))
    setpreviewName(file?.name ?? 'No image selected.')
    setProfileImg(file)
    console.log(file)
  }
    
  }
  const handleRegister= async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!loading){
      console.log(username,password,email,profileImg);
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (profileImg){
      formData.append('profile_picture', profileImg);
    }
      
    const response = await axios.post(`${base_url}/register`,formData)
    console.log(response.data,"response.data:");
    console.log(response.data['token'])

    if(response.status === 201){
      let userObj = {id:Number(response.data.user['id']),username:response.data.user['username']} 
      auth?.login(response.data['token'],userObj)
    }
    }
  
  }
  return (
    <div>
        <div className={`${raleway.className} relative h-screen bg-[url("/images/paint_liquid.jpg")] w-screen bg-cover`}>
        <div className='backdrop-blur-xl bg-zinc-300/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-3/8 px-6 py-6 rounded-xl'>
        <h1 className="text-[1.7rem] py-4 font-bold">Register</h1>
            <form className="w-full flex flex-col gap-2 justify-center" action="" onSubmit={e=>handleRegister(e)}>
            <div className='flex justify-center items-center h-full bg-fit'>
              <div className='flex justify-center items-center h-[9rem] aspect-square ring rounded-full overflow-clip'>
                {previewURL ? (<img src={previewURL} alt="" />) 
                : (<CiUser className='text-[4rem] font-thin'/>)}
              </div>
            </div>

            
            <div className='py-2 flex gap-1 items-center justify-evenly'>
            <label htmlFor="prof_img" className='text-center py-1 ring-[0.03rem] rounded-lg w-2/6 hover:bg-zinc-800/30 hover:text-white/70 transition-colors duration-200'>Choose Photo</label>
            <div className='w-2/6 flex items-center text-sm'>
            <h1 className='truncate'>{previewName.split('.')[0]}</h1><h1 className=''>{'.'+previewName.split('.')[1]}</h1>
            </div>
            <input id='prof_img' onChange={handleProfilePic} type="file" className='hidden' />
            </div>
          

            <label className='font-semibold' htmlFor="username">username</label>
            <input id="username" value={username} onChange={(e)=>setUsername(e.target.value)} className="outline-none rounded-lg border border-gray-800 px-2 py-1" type="text" />

            <label className='font-semibold' htmlFor="email">email</label>
            <input id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="outline-none rounded-lg border border-gray-800 px-2 py-1" type="text" />

            <label className='font-semibold' htmlFor="password">password</label>
            <input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="outline-none rounded-lg border border-gray-800 px-2 py-1" type="password" />

            <div className='flex items-center justify-center w-full'>
              <button type="submit" className="w-5/6 rounded-xl text-lg ring ring-black my-8 py-1 hover:bg-gradient-to-r hover:from-gray-800/40 hover:to-black/50 hover:text-gray-300 transition-colors duration-200">Submit</button>
            </div>
        </form>
        <a className="hover:underline" href="">already a user?</a>
        </div>
        </div>

    </div>
  )
}

export default page
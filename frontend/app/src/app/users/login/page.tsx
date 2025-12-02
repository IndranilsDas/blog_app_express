'use client';
import React from "react";

const page = () =>{
    const [islocked, setislocked] = React.useState(false)
    const [iswait, setiswait] = React.useState(false)

function handleLogin(){
    if(!islocked){
    }
    else{
        return
    }

}

return(
    <div>
        <div className="relative h-screen w-screen">
            <div className="absolute flex flex-col  rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/7 px-6 py-6">
            <h1 className="text-[1.7rem] py-4 font-bold">Login</h1>
            <form className="w-full flex flex-col gap-2 justify-center" action="" onSubmit={handleLogin}>
            <label htmlFor="username">username</label>
            <input id="username" className="outline-none rounded border border-gray-800 px-2 py-1" type="text" />

            <label htmlFor="password">password</label>
            <input id="password" className="outline-none rounded border border-gray-800 px-2 py-1" type="password" />

            <button type="submit" className="rounded-lg ring my-8 py-1">Submit</button>

            </form>
            <a className="hover:underline" href="">new user?</a>

            </div>

        </div>
    </div>)

}

export default page
/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { MouseEventHandler, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../context/UserContext'
import { supabase } from '../lib/supabase'

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push('/');
    }
  };

  const handleSignInWithGoogle: MouseEventHandler = async (e) => {
    e.preventDefault();
  
    const { error } = await supabase.auth.signIn(
      {
        provider: 'google',
      },
      {
        redirectTo: 'http://localhost:3000/callback/',
      }
    );
  
    if (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <main>
      <div className="h-screen flex items-center justify-center ">
          <div className="max-w-lg  bg-[#1A161F] p-8 w-full">
            <h1 className="text-3xl font-semibold text-center text-white">
              Sign in to your account
            </h1>

            <div className='flex items-center gap-x-2 text-gray-500 pt-4 '>
              <div className='bg-gray-500 h-[1px] w-full'></div>
              <p>or</p>
              <div className="bg-gray-500 h-[1px] w-full"></div>
            </div>

            <button className='mt-10 text-lg text-white font-semibold bg-[#EC1C24] py-3 px-6 rounded-md flex  items-center w-full justify-center gap-x-2' onClick={handleSignInWithGoogle}>
              <FcGoogle />
              Sign in with google
            </button>

            <div className="flex flex-col p-4">
              <form className="flex flex-col" onSubmit={handleSignIn}>
                <label htmlFor="email" className="text-gray-200">
                  Email
                </label>
                <input
                  className="py-2 px-4 rounded-md focus:outline-none focus:ring-2 ring-[#EC1C24]"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password" className="mt-6 text-gray-200">
                  Password
                </label>
                <input
                  className="py-2 px-4 rounded-md focus:outline-none focus:ring-2 ring-[#EC1C24]"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className='text-gray-500 flex gap-2 pt-2'>
                  <p>Don't have an account?</p>
                  <span className='hover:underline'>
                      <Link href="/signup" > Click here</Link>

                  </span>

                </div>

                <button
                  className="mt-10 text-lg text-white font-semibold bg-[#EC1C24] py-3 px-6 rounded-md focus:outline-none focus:ring-2"
                  type="submit"
                >
                  Sign in with Email
                </button>
              </form>
            </div>
          </div>
        </div>
    </main>
    
  );
   
}

export default LoginPage
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { supabase } from '../lib/supabase';

const SignupPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            alert(JSON.stringify(error));
        } else {
            router.push('/login');
        }
    };
    return (
    <div className="h-screen flex items-center justify-center ">
      <div className="max-w-lg w-full bg-[#1A161F] p-8">
        <h1 className="text-3xl font-semibold text-center text-white">
          Create new account
        </h1>

        <form className="mt-2 flex flex-col p-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-gray-200">
            Email
          </label>
          <input
            className="py-2 px-4 rounded-md focus:outline-none focus:ring-2 ring-[#ec1c24]"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="mt-6 text-gray-200">
            Password
          </label>
          <input
            className="py-2 px-4 rounded-md focus:outline-none focus:ring-2 ring-[#ec1c24]"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='text-gray-500 flex gap-2 pt-2'>
            <p>Already have an account?</p>
            <span className='hover:underline'>
                <Link href="/login" > Click here</Link>

            </span>

          </div>

          <button
            className="mt-10 text-lg text-white font-semibold bg-[#EC1C24] py-3 px-6 rounded-md focus:outline-none focus:ring-2"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
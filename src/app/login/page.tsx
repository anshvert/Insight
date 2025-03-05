import React from 'react';
import { Github, Chrome } from 'lucide-react';
import { doSocialLogin } from "@/app/actions";

const LoginPage = () => {
    return (
        <form action={doSocialLogin}>
            <div
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4 py-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Welcome</h1>
                        <p className="text-gray-300 mb-12">Choose your preferred login method</p>
                    </div>

                    <div className="space-y-6">
                        <div
                            className="group transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        >
                            <button
                                className="w-full flex items-center justify-center
                                    bg-white bg-opacity-10 hover:bg-opacity-20
                                    border border-white border-opacity-20
                                    py-4 rounded-xl
                                    text-white
                                    transition-all duration-300
                                    hover:shadow-2xl hover:border-opacity-40"
                                    type={'submit'} name={'action'} value={'google'}
                            >
                                <Chrome className="mr-4 h-8 w-8 text-red-500 group-hover:animate-pulse"/>
                                <span className="text-lg font-semibold">
                                Continue with Google
                            </span>
                            </button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white border-opacity-20"></div>
                            </div>
                            <div className="relative flex justify-center">
                            <span className="px-4 bg-black text-gray-400 text-sm">
                                or
                            </span>
                            </div>
                        </div>

                        <div
                            className="group transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        >
                            <button
                                className="w-full flex items-center justify-center
                                    bg-white bg-opacity-10 hover:bg-opacity-20
                                    border border-white border-opacity-20
                                    py-4 rounded-xl
                                    text-white
                                    transition-all duration-300
                                    hover:shadow-2xl hover:border-opacity-40"
                                    type={'submit'} name={'action'} value={'github'}
                            >
                                <Github className="mr-4 h-8 w-8 text-white group-hover:animate-spin"/>
                                <span className="text-lg font-semibold">
                                Continue with GitHub
                            </span>
                            </button>
                        </div>
                    </div>

                    <div className="text-center text-gray-500 text-sm mt-8">
                        <p>Secure authentication powered by OAuth</p>
                    </div>
                </div>
            </div>
        </form>

    )
}

export default LoginPage;
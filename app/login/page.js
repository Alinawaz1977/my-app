"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { userAuthActoin } from "../actions/userAuthActions";
import axios from "axios";
import { AppContext } from "@/context/AppContext";

export default function AuthForm() {
    const { token, settoken } = useContext(AppContext)
    const [isLogin, setIsLogin] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        try {
            if (!isLogin) {
                try {
                    const response = await axios.post("/api/userSignup", data)
                    // settoken(response.data.token)
                    toast.success("succeed")
                    console.log(response.data.token);
                    
                } catch (error) {
                    toast.error(error.message)
                }

            } else {
                const formData = new FormData()
                formData.append("email", data.email)
                formData.append("password", data.password)
                userAuthActoin(formData)
                const response = await userAuthActoin(formData)
                if (response?.success) {
                    console.log(response.message);
                } else {
                    toast.error(response.message);
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {isLogin ? "Login to Your Account" : "Create a New Account"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Sign up includes username */}
                    {!isLogin && (
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-600">
                                Username
                            </label>
                            <input
                                type="text"
                                {...register("username", {
                                    required: !isLogin && "Username is required",
                                })}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
                    )}

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    {isLogin ? "New here?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 font-medium hover:underline"
                    >
                        {isLogin ? "Create an account" : "Login instead"}
                    </button>
                </p>
            </div>
        </div>
    );
}

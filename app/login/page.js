// pages/login.js
'use client'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    const onSubmit = async (data) => {
        setIsLoading(true);
        setLoginError(""); // Reset lỗi

        try {
            const response = await axios.post('/api/login', data);
            if (response.status === 200) {
                toast.success("Đăng nhập thành công");
                // Lưu token vào localStorage hoặc cookie
                localStorage.setItem('token', response.data.token);
                router.push('../'); // Chuyển hướng tới trang chủ hoặc trang cần thiết
            } else {
                setLoginError(response.data.message || "Đăng nhập thất bại");
                toast.error(response.data.message || "Đăng nhập thất bại");
            }
        } catch (error) {
            setLoginError("Có lỗi xảy ra trong quá trình đăng nhập");
            toast.error("Có lỗi xảy ra trong quá trình đăng nhập");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {loginError && <p className="text-red-500">{loginError}</p>}
                    <div>
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email là bắt buộc" })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div>
                        <label className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            {...register("password", { required: "Mật khẩu là bắt buộc" })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {isLoading ? "Loading..." : "Log in"}
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Dont have an account?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}

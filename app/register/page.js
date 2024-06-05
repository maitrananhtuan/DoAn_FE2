// pages/register.js
'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [registerError, setRegisterError] = useState("");

    const onSubmit = async (data) => {
        setIsLoading(true);
        setRegisterError("");

        try {
            const response = await axios.post('/api/register', data);
            if (response.status === 200) {
                toast.success("Đăng ký thành công");
                router.push('../login'); // Chuyển hướng sau khi đăng ký thành công
            } else {
                setRegisterError(response.data.message || "Đăng ký thất bại");
                toast.error(response.data.message || "Đăng ký thất bại");
            }
        } catch (error) {
            setRegisterError("Có lỗi xảy ra trong quá trình đăng ký");
            toast.error("Có lỗi xảy ra trong quá trình đăng ký");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {registerError && <p className="text-red-500">{registerError}</p>}
                    <div>
                        <label className="block text-gray-700">Name:</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>
                    <div>
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div>
                        <label className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}

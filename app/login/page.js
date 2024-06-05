"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();

    // useEffect(() => {
    //     if (router.query.error) {
    //         toast.error(router.query.error);
    //     }
    // }, [router.query.error]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        axios.post("/api/login", data).then((response) => {
            if (response.data.ok) {
                signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                }).then((callback) => {
                    if (callback?.ok) {
                        router.refresh();
                        toast.success("Logged in");
                    }
                    if (callback?.error) {
                        toast.error(callback.error);
                    }
                });
            } else {
                toast.error(response.data.error);
            }
        }).catch(() => {
            toast.error("Something went wrong");
        }).finally(() => {
            setIsLoading(false);
            router.push("../");
        });
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Email:
                    <input type="email" {...register("email")} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" {...register("password")} />
                </label>
                <br />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Log in"}
                </button>
            </form>
            <p>
                Dont have an account?
                <a href="/register">Sign up</a>
            </p>
        </>
    );
};

export default LoginForm;
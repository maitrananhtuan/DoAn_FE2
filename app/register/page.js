"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    // const router = useRouter();

    // useEffect(() => {
    //     if (router.query.error) {
    //         toast.error(router.query.error);
    //     }
    // }, [router.query.error]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        axios.post("/api/register", data).then(() => {
            toast.success("Account created successfully");
            signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback) => {
                if (callback?.ok) {
                    router.push("/");
                    router.refresh();
                    toast.success("Logged in");
                }
                if (callback?.error) {
                    toast.error(callback.error);
                }
            });
        }).catch(() => {
            toast.error("Something went wrong");
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Name:
                    <input type="text" {...register("name")} />
                </label>
                <br />
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
                    {isLoading ? "Loading..." : "Sign Up"}
                </button>
            </form>
            <p>
                Already have an account?
                <a href="/login">Log in</a>
            </p>
        </>
    );
};

export default RegisterForm;
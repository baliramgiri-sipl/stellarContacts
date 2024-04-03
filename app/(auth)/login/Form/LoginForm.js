"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validation";
import AppInput from "@/components/Inputs/AppInput";
import ErrorComp from "@/components/ErrorComp/ErrorComp";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { myAxios } from "@/lib/helpers";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { UPDATE_USER_ACCESS, UPDATE_USER_INFO } from "@/redux/authReducer/authReducer";
import { persistor } from "@/redux/store";
import { CircleUserRound, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const [customerror, setCustomerror] = useState(false)
    const [showPass, setShowPass] = useState(false);

    //hooks
    const dispatch = useDispatch()
    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange",
    });

    const onSubmit = async (value) => {
        setLoading(true)
        setCustomerror(false)
        try {
            const user = await signIn("credentials", { email: value?.email, password: value?.password, redirect: false })
            if (user.ok) {
                await myAxios.post('/auth/login', value).then(({ data }) => {
                    persistor.purge().then(() => {
                        setLoading(false)
                        //store info 
                        dispatch({ type: UPDATE_USER_INFO, payload: data.data })
                        dispatch({ type: UPDATE_USER_ACCESS, payload: data.data?.user_type_id })
                        window.location.href = "/contacts"
                    })
                })

            } else {
                setLoading(false)
                setCustomerror("Email or Password incorrect!")
            }

        } catch (error) {
            setLoading(false)
            setCustomerror(error?.response?.data.message || "Email or Password incorrect!")
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full  space-y-3 "
        >
            {customerror && <ErrorComp message={customerror} type={"error"} />}
            <AppInput
                type={"email"}
                endIcon={<CircleUserRound size={15} className="text-neutral-600" />}
                label={"Email"}
                required
                errors={errors}
                register={register}
                placeholder={"Enter Email"}
                name={"email"}
            />
            <AppInput
                type={showPass ? "text" : "password"}
                endIcon={
                    showPass ? (
                        <Eye
                            size={15}
                            onClick={() => setShowPass(false)}
                            className="text-neutral-600 cursor-pointer"
                        />
                    ) : (
                        <EyeOff
                            size={15}
                            onClick={() => setShowPass(true)}
                            className="text-neutral-600 cursor-pointer"
                        />
                    )
                }
                label={"Password"}
                required
                errors={errors}
                register={register}
                placeholder={"Enter Password"}
                name={"password"}
            />
            <div className="flex justify-end">
                <Link href={"/forget-password"} className='text-blue-600 text-xs mt-1 text-end'>Forget Password?</Link>
            </div>
            <Button className="w-full py-2 ">{loading ? <LoadingSpinner /> : "Login"}</Button>

        </form>
    );
};

export default LoginForm;

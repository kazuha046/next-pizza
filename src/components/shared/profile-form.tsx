"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import React from "react"
import {FormProvider, useForm} from "react-hook-form"
import {formRegisterSchema, TFormRegisterValues} from "@/constants/schemas"
import {User} from "@/generated/prisma/client"
import toast from "react-hot-toast"
import {signOut} from "next-auth/react"
import {Container} from "./container"
import {Title} from "./title"
import {FormInput} from "./form-input"
import {Button} from "../ui/button"
import {updateUserInfo} from "@/app/actions"

interface Props {
    data: User;
}

export const ProfileForm: React.FC<Props> = ({data}) => {
    const form = useForm({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            fullName: data.fullName,
            email: data.email,
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await updateUserInfo({
                email: data.email,
                fullName: data.fullName,
                password: data.password
            })

            toast.error("Data updated 📝", {
                icon: "✅"
            })
        } catch (error) {
            return toast.error("Error updating data", {
                icon: "❌"
            })
        }
    }

    const onClickSignOut = () => {
        signOut({
            callbackUrl: "/"
        }).then(() => console.log("Clicked"))
    }

    return (
        <Container className="my-10">
            <Title text={`Personal Data | #${data.id}`} size="md" className="font-bold"/>

            <FormProvider {...form}>
                <form className="flex flex-col gap-5 w-full max-w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput name="email" label="E-Mail" required/>
                    <FormInput name="fullName" label="Full Name" required/>

                    <FormInput type="password" name="password" label="New Password" required/>
                    <FormInput type="password" name="confirmPassword" label="Repeat Password" required/>

                    <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
                        Save
                    </Button>

                    <Button
                        onClick={onClickSignOut}
                        variant="secondary"
                        disabled={form.formState.isSubmitting}
                        className="text-base"
                        type="button"
                    >
                        Sign Out
                    </Button>
                </form>
            </FormProvider>
        </Container>
    )
}

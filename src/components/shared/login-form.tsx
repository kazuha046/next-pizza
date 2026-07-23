import {FormProvider, useForm} from "react-hook-form"
import {formLoginSchema, TFormLoginValues} from "@/constants/schemas"
import {zodResolver} from "@hookform/resolvers/zod"
import {Title} from "./title"
import {FormInput} from "./form-input"
import {Button} from "../ui/button"
import toast from "react-hot-toast"
import {signIn} from "next-auth/react"
import Image from "next/image"

interface Props {
    onClose?: VoidFunction
}

export const LoginForm = ({onClose}: Props) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn("credentials", {
                ...data,
                redirect: false
            })

            if (!resp?.ok) {
                const check = await fetch(`/api/auth/login-check?email=${encodeURIComponent(data.email)}`)
                const {exists, verified} = await check.json()

                if (exists && !verified) {
                    throw new Error("Please verify your email first")
                }

                throw new Error("Incorrect email or password")
            }

            toast.success("Successfully signed in", {
                icon: "✅"
            })

            onClose?.()
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to sign in"

            console.error("Error [LOGIN]", error)
            toast.error(message, {
                icon: "❌"
            })
        }
    }

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title text="Sign In" size="md" className="font-bold"/>
                        <p className="text-gray-400">Enter your email to sign in to your account</p>
                    </div>

                    <Image src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60}/>
                </div>

                <FormInput name="email" label="E-Mail" required/>
                <FormInput name="password" label="Password" type="password" required/>

                <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
                    Sign In
                </Button>
            </form>
        </FormProvider>
    )
}

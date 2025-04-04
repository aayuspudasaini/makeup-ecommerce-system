"use client";
import { InputField, InputType } from "@/components/reusable/input-field";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { PasswordField } from "@/components/reusable/password-field";
import { SignUpSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButton } from "@/components/reusable/custom-button";
import Link from "next/link";

export const SignUpForm = () => {
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
        resolver: zodResolver(SignUpSchema),
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => console.log(data))}>
                <div className="grid gap-6">
                    <div className="grid gap-2.5">
                        <InputField
                            control={form.control}
                            label="Name"
                            placeholder="John Doe."
                            type={InputType.INPUT}
                            name="name"
                        />
                        <InputField
                            control={form.control}
                            label="Email Address"
                            placeholder="user@example.com"
                            type={InputType.INPUT}
                            name="email"
                        />
                        <PasswordField
                            control={form.control}
                            label="Password"
                            placeholder="XXXXXXXX"
                            name="password"
                        />
                        <PasswordField
                            control={form.control}
                            label="Confirm Password"
                            placeholder="XXXXXXXX"
                            name="confirm_password"
                        />

                        <CustomButton type="submit" className="w-full">
                            Create Account
                        </CustomButton>
                    </div>
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            href="/signin"
                            className="underline underline-offset-4"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    );
};

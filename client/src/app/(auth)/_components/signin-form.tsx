"use client";
import { Button } from "@/components/ui/button";
import { InputField, InputType } from "@/components/reusable/input-field";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { PasswordField } from "@/components/reusable/password-field";
import { SignInSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export const SignInForm = () => {
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(SignInSchema),
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => console.log(data))}>
                <div className="grid gap-6">
                    <div className="grid gap-2.5">
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
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </div>
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="underline underline-offset-4"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    );
};

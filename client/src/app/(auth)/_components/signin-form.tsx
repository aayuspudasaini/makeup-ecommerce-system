"use client";

import React from "react";
import { InputField, InputType } from "@/components/reusable/input-field";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { PasswordField } from "@/components/reusable/password-field";
import { SignInSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { z } from "zod";
import { signIn } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { CustomButton } from "@/components/reusable/custom-button";

export const SignInForm = () => {
    const router = useRouter();
    const [error, setError] = React.useState<string>("");

    const { mutate, isPending } = useMutation({
        mutationFn: signIn,
    });

    const onSubmit = (data: z.infer<typeof SignInSchema>) => {
        setError("");
        mutate(data, {
            onSuccess: ({ data }) => {
                form.reset();
                toast.success(data?.message);
                // router.replace("/");
            },
            onError: (error) => {
                if (error.message) {
                    setError(error?.message);
                }
            },
        });
    };

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(SignInSchema),
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                    <div className="grid gap-2.5">
                        <InputField
                            control={form.control}
                            label="Email Address"
                            placeholder="user@example.com"
                            type={InputType.INPUT}
                            name="email"
                            disabled={isPending}
                        />
                        <PasswordField
                            control={form.control}
                            label="Password"
                            placeholder="XXXXXXXX"
                            name="password"
                            disabled={isPending}
                        />
                        {error && (
                            <div className="rounded-md bg-red-600/20 gap-x-2.5 font-medium text-red-600 text-sm flex h-9 px-2.5 flex-row items-center">
                                <TriangleAlert className="size-4" />
                                {error}
                            </div>
                        )}
                        <CustomButton
                            isExecuting={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Login
                        </CustomButton>
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

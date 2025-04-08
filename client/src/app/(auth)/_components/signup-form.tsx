"use client";
import { InputField, InputType } from "@/components/reusable/input-field";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { PasswordField } from "@/components/reusable/password-field";
import { SignUpSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButton } from "@/components/reusable/custom-button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/lib/api";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
        resolver: zodResolver(SignUpSchema),
    });
    const { mutate, isPending } = useMutation({
        mutationFn: signUp,
    });

    const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
        mutate(data, {
            onSuccess: (data) => {
                form.reset();
                toast.success(data?.data?.message);
                router.replace("/signin");
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong.");
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                    <div className="grid gap-2.5">
                        <InputField
                            control={form.control}
                            label="Name"
                            placeholder="John Doe."
                            type={InputType.INPUT}
                            name="name"
                            disabled={isPending}
                        />
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
                        <PasswordField
                            control={form.control}
                            label="Confirm Password"
                            placeholder="XXXXXXXX"
                            name="confirm_password"
                            disabled={isPending}
                        />

                        <CustomButton
                            type="submit"
                            className="w-full"
                            isExecuting={isPending}
                        >
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

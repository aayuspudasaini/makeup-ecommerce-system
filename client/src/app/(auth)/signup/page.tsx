import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "../_components/signup-form";

export default function SignInPage() {
    return (
        <Card className="bg-inherit">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Create new Account</CardTitle>
                <CardDescription>
                    Please enter your details to create a new account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
        </Card>
    );
}

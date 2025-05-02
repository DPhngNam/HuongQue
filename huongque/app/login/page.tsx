import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";

export default function Login() {
  return (
    <div className="flex flex-col p-[96px]">
      {/* Login form */}
      <div className="w-96 justify-start text-gray-900 text-4xl font-bold font-['Montserrat'] leading-[56px]">
        Login to Your Account
      </div>
      <Card className="w-[564px] mt-8">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Login to your account with email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="grid w-full items-center gap-4">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email / User name
                </Label>
                <Input
                  type="email"
                  id="email"
                  className="border border-gray-300 rounded-4xl p-2"
                />
              </div>
              <div className="grid w-full items-center gap-4">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  className="border border-gray-300 rounded-4xl p-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  id="remember-me"
                  className="w-4 h-4 border border-gray-300 focus:ring-0 focus:outline-none bg-green-500"
                />
                <Label
                  htmlFor="remember-me"
                  className="peer text-sm font-medium text-gray-700 "
                >
                  Remember me
                </Label>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>
                Login with GitHub
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

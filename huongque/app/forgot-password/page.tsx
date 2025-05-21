'use client';

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
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_AUTH_API;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("URL", url);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch(`${url}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      alert("Check your email for reset link.");
    } catch (error) {
      console.error("Error sending forgot password email:", error);
      alert("Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-[564px] gap-4 h-[400px] justify-center p-9 ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Enter your email address and we will send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid w-full items-center gap-4"
          >
            <div className="grid w-full items-center gap-4">
              <div className="grid w-full items-center gap-4">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  required
                  className="border border-gray-300 rounded-4xl p-2"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="bg-[#00CC96] text-white rounded-4xl w-full h-[56px] mt-7"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

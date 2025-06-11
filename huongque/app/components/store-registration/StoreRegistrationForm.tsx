"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Phase1Form } from "./Phase1Form";
import { Phase2Form } from "./Phase2Form";
import { Phase3Form } from "./Phase3Form";
import { formSchema, FormValues } from "./schema";

const businessTypes = [
  { value: "retail", label: "Bán lẻ" },
  { value: "wholesale", label: "Bán sỉ" },
  { value: "both", label: "Bán lẻ và bán sỉ" },
  { value: "service", label: "Dịch vụ" },
];

export function StoreRegistrationForm() {
  const [currentPhase, setCurrentPhase] = useState(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      shopName: "",
      address: "",
      avatar: "",
      banner: "",
      description: "",
      businessType: "",
      bankAccount: {
        accountNumber: "",
        accountName: "",
        bankName: "",
        branch: "",
      },
      idCard: "",
      businessLicense: "",
      foodSafetyCertificate: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    // Handle form submission
  }

  const handleNextPhase = () => {
    setCurrentPhase((prev) => prev + 1);
  };

  const handlePreviousPhase = () => {
    setCurrentPhase((prev) => prev - 1);
  };

  const handleCancel = () => {
    // Handle cancel action - you can add your own logic here
    console.log("Form cancelled");
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Đăng ký cửa hàng
          </CardTitle>
          <div className="text-center text-sm text-gray-500">
            Bước {currentPhase}/3
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentPhase === 1 && <Phase1Form form={form} />}
              {currentPhase === 2 && <Phase2Form form={form} />}
              {currentPhase === 3 && <Phase3Form form={form} />}

              <div className="flex gap-4">
                {currentPhase === 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1"
                  >
                    Hủy
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreviousPhase}
                    className="flex-1"
                  >
                    Quay lại
                  </Button>
                )}
                {currentPhase < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNextPhase}
                    className="flex-1"
                  >
                    Tiếp tục
                  </Button>
                ) : (
                  <Button type="submit" className="flex-1">
                    Hoàn thành
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
} 
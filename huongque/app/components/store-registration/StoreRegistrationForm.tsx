"use client";
import { createRegistration, RegistrationPayload } from "@/app/registration/service/regis.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form
} from "@/components/ui/form";
import axiosInstance from "@/lib/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Phase1Form } from "./Phase1Form";
import { Phase2Form } from "./Phase2Form";
import { Phase3Form } from "./Phase3Form";
import { formSchema, FormValues } from "./schema";
import { toast } from "react-toastify";

const businessTypes = [
  { value: "retail", label: "Bán lẻ" },
  { value: "wholesale", label: "Bán sỉ" },
  { value: "both", label: "Bán lẻ và bán sỉ" },
  { value: "service", label: "Dịch vụ" },
];

export function StoreRegistrationForm() {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    avatar: "/image/avatar.jpg", // default avatar
  });
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      shopName: "",
      address: "",
      avatar: undefined,
      banner: undefined,
      description: "",
      businessType: "",
      bankAccount: {
        accountNumber: "",
        accountName: "",
        bankName: "",
        branch: "",
      },
      idCard: undefined,
      businessLicense: undefined,
      foodSafetyCertificate: undefined,
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get("/userservice/users/me");
        const data = res.data;
        
        console.log("Raw API response:", data); // Debug log
        
        const userData = {
          name: data.fullName || data.name || data.displayName || "",
          email: data.gmail || data.email || data.emailAddress || "",
          phone: data.phone || data.phoneNumber || data.mobile || "",
          birthday: data.dob || data.birthday || data.dateOfBirth || "",
          avatar: data.avatar || data.profilePicture || data.picture || "/image/avatar.jpg",
        };
        
        console.log("Processed user data:", userData); // Debug log
        
        setUser(userData);
        
        // Only update form if we have actual data
        if (userData.email || userData.name || userData.phone) {
          form.reset({
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
            shopName: "",
            address: "",
            avatar: undefined,
            banner: undefined,
            description: "",
            businessType: "",
            bankAccount: {
              accountNumber: "",
              accountName: "",
              bankName: "",
              branch: "",
            },
            idCard: undefined,
            businessLicense: undefined,
            foodSafetyCertificate: undefined,
          });
          
          console.log("Form updated with user data:", userData);
        } else {
          console.log("No user data to populate form fields");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [form]);

  const handleFormSubmit = async (values: FormValues) => {
    console.log("Form submitted with values:", values);
    try {
      // Custom validation for required files
      if (!values.idCard || !(values.idCard instanceof File)) {
        alert("Vui lòng tải lên CCCD");
        return;
      }
      
      if (!values.businessLicense || !(values.businessLicense instanceof File)) {
        alert("Vui lòng tải lên giấy phép đăng ký kinh doanh");
        return;
      }
      
      if (!values.foodSafetyCertificate || !(values.foodSafetyCertificate instanceof File)) {
        alert("Vui lòng tải lên giấy chứng nhận an toàn thực phẩm");
        return;
      }

      const payload: RegistrationPayload = {
        email: values.email,
        name: values.name,
        phone: values.phone,
        shopName: values.shopName,
        address: values.address,
        description: values.description,
        businessType: values.businessType,
        bankAccount: values.bankAccount,
        ...(values.avatar && values.avatar instanceof File && { avatar: values.avatar }),
        ...(values.banner && values.banner instanceof File && { banner: values.banner }),
        ...(values.idCard && values.idCard instanceof File && { idCard: values.idCard }),
        ...(values.businessLicense && values.businessLicense instanceof File && { businessLicense: values.businessLicense }),
        ...(values.foodSafetyCertificate && values.foodSafetyCertificate instanceof File && { foodSafetyCertificate: values.foodSafetyCertificate }),
      };
      
      console.log("Submitting registration with payload:", payload);
      const response = await createRegistration(payload);
      console.log("Registration successful", response);
      
      // Show success message
      alert("Đăng ký cửa hàng thành công!");

    } catch (error) {
      toast.error("Đăng ký cửa hàng thất bại. Vui lòng thử lại sau.");
    }
  };

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
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
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
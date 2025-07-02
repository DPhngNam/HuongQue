"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, MapPin, Edit, Trash2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { ToastContainer } from "react-toastify";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

interface AddressFormData {
  name: string;
  phone: string;
  address: string;
  type: string;
}

export default function Address() {
  const [addresses, setAddresses] = React.useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>();

  const fetchAddresses = async () => {
    try {
      const res = await axiosInstance.get("/userservice/users/me/addresses");
      setAddresses(res.data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Không thể tải địa chỉ");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const onSubmit = async (data: AddressFormData) => {
    try {
      await axiosInstance.post("/userservice/users/me/addresses", data);
      toast.success("Thêm địa chỉ thành công!");
      reset(); // Reset form
      setIsAddDialogOpen(false); // Close dialog
      fetchAddresses(); // Refresh the address list
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Có lỗi xảy ra khi thêm địa chỉ!");
    }
  };

  const deleteAddress = async (addressId: string) => {
    try {
      await axiosInstance.delete(`/userservice/users/addresses/${addressId}`);
      toast.success("Xóa địa chỉ thành công!");
      fetchAddresses(); // Refresh the address list
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Có lỗi xảy ra khi xóa địa chỉ!");
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Địa chỉ của tôi</h2>
        <Dialog
          open={isAddDialogOpen}
          onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (open) {
              reset(); // Reset form when opening dialog
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={20} /> Thêm địa chỉ mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Thêm địa chỉ mới</DialogTitle>
              <DialogDescription>
                Điền thông tin để thêm địa chỉ mới vào tài khoản của bạn.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input
                    id="name"
                    placeholder="Nhập họ và tên"
                    {...register("name", {
                      required: "Họ và tên là bắt buộc",
                      minLength: {
                        value: 2,
                        message: "Họ và tên phải có ít nhất 2 ký tự",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    placeholder="Nhập số điện thoại"
                    {...register("phone", {
                      required: "Số điện thoại là bắt buộc",
                      pattern: {
                        value: /^[0-9]{10,11}$/,
                        message: "Số điện thoại phải có 10-11 chữ số",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ *</Label>
                <Input
                  id="address"
                  placeholder="Nhập địa chỉ"
                  {...register("address", {
                    required: "Địa chỉ là bắt buộc",
                    minLength: {
                      value: 10,
                      message: "Địa chỉ phải có ít nhất 10 ký tự",
                    },
                  })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Loại địa chỉ *</Label>
                <select
                  id="type"
                  className="w-full p-2 border rounded-md"
                  {...register("type", {
                    required: "Vui lòng chọn loại địa chỉ",
                  })}
                >
                  <option value="">Chọn loại địa chỉ</option>
                  <option value="home">Nhà riêng</option>
                  <option value="office">Văn phòng</option>
                  <option value="other">Khác</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm">{errors.type.message}</p>
                )}
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Đang lưu..." : "Lưu địa chỉ"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {/* Fetched Address Cards */}
        {addresses.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Chưa có địa chỉ nào. Hãy thêm địa chỉ đầu tiên của bạn!
          </div>
        ) : (
          addresses.map((address: any) => (
            <div key={address.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="text-gray-500" />
                  <h3 className="font-medium">
                    {address.type === "home"
                      ? "Nhà riêng"
                      : address.type === "office"
                      ? "Văn phòng"
                      : "Khác"}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit size={18} />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Xác nhận xóa địa chỉ</DialogTitle>
                        <DialogDescription>
                          Bạn có chắc chắn muốn xóa địa chỉ này? Hành động này
                          không thể hoàn tác.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">Hủy</Button>
                        <Button
                          variant="destructive"
                          onClick={() => deleteAddress(address.id)}
                        >
                          Xóa
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="space-y-1 text-gray-600">
                {address.name && <p>{address.name}</p>}
                {address.phone && <p>{address.phone}</p>}
                <p>{address.address}</p>
              </div>
            </div>
          ))
        )}

        {/* No need for separate form section since it's now in dialog */}
      </div>
    </div>
  );
}

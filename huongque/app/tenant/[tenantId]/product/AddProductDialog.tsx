"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import React from "react";
import { CategorySelect } from "@/app/components/CategorySelect";
import { ImageDropzone } from "@/app/components/ImageDropzone";
import axiosInstance from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import { DialogClose } from "@/components/ui/dialog";

export default function AddProductDialog({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { register, handleSubmit, setValue, reset } = useForm({
    criteriaMode: "all",
  });
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const { categories } = useCategories();
  const { tenantId } = useParams();
  const closeRef = React.useRef<HTMLButtonElement>(null);

  const onSubmit = async (data: any) => {
    try {
      await axiosInstance.post("/productservice", data, {
        headers: { "X-Tenant-ID": tenantId },
      });
      alert("Thêm sản phẩm thành công!");
      setImageFiles([]);
      reset();
      onSuccess();
      // Close dialog
      closeRef.current?.click();
    } catch (error) {
      alert("Có lỗi khi thêm sản phẩm!");
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thêm sản phẩm</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-5"
        >
          <Input
            className="col-span-2"
            placeholder="Tên sản phẩm"
            {...register("name", { required: true })}
          />
          <Input
            placeholder="Giá"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          <CategorySelect
            categories={categories.map((category) => ({
              id: category.id,
              name: category.name,
            }))}
            onChange={(value) => setValue("categoryId", value)}
          />
          <div className="col-span-2">
            <ImageDropzone onFilesChange={setImageFiles} />
          </div>
          <div className="col-span-2">
            <textarea
              className="w-full h-40 p-2 border border-gray-300 rounded"
              placeholder="Nhập mô tả sản phẩm"
              {...register("description")}
            ></textarea>
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="col-span-2 bg-green-600 text-white rounded px-4 py-2 mt-2"
            >
              Thêm sản phẩm
            </button>
            <DialogClose ref={closeRef} className="hidden" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import React from "react";
import { CategorySelect } from "@/app/components/CategorySelect";
import { ImageDropzone } from "@/app/components/ImageDropzone";

export default function AddProductPage() {
  const { register, handleSubmit, setValue } = useForm({
    criteriaMode: "all",
  });
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });
    for (const key in data) {
      formData.append(key, data[key]);
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Thông tin sản phẩm</CardTitle>
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
            <Input placeholder="Mã sản phẩm" {...register("code")} />{" "}
            <Input
              placeholder="Giá"
              {...register("price", { required: true })}
            />
            <Input
              placeholder="Số lượng"
              type="number"
              {...register("quantity", { required: true })}
            />
            <CategorySelect
              categories={[
                { id: "fruit", name: "Trái cây" },
                { id: "vegetable", name: "Rau củ" },
                { id: "meat", name: "Thịt" },
              ]}
              onChange={(value) => {
                setValue("categoryId", value);
              }}
            />
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Mô tả sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full h-40 p-2 border border-gray-300 rounded"
            placeholder="Nhập mô tả sản phẩm"
            {...register("description")}
          ></textarea>
        </CardContent>
      </Card>
      <div className="col-span-2">
        <ImageDropzone onFilesChange={setImageFiles} />
      </div>
      <div className="col-span-2 flex justify-end">
        <button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          className="col-span-2 bg-green-600 text-white rounded px-4 py-2 mt-2"
        >
          Thêm sản phẩm
        </button>
      </div>
    </div>
  );
}

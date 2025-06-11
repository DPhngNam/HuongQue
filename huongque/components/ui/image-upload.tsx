"use client";

import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Here you would typically upload the file to your storage service
      // and get back a URL. For now, we'll just create a local URL
      const url = URL.createObjectURL(file);
      onChange(url);
    }
  };

  return (
    <div className="mb-4 flex items-center gap-4">
      <div className="relative h-[200px] w-[200px] rounded-lg border border-dashed border-gray-300 p-4">
        {value ? (
          <>
            <div className="relative h-full w-full">
              <Image
                src={value}
                alt="Upload"
                fill
                className="rounded-lg object-cover"
                unoptimized
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2">
            <UploadCloud className="h-10 w-10 text-gray-400" />
            <span className="text-sm text-gray-500">Tải ảnh lên</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        )}
      </div>
    </div>
  );
} 
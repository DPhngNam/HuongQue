"use client";

import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FileUploadProps {
  value?: File;
  onChange: (value: File | undefined) => void;
  onRemove: () => void;
}

export function FileUpload({ value, onChange, onRemove }: FileUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      // Create preview URL for display
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemove = () => {
    onChange(undefined);
    setPreviewUrl(null);
    onRemove();
  };

  // Generate preview URL if we have a file but no preview URL yet
  const displayUrl = previewUrl || (value ? URL.createObjectURL(value) : null);

  return (
    <div className="mb-4 flex items-center gap-4">
      <div className="relative h-[200px] w-[200px] rounded-lg border border-dashed border-gray-300 p-4">
        {value && displayUrl ? (
          <>
            <div className="relative h-full w-full">
              <Image
                src={displayUrl}
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
              onClick={handleRemove}
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
      {value && (
        <div className="text-sm text-gray-600">
          <p>Tên file: {value.name}</p>
          <p>Kích thước: {Math.round(value.size / 1024)} KB</p>
        </div>
      )}
    </div>
  );
}

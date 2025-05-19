// components/ImageDropzone.tsx
"use client";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";

export function ImageDropzone({
  onFilesChange,
}: {
  onFilesChange: (files: File[]) => void;
}) {
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesChange(acceptedFiles);
    const previewUrls = acceptedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(previewUrls);
  }, [onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded p-6 text-center cursor-pointer hover:bg-gray-50"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Thả ảnh vào đây...</p>
      ) : (
        <p>Kéo và thả ảnh hoặc bấm để chọn ảnh</p>
      )}

      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {previews.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`preview-${idx}`}
            className="w-24 h-24 object-cover rounded border"
          />
        ))}
      </div>
    </div>
  );
}

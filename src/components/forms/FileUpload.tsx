'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
  className?: string;
  disabled?: boolean;
  placeholder?: React.ReactNode;
}

interface UploadingFile {
  file: File;
  progress: number;
  preview?: string;
  error?: string;
}

export function FileUpload({
  onFilesSelected,
  accept = 'image/*',
  multiple = true,
  maxFiles = 10,
  maxSizeMB = 5,
  className,
  disabled = false,
  placeholder,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const fileArray = Array.from(files);
      const validFiles: File[] = [];
      const newUploadingFiles: UploadingFile[] = [];

      fileArray.slice(0, maxFiles).forEach((file) => {
        if (file.size > maxSizeMB * 1024 * 1024) {
          newUploadingFiles.push({
            file,
            progress: 0,
            error: `File too large (max ${maxSizeMB}MB)`,
          });
        } else {
          validFiles.push(file);
          newUploadingFiles.push({
            file,
            progress: 100,
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
          });
        }
      });

      setUploadingFiles([...uploadingFiles, ...newUploadingFiles]);

      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }

      setTimeout(() => {
        setUploadingFiles((prev) => prev.filter((f) => !f.error));
      }, 3000);
    },
    [maxFiles, maxSizeMB, onFilesSelected, uploadingFiles]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = (index: number) => {
    setUploadingFiles(uploadingFiles.filter((_, i) => i !== index));
  };

  return (
    <div className={cn('space-y-4', className)}>
      <label
        className={cn(
          'relative block w-full border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragging
            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
            : 'border-gray-300 hover:border-[var(--color-primary)]',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          disabled={disabled}
          className="hidden"
        />

        {placeholder || (
          <>
            <Upload className="h-10 w-10 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              <span className="font-medium text-[var(--color-primary)]">Click to upload</span> or drag and drop
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {accept === 'image/*' ? 'Images' : 'Files'} up to {maxSizeMB}MB each (max {maxFiles})
            </p>
          </>
        )}
      </label>

      {uploadingFiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {uploadingFiles.map((uploadFile, index) => (
            <div
              key={`${uploadFile.file.name}-${index}`}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
            >
              {uploadFile.preview ? (
                <img
                  src={uploadFile.preview}
                  alt={uploadFile.file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
              )}

              {uploadFile.progress < 100 && !uploadFile.error && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
              )}

              {uploadFile.error && (
                <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center p-2">
                  <p className="text-white text-xs text-center">{uploadFile.error}</p>
                </div>
              )}

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-gray-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

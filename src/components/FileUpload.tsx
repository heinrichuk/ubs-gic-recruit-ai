
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, File, X } from "lucide-react";
import { cn } from '@/lib/utils';

interface FileUploadProps {
  label: string;
  accept?: string;
  onChange: (file: File | null) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  label, 
  accept = '.pdf,.doc,.docx,.txt', 
  onChange,
  className
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onChange(selectedFile);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0] || null;
    if (droppedFile) {
      setFile(droppedFile);
      onChange(droppedFile);
    }
  };
  
  const removeFile = () => {
    setFile(null);
    onChange(null);
  };
  
  return (
    <div className={cn("w-full", className)}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      
      {!file ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors",
            isDragging ? "border-ubs-red bg-red-50" : "border-gray-300 hover:border-ubs-red",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 text-ubs-lightGray mb-2" />
          <p className="text-sm text-gray-500 text-center">
            Drag and drop your file here, or click to browse
          </p>
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
            id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          />
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => document.getElementById(`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`)?.click()}
          >
            Select File
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <File className="h-6 w-6 text-ubs-red" />
              <div>
                <p className="text-sm font-medium truncate max-w-[200px] md:max-w-md">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={removeFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

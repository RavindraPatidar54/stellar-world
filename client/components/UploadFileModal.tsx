import { useState, useRef } from "react";
import { X, Upload, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadFileModal({ isOpen, onClose }: UploadFileModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      // Handle file upload logic here
      console.log("Uploading file:", selectedFile);
      onClose();
      // Show success notification
    }
  };

  const downloadTemplate = () => {
    // Handle template download
    console.log("Downloading template format");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-dashboard-card border border-border rounded-xl p-6 w-full max-w-lg mx-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Upload File</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Drag and Drop Area */}
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
              ${dragActive ? 'border-dashboard-accent-blue bg-dashboard-accent-blue/10' : 'border-border'}
              ${selectedFile ? 'border-green-500 bg-green-500/10' : ''}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".csv,.xlsx,.xls"
            />
            
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-dashboard-accent-blue/20 rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6 text-dashboard-accent-blue" />
              </div>
              
              {selectedFile ? (
                <div>
                  <p className="text-foreground font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-foreground font-medium mb-2">
                    Drag and drop your files here to upload
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse files
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* OR Divider */}
          <div className="flex items-center">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-3 text-sm text-muted-foreground">OR</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* File Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Choose file</label>
            <div className="flex space-x-2">
              <Input
                value={selectedFile?.name || "Sample file.abc"}
                readOnly
                className="bg-dashboard-bg border-border flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="border-border text-foreground hover:bg-muted"
              >
                Browse
              </Button>
            </div>
          </div>

          {/* Download Template Link */}
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="link"
              onClick={downloadTemplate}
              className="text-dashboard-accent-blue hover:text-dashboard-accent-blue/80 p-0 h-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              Download the upload format here
            </Button>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border text-foreground hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedFile}
              className="bg-dashboard-accent-blue hover:bg-dashboard-accent-blue/90 text-white"
            >
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

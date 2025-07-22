import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadRecieptNav from './UploadRecieptNav';
import MiniFooter from './MiniFooter';
import styles from './UploadReceipt.module.css';
import ReceiptUploadProgress from './ReceiptUploadProgress';

const UploadReceipt = () => {
  const [receipts, setReceipts] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.size <= 5 * 1024 * 1024) {
        // 5MB limit
        const newReceipt = {
          file: selectedFile,
          name: `Receipt ${new Date().getTime()}`,
          progress: 0,
          onRemove: (index) => {
            setReceipts((prev) => prev.filter((_, i) => i !== index));
          },
        };
        setReceipts((prev) => [...prev, newReceipt]);

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (progress > 100) {
            clearInterval(interval);
            return;
          }
          setReceipts((prev) =>
            prev.map((receipt, i) =>
              i === prev.length - 1 ? { ...receipt, progress } : receipt
            )
          );
        }, 500);
      } else {
        alert('File size must be less than 5MB');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (receipts.length === 0) {
      alert('Please upload at least one receipt');
      return;
    }
    // Handle submission of all receipts
    console.log('Submitting receipts:', receipts);
  };

  return (
    <div className={styles.uploadContainer}>
      <UploadRecieptNav />

      <main className={styles.mainContent}>
        <div>
          <h1 className={styles.title}>Upload Receipt</h1>
          <p className={styles.subtitle}>
            Upload image or document receipt to verify your eco-friendly
            purchase and get rewarded
          </p>
        </div>

        <div>
          <div
            {...getRootProps()}
            className={`${styles.dropzone} ${
              isDragActive ? styles.dropzoneActive : ''
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
              <img
                src="/document-icon.svg"
                alt="Document icon"
                className="w-16 h-16 text-gray-400"
              />
              <p className="text-xl font-medium">
                Drag & drop your receipt here or click to upload
              </p>
              <p className="text-gray-500">JPG, PNG, PDF (Max 5MB)</p>
              <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Select files
              </button>
            </div>
          </div>

          <ReceiptUploadProgress receipts={receipts} />

          <div className="mt-8 flex flex-col items-center space-y-4">
            <p className="text-sm text-gray-500">-Format: JPG, PNG, PDF</p>
            <p className="text-sm text-gray-500">-Image Max Size: 5MB</p>
          </div>

          <div className="mt-20 flex justify-center mb-20">
            <button
              onClick={handleSubmit}
              className="w-64 bg-black text-white py-4 rounded-lg text-lg font-medium font-poppins hover:bg-gray-800 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </main>

      <MiniFooter />
    </div>
  );
};

export default UploadReceipt;

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './ChallengeDetail.module.css';
import { FileText } from 'lucide-react';

const ChallengeDetail = ({ challenge }) => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        name: file.name,
        progress: 0,
        id: Math.random().toString(36).substring(2, 9),
      }));

      setFiles((prev) => [...prev, ...newFiles]);

      // Simulate upload progress
      newFiles.forEach((fileObj) => {
        let uploadProgress = 0;
        const interval = setInterval(() => {
          uploadProgress += 10;
          if (uploadProgress > 100) {
            clearInterval(interval);
            return;
          }

          setFiles((prevFiles) =>
            prevFiles.map((prevFile) =>
              prevFile.id === fileObj.id
                ? { ...prevFile, progress: uploadProgress }
                : prevFile
            )
          );

          // Update overall progress
          const totalProgress =
            files.reduce((acc, file) => acc + file.progress, 0) +
            uploadProgress;
          const avgProgress = Math.min(
            50,
            Math.floor(totalProgress / (files.length + 1))
          );
          setProgress(avgProgress);
        }, 500);
      });
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleMarkAsDone = () => {
    setProgress(100);
    setCompleted(true);
  };

  const handleViewPoints = () => {
    alert(`You earned ${challenge.points} points for this challenge!`);
  };

  return (
    <div className={styles.challengeContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Complete eco-challenges, climb the leaderboard,
        </h1>
        <h2 className={styles.title}>and unlock special rewards!</h2>
      </div>

      <div className={styles.challengeType}>{challenge.type}</div>

      <div className={styles.challengeCard}>
        <h3 className={styles.challengeTitle}>{challenge.title}</h3>
        {challenge.description.map((desc, index) => (
          <p key={index} className={styles.challengeDescription}>
            {desc}
          </p>
        ))}
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.imageSection}>
          <img
            src={challenge.image}
            alt={challenge.title}
            className={styles.challengeImage}
          />
        </div>

        <div className={styles.uploadSection}>
          <h3 className={styles.uploadTitle}>Drag & drop or click to upload</h3>
          <FileText className={styles.fileIcon} />
          <p className={styles.uploadDescription}>JPG, PNG, PDF (Max 5MB)</p>

          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <button className={styles.selectButton}>Select files</button>
          </div>

          <button className={styles.uploadButton}>Upload</button>

          {files.map((file) => (
            <div key={file.id} className={styles.fileItem}>
              <FileText size={20} className={styles.fileIcon} />
              <span className={styles.fileName}>{file.name}</span>
              <div className={styles.fileProgress}>
                <div
                  className={styles.fileProgressBar}
                  style={{ width: `${file.progress}%` }}
                />
              </div>
              <span className={styles.filePercentage}>{file.progress}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.actionButtons}>
        <button
          className={styles.markDoneButton}
          onClick={handleMarkAsDone}
          disabled={completed}
        >
          Mark as Done
        </button>
        <button className={styles.viewPointsButton} onClick={handleViewPoints}>
          View points earned
        </button>
      </div>
    </div>
  );
};

export default ChallengeDetail;

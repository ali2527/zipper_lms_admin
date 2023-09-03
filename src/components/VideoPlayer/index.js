import React, { useState,useRef } from 'react';
import {
     UPLOAD_URL,
   } from "../../config/constants";

   const VideoPlayer = ({ vdo }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
  
    const handleVideoClick = () => {
      if (videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    };
  
    return (
      <div style={{ position: 'relative' }}>
        <video
          ref={videoRef}
          onClick={handleVideoClick}
          style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        >
          <source src={vdo} type="video/mp4" />
        </video>
        {!isPlaying && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <PlayIcon onClick={handleVideoClick} />
          </div>
        )}
      </div>
    );
  };
  
  const PlayIcon = ({ onClick }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 24 24"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="rgba(255,255,255,0.8)"
        d="M8 5.14v14.72l11-7.36-11-7.36z"
      />
    </svg>
  );
  
  export default VideoPlayer;
import React, { useEffect, useRef, useState } from 'react';
import { Video, VideoOff } from 'lucide-react';
import { Button } from "../components/ui/button";

const VideoFeed = () => {
  const videoRef = useRef(null);
  const [isVideoOn, setIsVideoOn] = useState(false);

  const toggleVideo = async () => {
    if (!isVideoOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsVideoOn(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    } else {
      const stream = videoRef.current?.srcObject;
      stream?.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsVideoOn(false);
    }
  };

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative w-full mb-6">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${!isVideoOn ? 'hidden' : ''}`}
        />
        {!isVideoOn && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <VideoOff className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      <Button
        variant="outline"
        className="absolute bottom-4 right-4"
        onClick={toggleVideo}
      >
        {isVideoOn ? <VideoOff className="mr-2" /> : <Video className="mr-2" />}
        {isVideoOn ? 'Turn Off Camera' : 'Turn On Camera'}
      </Button>
    </div>
  );
};

export default VideoFeed;

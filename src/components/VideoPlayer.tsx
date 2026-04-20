import { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

const VideoPlayer = ({ src, className = "" }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Start paused for portfolio unless they want autoplay
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <video
        ref={videoRef}
        src={src}
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Custom Control Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {!isPlaying && (
          <div className="w-16 h-16 bg-cocoa/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-opacity duration-300">
            <Play size={32} fill="white" />
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="absolute bottom-4 right-4 flex gap-3">
        <button 
          onClick={toggleMute}
          className="w-10 h-10 bg-cocoa/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-terracotta transition-colors shadow-lg"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <button 
          onClick={togglePlay}
          className="w-10 h-10 bg-cocoa/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-terracotta transition-colors shadow-lg"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} fill="white" />}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;

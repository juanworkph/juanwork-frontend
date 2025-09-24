import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Video,
  Edit,
  Upload
} from 'lucide-react';
import { VideoIntroduction as VideoIntroType } from '../schema/profile-data';

interface VideoIntroductionProps {
  videoIntroduction?: VideoIntroType;
  isOwnProfile?: boolean;
}

export function VideoIntroduction({ videoIntroduction, isOwnProfile = false }: VideoIntroductionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you would control the actual video player here
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real implementation, you would control the actual video player here
  };

  if (!videoIntroduction && !isOwnProfile) {
    return null;
  }

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Video className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-xl font-semibold">Introduction Video</CardTitle>
          </div>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              {videoIntroduction ? 'Edit' : 'Add'}
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {videoIntroduction ? (
          <div className="space-y-4">
            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden group">
              <Image
                src={videoIntroduction.thumbnail}
                alt={videoIntroduction.title}
                fill
                className="object-cover"
              />
              
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover:opacity-80 transition-opacity">
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 text-white" />
                  ) : (
                    <Play className="h-6 w-6 text-white ml-1" />
                  )}
                </Button>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20 p-2 h-8 w-8"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20 p-2 h-8 w-8"
                    onClick={toggleMute}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <Badge variant="secondary" className="bg-black/50 text-white border-0">
                    {videoIntroduction.duration}
                  </Badge>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 p-2 h-8 w-8"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {videoIntroduction.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get to know me better through this personal introduction where I share my passion for development and design.
              </p>
            </div>

            {/* Video Stats */}
            <div className="flex items-center gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Video className="h-4 w-4" />
                <span>Duration: {videoIntroduction.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Play className="h-4 w-4" />
                <span>HD Quality</span>
              </div>
            </div>
          </div>
        ) : isOwnProfile ? (
          // Empty state for own profile
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto">
              <Video className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                Add an Introduction Video
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Stand out from the crowd! Upload a personal video introduction to showcase your personality and build trust with potential clients.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Video
              </Button>
              <Button variant="outline" className="gap-2">
                <Video className="h-4 w-4" />
                Record Now
              </Button>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>• Maximum duration: 3 minutes</p>
              <p>• Supported formats: MP4, MOV, AVI</p>
              <p>• Maximum file size: 100MB</p>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
} 
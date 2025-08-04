import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, Mic } from 'lucide-react';

interface TranscriptLine {
  id: number;
  text: string;
  isHighlighted: boolean;
  timestamp: number;
}

const InterviewIntroduction = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<TranscriptLine[]>([]);

  const transcriptLines: TranscriptLine[] = [
    { id: 1, text: "Welcome to your automated interview session.", isHighlighted: false, timestamp: 0 },
    { id: 2, text: "I am your virtual interviewer, and I will guide you through this process.", isHighlighted: false, timestamp: 3000 },
    { id: 3, text: "Please ensure your microphone is working properly.", isHighlighted: true, timestamp: 6000 },
    { id: 4, text: "This interview will be recorded for evaluation purposes.", isHighlighted: true, timestamp: 9000 },
    { id: 5, text: "You will have 30 seconds to answer each question.", isHighlighted: true, timestamp: 12000 },
    { id: 6, text: "Speak clearly and maintain eye contact with the camera.", isHighlighted: false, timestamp: 15000 },
    { id: 7, text: "Take your time to think before responding.", isHighlighted: false, timestamp: 18000 },
    { id: 8, text: "Do not worry if you need to pause - this is normal.", isHighlighted: false, timestamp: 21000 },
    { id: 9, text: "The interview will begin automatically after these instructions.", isHighlighted: true, timestamp: 24000 },
    { id: 10, text: "Good luck with your interview!", isHighlighted: false, timestamp: 27000 }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTranscriptIndex((prev) => {
          if (prev < transcriptLines.length - 1) {
            const nextLine = transcriptLines[prev + 1];
            setVisibleLines((prevLines) => {
              const newLines = [...prevLines, nextLine];
              // Keep only the last 4 lines visible
              return newLines.slice(-4);
            });
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 3000); // Show new line every 3 seconds
    }

    return () => clearInterval(interval);
  }, [isPlaying, transcriptLines.length]);

  const handlePlayPause = () => {
    if (!isPlaying && currentTranscriptIndex === 0) {
      // Start from beginning
      setVisibleLines([transcriptLines[0]]);
      setCurrentTranscriptIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTranscriptIndex(0);
    setVisibleLines([]);
  };

  return (
    <div className="min-h-screen bg-interview-bg">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">NarraFlow Interviews</h1>
              <p className="text-primary-foreground/80 mt-1">Automated Interview Platform</p>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Introduction Phase
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Panel - Narrator & Controls */}
          <div className="space-y-6">
            <Card className="p-8 text-center bg-white shadow-lg border-0">
              <div className="mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-narrator-accent rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <Volume2 className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Virtual Interviewer</h2>
                <p className="text-muted-foreground">Your AI-powered interview assistant</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center space-x-4">
                  <Button 
                    onClick={handlePlayPause}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Pause Instructions
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Start Instructions
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                    size="lg"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Reset
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Mic className="w-4 h-4" />
                  <span>Ensure your microphone is enabled</span>
                </div>
              </div>
            </Card>

            {/* Status Card */}
            <Card className="p-6 bg-white border-0 shadow-lg">
              <h3 className="font-semibold mb-4 text-foreground">Interview Setup</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Audio System</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    Ready
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Camera Access</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Recording Status</span>
                  <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                    Standby
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Panel - Flowing Transcript */}
          <div className="space-y-6">
            <Card className="bg-white border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-narrator-accent text-white p-4">
                <h3 className="font-semibold text-lg">Live Transcript</h3>
                <p className="text-primary-foreground/80 text-sm">Instructions will appear here as they are narrated</p>
              </div>
              
              <div className="h-96 overflow-hidden relative bg-transcript-bg">
                <div className="absolute inset-0 p-6">
                  <div className="h-full relative">
                    {visibleLines.map((line, index) => (
                      <div
                        key={line.id}
                        className={`absolute w-full transition-all duration-1000 ease-out ${
                          index === visibleLines.length - 1 ? 'animate-flow-up' : ''
                        }`}
                        style={{
                          bottom: `${index * 60}px`,
                          transform: index === visibleLines.length - 1 ? 'translateY(100%)' : 'translateY(0)'
                        }}
                      >
                        <div className={`p-4 rounded-lg mb-4 transition-all duration-300 ${
                          line.isHighlighted 
                            ? 'bg-red-50 border-l-4 border-highlight text-highlight font-medium shadow-md' 
                            : 'bg-gray-50 text-foreground'
                        }`}>
                          <p className="text-sm leading-relaxed">{line.text}</p>
                          {line.isHighlighted && (
                            <div className="mt-2">
                              <Badge variant="destructive" className="bg-highlight text-white text-xs">
                                Important
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {visibleLines.length === 0 && (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <div className="text-center">
                          <Volume2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Click "Start Instructions" to begin</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Gradient overlay for smooth transitions */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-transcript-bg to-transparent pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transcript-bg to-transparent pointer-events-none"></div>
              </div>
            </Card>

            {/* Progress Indicator */}
            <Card className="p-4 bg-white border-0 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Instruction Progress</span>
                <span className="text-sm text-muted-foreground">
                  {currentTranscriptIndex + 1} / {transcriptLines.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentTranscriptIndex + 1) / transcriptLines.length) * 100}%` }}
                ></div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <Card className="mt-8 p-6 bg-white border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground">Ready to Begin?</h4>
              <p className="text-sm text-muted-foreground">Complete the instructions to proceed to your interview</p>
            </div>
            <Button 
              size="lg"
              disabled={currentTranscriptIndex < transcriptLines.length - 1}
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg disabled:opacity-50"
            >
              Start Interview
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InterviewIntroduction;

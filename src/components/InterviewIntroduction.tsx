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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto h-screen grid lg:grid-cols-3 gap-8 py-6">
        
        {/* Left Panel - Enhanced Avatar Section */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center text-center space-y-6">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-32 right-8 w-16 h-16 bg-primary/5 rounded-full blur-lg"></div>
            <div className="absolute top-1/2 left-4 w-12 h-12 bg-primary/15 rounded-full blur-md"></div>
          </div>
          
          {/* Avatar with Enhanced Design */}
          <div className="relative z-10">
            <div className="relative mb-6">
              <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center shadow-2xl relative">
                <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-inner">
                  <img 
                    src="/lovable-uploads/75c387e3-3826-4a49-b77a-43b8e85d2165.png" 
                    alt="Virtual Interviewer"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Animated Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse"></div>
                {/* Recording Indicator */}
                {isPlaying && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Title and Description */}
            <div className="space-y-3 mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                AI Interviewer
              </h2>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
                Your professional virtual interviewer will guide you through the process
              </p>
            </div>
            
            {/* Enhanced Control Buttons */}
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <Button 
                onClick={handlePlayPause}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg border-0 transition-all duration-300"
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
                size="default"
                className="border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
              >
                Reset
              </Button>
            </div>
            
            {/* Progress Indicator */}
            <div className="mt-6 w-full max-w-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs text-primary font-medium">
                  {Math.round((currentTranscriptIndex / transcriptLines.length) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
                  style={{ width: `${(currentTranscriptIndex / transcriptLines.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Compact Transcript */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <Card className="bg-white border-0 shadow-xl overflow-hidden h-96 mb-6">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4">
              <h3 className="font-semibold text-lg">Interview Instructions</h3>
              <p className="text-primary-foreground/90 mt-1 text-xs">Listen carefully to proceed</p>
            </div>
            
            <div className="flex-1 overflow-hidden relative bg-white">
              <div className="absolute inset-0 p-4">
                <div className="h-full relative">
                  {visibleLines.map((line, index) => (
                    <div
                      key={line.id}
                      className={`absolute w-full transition-all duration-1000 ease-out ${
                        index === visibleLines.length - 1 ? 'animate-flow-up' : ''
                      }`}
                      style={{
                        bottom: `${index * 55}px`,
                        transform: index === visibleLines.length - 1 ? 'translateY(100%)' : 'translateY(0)'
                      }}
                    >
                      <div className={`p-3 rounded-lg mb-2 transition-all duration-300 ${
                        line.isHighlighted 
                          ? 'bg-red-50 border-l-4 border-red-500 text-red-700 font-medium shadow-sm' 
                          : 'bg-slate-50 text-foreground'
                      }`}>
                        <p className="text-sm leading-relaxed">{line.text}</p>
                        {line.isHighlighted && (
                          <div className="mt-2">
                            <Badge variant="destructive" className="bg-red-500 text-white text-xs">
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
                        <Volume2 className="w-10 h-10 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">Click "Start Instructions" to begin</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Gradient overlay for smooth transitions */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
            </div>
          </Card>

          {/* Start Interview Button */}
          <div className="text-center">
            <Button 
              size="lg"
              disabled={currentTranscriptIndex < transcriptLines.length - 1}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-xl disabled:opacity-50 disabled:cursor-not-allowed px-12 py-4 text-lg font-semibold transition-all duration-300"
            >
              <Mic className="w-5 h-5 mr-2" />
              Start Interview
            </Button>
            {currentTranscriptIndex < transcriptLines.length - 1 && (
              <p className="text-xs text-muted-foreground mt-3">
                Complete the instructions to proceed
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewIntroduction;

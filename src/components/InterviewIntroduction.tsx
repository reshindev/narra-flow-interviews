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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto h-screen grid lg:grid-cols-5 gap-6 py-8">
        
        {/* Left Panel - Female Avatar */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center shadow-xl">
              <div className="w-56 h-56 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white">
                <img 
                  src="/lovable-uploads/75c387e3-3826-4a49-b77a-43b8e85d2165.png" 
                  alt="Virtual Interviewer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {isPlaying && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-3">Virtual Interviewer</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-sm">Ready to guide you through your interview process</p>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
            <Button 
              onClick={handlePlayPause}
              size="default"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg flex-1"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Instructions
                </>
              )}
            </Button>
            
            <Button 
              onClick={handleReset}
              variant="outline"
              size="default"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Right Panel - Flowing Transcript */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <Card className="bg-white border-0 shadow-xl overflow-hidden flex-1">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4">
              <h3 className="font-semibold text-xl">Interview Instructions</h3>
              <p className="text-primary-foreground/90 mt-1 text-sm">Please listen carefully to the following instructions</p>
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
                        bottom: `${index * 60}px`,
                        transform: index === visibleLines.length - 1 ? 'translateY(100%)' : 'translateY(0)'
                      }}
                    >
                      <div className={`p-3 rounded-lg mb-3 transition-all duration-300 ${
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
                        <Volume2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-base">Click "Start Instructions" to begin</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Gradient overlay for smooth transitions */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
            </div>
          </Card>

          {/* Start Interview Button */}
          <div className="text-center mt-4">
            <Button 
              size="lg"
              disabled={currentTranscriptIndex < transcriptLines.length - 1}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg disabled:opacity-50 px-8 py-3"
            >
              Start Interview
            </Button>
            {currentTranscriptIndex < transcriptLines.length - 1 && (
              <p className="text-xs text-muted-foreground mt-2">
                Please complete the instructions to proceed
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewIntroduction;

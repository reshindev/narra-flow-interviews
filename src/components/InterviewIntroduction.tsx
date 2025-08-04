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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Panel - Female Avatar */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-8">
            <div className="w-80 h-80 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center shadow-2xl">
              <div className="w-72 h-72 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/lovable-uploads/75c387e3-3826-4a49-b77a-43b8e85d2165.png" 
                  alt="Virtual Interviewer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {isPlaying && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-2">Virtual Interviewer</h2>
          <p className="text-muted-foreground text-lg mb-8">Ready to guide you through your interview</p>
          
          <div className="flex space-x-4">
            <Button 
              onClick={handlePlayPause}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg px-8"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
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
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Right Panel - Flowing Transcript */}
        <div className="space-y-6">
          <Card className="bg-white border-0 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
              <h3 className="font-semibold text-2xl">Interview Instructions</h3>
              <p className="text-primary-foreground/90 mt-2">Please listen carefully to the following instructions</p>
            </div>
            
            <div className="h-96 overflow-hidden relative bg-white">
              <div className="absolute inset-0 p-6">
                <div className="h-full relative">
                  {visibleLines.map((line, index) => (
                    <div
                      key={line.id}
                      className={`absolute w-full transition-all duration-1000 ease-out ${
                        index === visibleLines.length - 1 ? 'animate-flow-up' : ''
                      }`}
                      style={{
                        bottom: `${index * 70}px`,
                        transform: index === visibleLines.length - 1 ? 'translateY(100%)' : 'translateY(0)'
                      }}
                    >
                      <div className={`p-4 rounded-lg mb-4 transition-all duration-300 ${
                        line.isHighlighted 
                          ? 'bg-red-50 border-l-4 border-red-500 text-red-700 font-medium shadow-md' 
                          : 'bg-slate-50 text-foreground'
                      }`}>
                        <p className="text-base leading-relaxed">{line.text}</p>
                        {line.isHighlighted && (
                          <div className="mt-3">
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
                        <Volume2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Click "Start Instructions" to begin</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Gradient overlay for smooth transitions */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
            </div>
          </Card>

          {/* Start Interview Button */}
          <div className="text-center">
            <Button 
              size="lg"
              disabled={currentTranscriptIndex < transcriptLines.length - 1}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg disabled:opacity-50 px-12 py-4 text-lg"
            >
              Start Interview
            </Button>
            {currentTranscriptIndex < transcriptLines.length - 1 && (
              <p className="text-sm text-muted-foreground mt-3">
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

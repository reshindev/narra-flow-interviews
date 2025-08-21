import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, Mic, ChevronUp, ChevronDown } from 'lucide-react';

interface TranscriptLine {
  id: number;
  text: string;
  isHighlighted: boolean;
  isEncouragement: boolean;
  timestamp: number;
}

const InterviewIntroduction = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const transcriptLines: TranscriptLine[] = [
    { id: 1, text: "Hi there! I'm Joanna, the SkillHunt chatbot.", isHighlighted: false, isEncouragement: false, timestamp: 0 },
    { id: 2, text: "I'll be guiding you through today's interview.", isHighlighted: false, isEncouragement: false, timestamp: 3000 },
    { id: 3, text: "Before we begin, please ensure you have a stable internet connection, as this interview can only be attempted once.", isHighlighted: true, isEncouragement: false, timestamp: 6000 },
    { id: 4, text: "I'll ask questions based on your selected area of expertise.", isHighlighted: false, isEncouragement: false, timestamp: 9000 },
    { id: 5, text: "You'll have a limited time to respond to each one.", isHighlighted: true, isEncouragement: false, timestamp: 12000 },
    { id: 6, text: "If you're not sure of the answer, let the timer run out or click skip.", isHighlighted: true, isEncouragement: false, timestamp: 15000 },
    { id: 7, text: "The next question will appear automatically.", isHighlighted: false, isEncouragement: false, timestamp: 18000 },
    { id: 8, text: "Use your time wisely.", isHighlighted: false, isEncouragement: true, timestamp: 21000 },
    { id: 9, text: "Please note, leaving this tab during the interview may result in warnings.", isHighlighted: true, isEncouragement: false, timestamp: 24000 },
    { id: 10, text: "While you are out of focus, the recording will be paused and will only resume once you return to this tab.", isHighlighted: true, isEncouragement: false, timestamp: 27000 },
    { id: 11, text: "Repeated actions will lead to immediate termination.", isHighlighted: true, isEncouragement: false, timestamp: 30000 },
    { id: 12, text: "We'll be recording both audio and video for evaluation purposes.", isHighlighted: true, isEncouragement: false, timestamp: 33000 },
    { id: 13, text: "Please do not close the window until all your responses have been successfully uploaded.", isHighlighted: true, isEncouragement: false, timestamp: 36000 },
    { id: 14, text: "Good luck!", isHighlighted: false, isEncouragement: true, timestamp: 39000 },
    { id: 15, text: "Click the Start Interview button below to begin.", isHighlighted: false, isEncouragement: false, timestamp: 42000 }
  ];

  const VISIBLE_ITEMS = 5;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTranscriptIndex((prev) => {
          if (prev < transcriptLines.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 3000); // Move to next instruction every 3 seconds
    }

    return () => clearInterval(interval);
  }, [isPlaying, transcriptLines.length]);

  // Auto-scroll to keep current line visible
  useEffect(() => {
    if (isPlaying && currentTranscriptIndex >= scrollPosition + VISIBLE_ITEMS) {
      setScrollPosition(currentTranscriptIndex - VISIBLE_ITEMS + 1);
    } else if (isPlaying && currentTranscriptIndex < scrollPosition) {
      setScrollPosition(currentTranscriptIndex);
    }
  }, [currentTranscriptIndex, isPlaying, scrollPosition]);

  const handlePlayPause = () => {
    if (!isPlaying && currentTranscriptIndex === 0) {
      setCurrentTranscriptIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTranscriptIndex(0);
    setScrollPosition(0);
  };

  const handleScrollUp = () => {
    setScrollPosition(prev => Math.max(0, prev - 1));
  };

  const handleScrollDown = () => {
    setScrollPosition(prev => Math.min(transcriptLines.length - VISIBLE_ITEMS, prev + 1));
  };

  const visibleLines = transcriptLines.slice(scrollPosition, scrollPosition + VISIBLE_ITEMS);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto h-screen grid lg:grid-cols-3 gap-8 py-4">
        
        {/* Left Panel - Enhanced Avatar Section */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center text-center space-y-6 relative">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-32 right-8 w-16 h-16 bg-primary/5 rounded-full blur-lg"></div>
            <div className="absolute top-1/2 left-4 w-12 h-12 bg-primary/15 rounded-full blur-md"></div>
          </div>
          
          {/* Avatar with Enhanced Design */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative mb-8 flex justify-center">
              <div className="w-56 h-56 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center shadow-2xl relative">
                <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-inner">
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

        {/* Right Panel - All Instructions with Navigation */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <Card className="bg-white border-0 shadow-xl overflow-hidden h-[32rem] mb-6 flex flex-col">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Interview Instructions</h3>
                <p className="text-primary-foreground/90 mt-1 text-xs">Listen carefully to proceed</p>
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  onClick={handleScrollUp}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                  disabled={scrollPosition === 0}
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleScrollDown}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                  disabled={scrollPosition >= transcriptLines.length - VISIBLE_ITEMS}
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 p-4 bg-white overflow-hidden">
              <div className="space-y-3 h-full">
                {visibleLines.map((line, index) => {
                  const actualIndex = scrollPosition + index;
                  const isCurrentLine = actualIndex === currentTranscriptIndex && isPlaying;
                  
                  return (
                    <div
                      key={line.id}
                      className={`p-3 rounded-lg transition-all duration-500 ${
                        isCurrentLine
                          ? 'bg-primary/15 border-l-4 border-primary text-primary shadow-lg scale-[1.05] translate-x-2'
                          : line.isHighlighted 
                            ? 'bg-red-50 border-l-4 border-red-500 text-red-700 font-medium shadow-sm'
                            : line.isEncouragement
                              ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700 font-medium shadow-sm'
                              : 'bg-slate-50 text-foreground'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <p className="text-sm leading-relaxed flex-1">{line.text}</p>
                        <div className="flex items-center gap-2 ml-3">
                          {isCurrentLine && (
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          )}
                          {line.isHighlighted && (
                            <Badge variant="destructive" className="bg-red-500 text-white text-xs">
                              Important
                            </Badge>
                          )}
                          {line.isEncouragement && (
                            <Badge className="bg-blue-500 text-white text-xs">
                              Encouragement
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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

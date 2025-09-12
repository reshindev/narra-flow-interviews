import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, Mic, ChevronUp, ChevronDown, MoreVertical } from 'lucide-react';

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
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

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
          const nextIndex = prev + 1;
          if (nextIndex < transcriptLines.length) {
            // Text-to-speech for the current line
            if ('speechSynthesis' in window) {
              speechSynthesis.cancel(); // Cancel any ongoing speech
              const utterance = new SpeechSynthesisUtterance(transcriptLines[nextIndex].text);
              utterance.rate = 0.9;
              utterance.pitch = 1.1;
              utterance.voice = speechSynthesis.getVoices().find(voice => 
                voice.name.includes('Female') || voice.name.includes('Joanna') || voice.name.includes('Samantha')
              ) || speechSynthesis.getVoices()[0];
              speechRef.current = utterance;
              speechSynthesis.speak(utterance);
            }
            return nextIndex;
          } else {
            setIsPlaying(false);
            if ('speechSynthesis' in window) {
              speechSynthesis.cancel();
            }
            return prev;
          }
        });
      }, 4000); // Slower, smoother timing - 4 seconds per instruction
    }

    return () => {
      clearInterval(interval);
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    };
  }, [isPlaying, transcriptLines]);

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
    if (isPlaying && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTranscriptIndex(0);
    setScrollPosition(0);
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  const handleScrollUp = () => {
    setScrollPosition(prev => Math.max(0, prev - 1));
  };

  const handleScrollDown = () => {
    setScrollPosition(prev => Math.min(transcriptLines.length - VISIBLE_ITEMS, prev + 1));
  };

  const visibleLines = transcriptLines.slice(scrollPosition, scrollPosition + VISIBLE_ITEMS);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full grid lg:grid-cols-5 gap-6">
        
        {/* Left Panel - Enhanced Avatar Section */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center text-center space-y-4 relative">
          {/* Enhanced Decorative Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-16 left-8 w-24 h-24 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-20 right-6 w-20 h-20 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/3 left-2 w-16 h-16 bg-primary/8 rounded-full blur-lg animate-pulse delay-500"></div>
            <div className="absolute bottom-1/3 right-12 w-14 h-14 bg-primary/12 rounded-full blur-md animate-pulse delay-700"></div>
          </div>
          
          {/* Enhanced Avatar Design */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative mb-6 flex justify-center">
              {/* Outer Ring with Gradient */}
              <div className="w-64 h-64 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 rounded-full flex items-center justify-center shadow-2xl relative p-2">
                {/* Inner Ring */}
                <div className="w-full h-full bg-gradient-to-br from-white to-slate-50 rounded-full flex items-center justify-center p-3 shadow-inner">
                  {/* Avatar Container */}
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white/50 shadow-lg">
                    <img 
                      src="/lovable-uploads/75c387e3-3826-4a49-b77a-43b8e85d2165.png" 
                      alt="Virtual Interviewer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Multiple Animated Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full border border-primary/20 animate-pulse delay-300"></div>
                
                {/* Enhanced Recording Indicator */}
                {isPlaying && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse shadow-xl flex items-center justify-center border-2 border-white">
                    <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Title and Description */}
            <div className="space-y-2 mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                AI Interviewer
              </h2>
              <p className="text-muted-foreground text-xs max-w-xs mx-auto leading-relaxed">
                Your professional virtual interviewer will guide you through the process
              </p>
            </div>
            
            {/* Control Buttons */}
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <Button 
                onClick={handlePlayPause}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg border-0 transition-all duration-300"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Instructions
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
                className="border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Instructions and Start Button */}
        <div className="lg:col-span-3 flex flex-col h-full">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-xl p-4 text-white shadow-2xl flex-shrink-0 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Interview Instructions</h2>
                <p className="text-primary-foreground/90 text-sm">Review all guidelines before starting</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handlePlayPause}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-1" />
                      Listen
                    </>
                  )}
                </Button>
                {isPlaying && (
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Instructions Grid - Takes remaining space */}
          <div className="flex-1 overflow-hidden relative rounded-xl bg-white/50 border border-slate-200/50 backdrop-blur-sm">
            <div 
              className="h-full overflow-y-auto p-4 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-primary/30 hover:scrollbar-thumb-primary/50 scrollbar-thumb-rounded-full"
              style={{ 
                maxHeight: 'calc(100vh - 340px)',
                scrollbarWidth: 'thin',
                scrollbarColor: 'hsl(var(--primary) / 0.3) hsl(var(--slate-100))'
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {transcriptLines.map((line, index) => (
                  <div
                    key={line.id}
                    className={`group relative p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                      index === currentTranscriptIndex && isPlaying
                        ? 'bg-primary/10 border-primary/40 shadow-lg ring-2 ring-primary/20'
                        : line.isHighlighted
                          ? 'bg-red-50 border-red-200 hover:bg-red-100'
                          : line.isEncouragement
                            ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {/* Card Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 ${
                        index === currentTranscriptIndex && isPlaying
                          ? 'bg-primary animate-pulse'
                          : line.isHighlighted
                            ? 'bg-red-500'
                            : line.isEncouragement
                              ? 'bg-blue-500'
                              : 'bg-slate-400'
                      }`}>
                        {index + 1}
                      </div>
                      
                      {index === currentTranscriptIndex && isPlaying && (
                        <div className="flex items-center gap-1">
                          <Volume2 className="w-3 h-3 text-primary animate-pulse" />
                          <div className="w-1 h-1 bg-primary rounded-full animate-ping"></div>
                        </div>
                      )}
                      
                      {line.isHighlighted && (
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    
                    {/* Card Content */}
                    <p className={`text-sm leading-relaxed ${
                      index === currentTranscriptIndex && isPlaying
                        ? 'text-primary font-medium'
                        : line.isHighlighted
                          ? 'text-red-700 font-medium'
                          : line.isEncouragement
                            ? 'text-blue-700 font-medium'
                            : 'text-slate-700'
                    }`}>
                      {line.text}
                    </p>
                    
                    {/* Hover Replay Button */}
                    <button
                      onClick={() => {
                        setCurrentTranscriptIndex(index);
                        if ('speechSynthesis' in window) {
                          speechSynthesis.cancel();
                          const utterance = new SpeechSynthesisUtterance(line.text);
                          utterance.rate = 0.9;
                          utterance.pitch = 1.1;
                          speechSynthesis.speak(utterance);
                        }
                      }}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full bg-white/80 hover:bg-white shadow-sm"
                      title="Replay this instruction"
                    >
                      <Play className="w-3 h-3 text-slate-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Start Interview Button - Integrated Design */}
          <div className="flex-shrink-0 mt-4">
            <div className="relative">
              {/* Button Container with Gradient Background */}
              <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20 backdrop-blur-sm">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-primary font-medium text-sm">Ready to begin?</span>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300"></div>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-primary via-primary/95 to-primary hover:from-primary/90 hover:via-primary/85 hover:to-primary/90 text-primary-foreground shadow-2xl px-8 py-4 text-lg font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-primary/25 group relative overflow-hidden"
                  >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <Mic className="w-6 h-6 mr-3 animate-pulse" />
                    <span className="relative z-10">Start Interview</span>
                  </Button>
                  <p className="text-muted-foreground text-xs">
                    Click when you're ready to begin the assessment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewIntroduction;

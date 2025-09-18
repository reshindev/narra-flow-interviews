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
  const [isPlaying, setIsPlaying] = useState(true); // Auto-start
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [instructionsCompleted, setInstructionsCompleted] = useState(false);
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
            setInstructionsCompleted(true);
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
    if (isPlaying && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsPlaying(!isPlaying);
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
      <div className="max-w-7xl mx-auto h-full grid lg:grid-cols-3 gap-6">
        
        {/* Left Panel - AI Interviewer Section */}
        <div className="lg:col-span-1 flex flex-col justify-between relative">
          
          {/* Top Section - Avatar */}
          <div className="flex flex-col items-center justify-center flex-1">
            {/* Enhanced Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-16 left-8 w-24 h-24 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-32 right-6 w-20 h-20 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/3 left-2 w-16 h-16 bg-primary/8 rounded-full blur-lg animate-pulse delay-500"></div>
            </div>
            
            {/* Redesigned Avatar */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative mb-6 flex justify-center">
                {/* Multi-layered Circular Design */}
                <div className="w-72 h-72 relative">
                  {/* Outer Glow Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent animate-pulse"></div>
                  
                  {/* Main Avatar Container */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 shadow-2xl flex items-center justify-center">
                    {/* Inner White Circle */}
                    <div className="w-full h-full bg-gradient-to-br from-white via-white to-slate-50 rounded-full flex items-center justify-center p-4 shadow-inner">
                      {/* Avatar Image Container */}
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white/70 shadow-lg">
                        <img 
                          src="/lovable-uploads/75c387e3-3826-4a49-b77a-43b8e85d2165.png" 
                          alt="Joanna - AI Interviewer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated Rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full border border-primary/20 animate-pulse delay-300"></div>
                  <div className="absolute inset-6 rounded-full border border-primary/15 animate-pulse delay-700"></div>
                  
                  {/* Status Indicator */}
                  {isPlaying && (
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse shadow-2xl flex items-center justify-center border-4 border-white">
                      <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
                    </div>
                  )}
                  
                  {instructionsCompleted && (
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
                      <div className="w-6 h-6 text-white">✓</div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Title */}
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Joanna
                </h2>
                <p className="text-primary/70 text-sm font-medium">AI Interviewer</p>
              </div>
            </div>
          </div>
          
          {/* Bottom Section - Description */}
          <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-lg">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-800">Meet Joanna</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your dedicated AI interviewer with advanced conversational abilities. Joanna has been trained to conduct professional interviews with empathy and precision, ensuring a comprehensive assessment of your skills.
              </p>
              <div className="flex items-center gap-2 text-xs text-primary">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className={instructionsCompleted ? "text-green-600" : "text-primary"}>
                  {instructionsCompleted ? "Instructions completed - Ready to begin" : "Playing instructions..."}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Instructions and Controls */}
        <div className="lg:col-span-2 flex flex-col h-full">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-xl p-4 text-white shadow-2xl flex-shrink-0 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Interview Instructions</h2>
                <p className="text-primary-foreground/90 text-sm">Listen carefully to all guidelines</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    setCurrentTranscriptIndex(0);
                    setInstructionsCompleted(false);
                    setIsPlaying(true);
                    if ('speechSynthesis' in window) {
                      speechSynthesis.cancel();
                    }
                  }}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Replay
                </Button>
                {isPlaying && (
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Instructions Grid */}
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

          {/* Start Interview Button */}
          <div className="flex-shrink-0 mt-4">
            <div className="relative">
              <div className={`rounded-2xl p-6 border backdrop-blur-sm transition-all duration-500 ${
                instructionsCompleted 
                  ? 'bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20' 
                  : 'bg-slate-100/50 border-slate-200/50'
              }`}>
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      instructionsCompleted ? 'bg-primary animate-pulse' : 'bg-slate-400'
                    }`}></div>
                    <span className={`font-medium text-sm ${
                      instructionsCompleted ? 'text-primary' : 'text-slate-500'
                    }`}>
                      {instructionsCompleted ? 'Ready to begin!' : 'Please wait for instructions to complete'}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${
                      instructionsCompleted ? 'bg-primary animate-pulse delay-300' : 'bg-slate-400'
                    }`}></div>
                  </div>
                  <Button 
                    size="lg"
                    disabled={!instructionsCompleted}
                    className={`px-8 py-4 text-lg font-bold transition-all duration-500 transform ${
                      instructionsCompleted 
                        ? 'bg-gradient-to-r from-primary via-primary/95 to-primary hover:from-primary/90 hover:via-primary/85 hover:to-primary/90 text-primary-foreground shadow-2xl hover:scale-105 hover:shadow-primary/25 group relative overflow-hidden' 
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {instructionsCompleted && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    )}
                    <Mic className={`w-6 h-6 mr-3 ${instructionsCompleted ? 'animate-pulse' : ''}`} />
                    <span className="relative z-10">Start Interview</span>
                  </Button>
                  <p className="text-muted-foreground text-xs">
                    {instructionsCompleted 
                      ? 'Click when you\'re ready to begin the assessment' 
                      : 'Button will be enabled once all instructions are heard'
                    }
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

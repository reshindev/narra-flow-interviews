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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto h-screen grid lg:grid-cols-5 gap-6 py-4">
        
        {/* Left Panel - Enhanced Avatar Section */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center text-center space-y-6 relative">
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

        {/* Right Panel - Complete Instructions Overview */}
        <div className="lg:col-span-3 flex flex-col space-y-6">
          
          {/* Header with Playback Controls */}
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Interview Instructions</h2>
                <p className="text-primary-foreground/90 text-sm">Complete overview of all interview guidelines</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <Button
                    onClick={handlePlayPause}
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 mr-1" />
                        Pause Audio
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-1" />
                        Play Audio
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleReset}
                    size="sm"
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    Reset
                  </Button>
                </div>
                {isPlaying && (
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 animate-pulse" />
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Audio Progress */}
            {isPlaying && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Playing instruction {currentTranscriptIndex + 1} of {transcriptLines.length}</span>
                  <span>{Math.round((currentTranscriptIndex / transcriptLines.length) * 100)}%</span>
                </div>
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: `${(currentTranscriptIndex / transcriptLines.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* All Instructions Card */}
          <Card className="bg-white border-0 shadow-2xl overflow-hidden h-[600px] flex flex-col">
            
            {/* Instructions Header */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 border-b flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Complete Interview Guidelines</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Critical</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Encouragement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Instructions List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {transcriptLines.map((line, index) => (
                <div
                  key={line.id}
                  className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${
                    index === currentTranscriptIndex && isPlaying
                      ? 'bg-primary/10 border-2 border-primary/30 shadow-md'
                      : line.isHighlighted
                        ? 'bg-red-50 border border-red-200 hover:bg-red-100'
                        : line.isEncouragement
                          ? 'bg-blue-50 border border-blue-200 hover:bg-blue-100'
                          : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {/* Instruction Number */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
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
                  
                  {/* Instruction Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      {line.isHighlighted && (
                        <Badge variant="destructive" className="bg-red-500 text-white text-xs">
                          Critical
                        </Badge>
                      )}
                      {line.isEncouragement && (
                        <Badge className="bg-blue-500 text-white text-xs">
                          Motivation
                        </Badge>
                      )}
                      {index === currentTranscriptIndex && isPlaying && (
                        <div className="flex items-center gap-1">
                          <Volume2 className="w-3 h-3 text-primary animate-pulse" />
                          <span className="text-xs text-primary font-medium">Playing</span>
                        </div>
                      )}
                    </div>
                    
                    <p className={`leading-relaxed ${
                      index === currentTranscriptIndex && isPlaying
                        ? 'text-primary font-medium'
                        : line.isHighlighted
                          ? 'text-red-700'
                          : line.isEncouragement
                            ? 'text-blue-700'
                            : 'text-foreground'
                    }`}>
                      {line.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quick Summary Footer */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 border-t flex-shrink-0">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-600">{transcriptLines.filter(line => line.isHighlighted).length}</div>
                  <div className="text-xs text-muted-foreground">Critical Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{transcriptLines.filter(line => line.isEncouragement).length}</div>
                  <div className="text-xs text-muted-foreground">Encouragements</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-600">{transcriptLines.length}</div>
                  <div className="text-xs text-muted-foreground">Total Instructions</div>
                </div>
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

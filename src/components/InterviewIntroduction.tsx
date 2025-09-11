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

        {/* Right Panel - Interactive Step-by-Step Instructions */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-6">
          
          {/* Interactive Progress Header */}
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Interview Walkthrough</h2>
                <p className="text-primary-foreground/90 text-sm">Step-by-step guidance for your success</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-bold">{currentTranscriptIndex + 1}</div>
                  <div className="text-xs opacity-75">of {transcriptLines.length}</div>
                </div>
                <div className="w-16 h-16 rounded-full border-3 border-white/30 flex items-center justify-center relative">
                  <div 
                    className="absolute inset-0 rounded-full border-3 border-white transition-all duration-500"
                    style={{
                      background: `conic-gradient(white ${(currentTranscriptIndex / transcriptLines.length) * 360}deg, transparent 0deg)`
                    }}
                  ></div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <div className="text-primary font-bold text-sm">
                      {Math.round((currentTranscriptIndex / transcriptLines.length) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Interactive Progress Dots */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {transcriptLines.map((_, index) => (
                <button
                  key={index}
                  onClick={() => !isPlaying && setCurrentTranscriptIndex(index)}
                  disabled={isPlaying}
                  className={`w-3 h-3 rounded-full transition-all duration-300 flex-shrink-0 ${
                    index <= currentTranscriptIndex
                      ? 'bg-white shadow-lg'
                      : 'bg-white/30 hover:bg-white/50'
                  } ${!isPlaying ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                />
              ))}
            </div>
          </div>

          {/* Main Interactive Content */}
          <Card className="bg-white border-0 shadow-2xl overflow-hidden">
            
            {/* Current Step Display */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 border-b">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  transcriptLines[currentTranscriptIndex]?.isHighlighted 
                    ? 'bg-red-500' 
                    : transcriptLines[currentTranscriptIndex]?.isEncouragement 
                      ? 'bg-blue-500' 
                      : 'bg-primary'
                }`}>
                  {currentTranscriptIndex + 1}
                </div>
                <div className="flex items-center gap-2">
                  {transcriptLines[currentTranscriptIndex]?.isHighlighted && (
                    <Badge variant="destructive" className="bg-red-500 text-white animate-pulse">
                      Critical
                    </Badge>
                  )}
                  {transcriptLines[currentTranscriptIndex]?.isEncouragement && (
                    <Badge className="bg-blue-500 text-white">
                      Motivation
                    </Badge>
                  )}
                  {isPlaying && currentTranscriptIndex < transcriptLines.length && (
                    <>
                      <Volume2 className="w-4 h-4 text-primary animate-pulse" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                    </>
                  )}
                </div>
              </div>
              
              <div className={`text-lg leading-relaxed font-medium transition-all duration-500 ${
                transcriptLines[currentTranscriptIndex]?.isHighlighted 
                  ? 'text-red-700' 
                  : transcriptLines[currentTranscriptIndex]?.isEncouragement 
                    ? 'text-blue-700' 
                    : 'text-foreground'
              }`}>
                {transcriptLines[currentTranscriptIndex]?.text || "Ready to begin!"}
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                
                {/* Navigation Controls */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Navigation</h4>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setCurrentTranscriptIndex(Math.max(0, currentTranscriptIndex - 1))}
                      disabled={currentTranscriptIndex === 0 || isPlaying}
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      onClick={() => setCurrentTranscriptIndex(Math.min(transcriptLines.length - 1, currentTranscriptIndex + 1))}
                      disabled={currentTranscriptIndex === transcriptLines.length - 1 || isPlaying}
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      Next
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Playback</h4>
                  <div className="flex gap-2">
                    <Button
                      onClick={handlePlayPause}
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-primary to-primary/90"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          Play
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleReset}
                      size="sm"
                      variant="outline"
                    >
                      Reset
                    </Button>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Status</h4>
                  <div className={`p-3 rounded-lg text-sm font-medium ${
                    currentTranscriptIndex === transcriptLines.length - 1
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : isPlaying
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-slate-50 text-slate-700 border border-slate-200'
                  }`}>
                    {currentTranscriptIndex === transcriptLines.length - 1
                      ? '✓ Ready to start'
                      : isPlaying
                        ? '🎵 Playing instructions'
                        : '⏸ Paused'
                    }
                  </div>
                </div>
              </div>

              {/* Interactive Checklist Preview */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Key Points to Remember</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {transcriptLines.filter(line => line.isHighlighted).slice(0, 4).map((line, index) => (
                    <div
                      key={line.id}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                        currentTranscriptIndex >= line.id - 1
                          ? 'bg-red-50 border border-red-200'
                          : 'bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                        currentTranscriptIndex >= line.id - 1
                          ? 'bg-red-500 text-white'
                          : 'bg-slate-300 text-slate-600'
                      }`}>
                        {currentTranscriptIndex >= line.id - 1 ? '✓' : index + 1}
                      </div>
                      <p className={`text-xs leading-relaxed ${
                        currentTranscriptIndex >= line.id - 1 ? 'text-red-700' : 'text-slate-600'
                      }`}>
                        {line.text}
                      </p>
                    </div>
                  ))}
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

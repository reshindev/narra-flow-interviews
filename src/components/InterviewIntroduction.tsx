import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
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
  const [instructionsCompleted, setInstructionsCompleted] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
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

  // Auto-scroll carousel to current instruction
  useEffect(() => {
    if (carouselApi && currentTranscriptIndex >= 0) {
      carouselApi.scrollTo(currentTranscriptIndex);
    }
  }, [carouselApi, currentTranscriptIndex]);

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

  const handlePlayPause = () => {
    if (isPlaying && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsPlaying(!isPlaying);
  };


  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3 overflow-hidden">
      <div className="max-w-6xl mx-auto h-full grid lg:grid-cols-3 gap-4">
        
        {/* Left Panel - AI Interviewer Section */}
        <div className="lg:col-span-1 flex flex-col justify-between relative max-h-full">
          
          {/* Top Section - Avatar */}
          <div className="flex flex-col items-center justify-center flex-1 min-h-0">
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
                <div className="w-56 h-56 lg:w-64 lg:h-64 relative">
                  {/* Outer Glow Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent animate-pulse"></div>
                  
                  {/* Main Avatar Container */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 shadow-2xl flex items-center justify-center">
                    {/* Inner White Circle */}
                    <div className="w-full h-full bg-gradient-to-br from-white via-white to-slate-50 rounded-full flex items-center justify-center p-4 shadow-inner">
                      {/* Avatar Image Container */}
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white/70 shadow-lg">
                        <img 
                          src="/joanna-avatar.jpg" 
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
          
          {/* Header with integrated slider controls */}
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-xl p-4 text-white shadow-2xl flex-shrink-0 mb-3">
            <div className="flex items-center justify-between mb-3">
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
            
            {/* Integrated Instruction Slider */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary-foreground/90">
                Instruction {currentTranscriptIndex + 1} of {transcriptLines.length}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    const prevIndex = Math.max(0, currentTranscriptIndex - 1);
                    setCurrentTranscriptIndex(prevIndex);
                    if (carouselApi) carouselApi.scrollTo(prevIndex);
                  }}
                  disabled={currentTranscriptIndex === 0 || !instructionsCompleted}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 disabled:opacity-50 disabled:cursor-not-allowed w-8 h-8 p-0"
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => {
                    const nextIndex = Math.min(transcriptLines.length - 1, currentTranscriptIndex + 1);
                    setCurrentTranscriptIndex(nextIndex);
                    if (carouselApi) carouselApi.scrollTo(nextIndex);
                  }}
                  disabled={currentTranscriptIndex === transcriptLines.length - 1 || !instructionsCompleted}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 disabled:opacity-50 disabled:cursor-not-allowed w-8 h-8 p-0"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Instructions Carousel */}
          <div className="flex-1 relative rounded-xl bg-white/50 border border-slate-200/50 backdrop-blur-sm p-4 min-h-0">
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              setApi={setCarouselApi}
              className="w-full h-full"
            >
              <CarouselContent className="h-full">
                {transcriptLines.map((line, index) => (
                  <CarouselItem key={line.id} className="h-full">
                    <div className="h-full flex items-stretch justify-center p-2">
                      <div
                        className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 hover:shadow-xl w-full h-full flex flex-col justify-between ${
                          index === currentTranscriptIndex && isPlaying
                            ? 'bg-primary/10 border-primary/40 shadow-2xl ring-4 ring-primary/20 scale-105'
                            : line.isHighlighted
                              ? 'bg-red-50 border-red-200 hover:bg-red-100 shadow-lg'
                              : line.isEncouragement
                                ? 'bg-blue-50 border-blue-200 hover:bg-blue-100 shadow-lg'
                                : 'bg-white border-slate-200 hover:bg-slate-50 shadow-lg'
                        }`}
                      >
                        {/* Card Header */}
                        <div className="flex items-center gap-4 mb-4 flex-shrink-0">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg ${
                            index === currentTranscriptIndex && isPlaying
                              ? 'bg-primary animate-pulse shadow-primary/30'
                              : line.isHighlighted
                                ? 'bg-red-500 shadow-red/30'
                                : line.isEncouragement
                                  ? 'bg-blue-500 shadow-blue/30'
                                  : 'bg-slate-400 shadow-slate/30'
                          }`}>
                            {index + 1}
                          </div>
                          
                          {index === currentTranscriptIndex && isPlaying && (
                            <div className="flex items-center gap-3">
                              <Volume2 className="w-5 h-5 text-primary animate-pulse" />
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                                <div className="w-2 h-2 bg-primary rounded-full animate-ping delay-100"></div>
                                <div className="w-2 h-2 bg-primary rounded-full animate-ping delay-200"></div>
                              </div>
                              <span className="text-primary font-semibold text-sm">Playing...</span>
                            </div>
                          )}
                          
                          {line.isHighlighted && (
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                              <span className="text-red-600 font-medium text-sm">Important</span>
                            </div>
                          )}
                          
                          {line.isEncouragement && (
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                              <span className="text-blue-600 font-medium text-sm">Encouragement</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Card Content - Flexible Height */}
                        <div className="flex-1 flex items-center justify-center">
                          <p className={`text-lg leading-relaxed text-center ${
                            index === currentTranscriptIndex && isPlaying
                              ? 'text-primary font-semibold'
                              : line.isHighlighted
                                ? 'text-red-700 font-semibold'
                                : line.isEncouragement
                                  ? 'text-blue-700 font-semibold'
                                  : 'text-slate-700 font-medium'
                          }`}>
                            {line.text}
                          </p>
                        </div>
                        
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
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl"
                          title="Replay this instruction"
                        >
                          <Play className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Start Interview Button */}
          <div className="flex-shrink-0 mt-3 text-center">
            <Button 
              disabled={!instructionsCompleted}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold px-8 py-3 rounded-xl shadow-2xl hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mic className="w-5 h-5 mr-2" />
              {instructionsCompleted ? "Start Interview" : "Please wait for instructions to complete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewIntroduction;

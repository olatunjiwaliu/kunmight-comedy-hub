import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Clock, Download, Share2, Check, Loader2, Video, FileText, Music, Zap, MessageCircle, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const STAGES = [
  { label: "Analyzing prompt", icon: <Zap className="w-4 h-4" />, duration: 3 },
  { label: "Rendering keyframes", icon: <Video className="w-4 h-4" />, duration: 4 },
  { label: "Synthesizing voice", icon: <Music className="w-4 h-4" />, duration: 4 },
  { label: "Final cut & export", icon: <FileText className="w-4 h-4" />, duration: 4 },
];

const PRESETS = [
  { name: "Comedy Skit", prompt: "A hilarious 2D animated skit about a Nigerian landlord chasing tenants for rent, with exaggerated expressions and funny sound effects", style: "comedy" },
  { name: "2D Explainer", prompt: "A clean 2D motion graphics explainer video showing how blockchain works for small business owners in Africa", style: "explainer" },
  { name: "Viral TikTok Short", prompt: "A fast-paced viral TikTok animation with trending audio, bold text overlays, and a satisfying loop ending", style: "viral" },
  { name: "Brand Ad", prompt: "A premium 30-second brand advertisement animation with cinematic lighting, smooth camera movements, and emotional storytelling", style: "brand" },
];

const STYLE_OPTIONS = [
  { id: "animation", label: "Animation", desc: "2D/3D animated visuals" },
  { id: "comedy", label: "Comedy", desc: "Funny skits & parodies" },
  { id: "script", label: "Script", desc: "Written content & voiceover" },
  { id: "video", label: "Video", desc: "Full video production" },
];

const OUTPUT_SCRIPT = `FADE IN:

INT. APARTMENT COMPLEX - MORNING

A group of tenants peek through their doors nervously.

LANDLORD (V.O.)
"Rent is DUE today! I want to see every kobo!"

CUT TO: Tenant 1 hiding behind a curtain.

TENANT 1
(whispering)
"Please God, make him pass my door..."

The landlord's shadow creeps closer. DRUMS intensify.

SMASH CUT TO: All tenants running out the back gate simultaneously.

LANDLORD
"EH! WHERE YOU ALL DEY GO?!"

FADE OUT. [END CARD: Kunmightpro Digital Logo]`;

export const AIGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("animation");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startGeneration = useCallback(() => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setIsComplete(false);
    setProgress(0);
    setCurrentStage(0);
    setTimeLeft(15);

    const totalDuration = 15;
    const tickRate = 100;
    let elapsed = 0;

    intervalRef.current = setInterval(() => {
      elapsed += tickRate / 1000;
      const pct = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(pct);
      setTimeLeft(Math.max(totalDuration - Math.floor(elapsed), 0));

      const stageIndex = Math.min(Math.floor((elapsed / totalDuration) * STAGES.length), STAGES.length - 1);
      setCurrentStage(stageIndex);

      if (elapsed >= totalDuration) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsGenerating(false);
        setIsComplete(true);
        setProgress(100);
      }
    }, tickRate);
  }, [prompt]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handlePreset = (preset: typeof PRESETS[0]) => {
    setPrompt(preset.prompt);
    setSelectedStyle(preset.style);
  };

  const handleShare = () => {
    const text = `Check out my AI-generated concept from Kunmightpro Digital!

Prompt: ${prompt}

Generated with Kunmightpro Digital AI Studio`;
    if (navigator.share) {
      navigator.share({ title: "Kunmightpro Digital AI Studio", text });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Result copied to clipboard");
    }
  };

  const triggerDownload = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTxt = () => {
    triggerDownload("kunmightpro-ai-script.txt", OUTPUT_SCRIPT, "text/plain");
    toast.success("Script downloaded (.txt)");
  };

  const handleDownloadJson = () => {
    const payload = JSON.stringify(
      { studio: "Kunmightpro Digital AI Studio", prompt, style: selectedStyle, script: OUTPUT_SCRIPT, generatedAt: new Date().toISOString() },
      null,
      2
    );
    triggerDownload("kunmightpro-ai-result.json", payload, "application/json");
    toast.success("Result downloaded (.json)");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(OUTPUT_SCRIPT);
    toast.success("Script copied to clipboard");
  };

  const handleReset = () => {
    setPrompt("");
    setSelectedStyle("animation");
    setIsComplete(false);
    setIsGenerating(false);
    setProgress(0);
    setCurrentStage(0);
    setTimeLeft(15);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30 px-4 py-1.5 text-sm mb-6">
            <Wand2 className="w-4 h-4 mr-2" /> Free AI Studio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Generation Studio
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Describe your vision and watch our AI bring it to life in 15 seconds. Free, instant, and ready to share.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Generator Card */}
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-2xl">
            {/* Style Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {STYLE_OPTIONS.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedStyle === style.id
                      ? "border-purple-500 bg-purple-500/10 text-white"
                      : "border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                  }`}
                >
                  <span className="block font-semibold text-sm">{style.label}</span>
                  <span className="block text-xs mt-1 opacity-70">{style.desc}</span>
                </button>
              ))}
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="text-sm font-medium text-zinc-300 mb-2 block">Your Creative Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the animation, video, or content you want to create..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 min-h-[120px] resize-none focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                disabled={isGenerating}
              />
            </div>

            {/* Presets */}
            <div className="mb-8">
              <p className="text-xs text-zinc-500 mb-3 font-medium uppercase tracking-wider">Quick Presets</p>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handlePreset(preset)}
                    disabled={isGenerating}
                    className="px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 text-sm hover:bg-purple-600/10 hover:border-purple-500/30 hover:text-purple-300 transition-all disabled:opacity-50"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={startGeneration}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-7 text-lg font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isGenerating ? (
                <span className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating... {timeLeft}s remaining
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  Generate Free Preview
                </span>
              )}
            </Button>

            {/* Progress Section */}
            <AnimatePresence>
              {(isGenerating || isComplete) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 overflow-hidden"
                >
                  {/* Timer & Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-zinc-400 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {isComplete ? "Complete" : `Generating (${timeLeft}s left)`}
                      </span>
                      <span className="text-sm font-mono text-purple-400">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-zinc-800" />
                  </div>

                  {/* Stage Indicators */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {STAGES.map((stage, idx) => (
                      <div
                        key={stage.label}
                        className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                          idx < currentStage || isComplete
                            ? "border-green-500/30 bg-green-500/5 text-green-400"
                            : idx === currentStage
                              ? "border-purple-500/30 bg-purple-500/5 text-purple-400"
                              : "border-zinc-800 bg-zinc-900/50 text-zinc-600"
                        }`}
                      >
                        {idx < currentStage || isComplete ? (
                          <Check className="w-4 h-4" />
                        ) : idx === currentStage ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          stage.icon
                        )}
                        <span className="text-xs font-medium">{stage.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Output Preview */}
                  {isComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
                        {/* Video Preview Placeholder */}
                        <div className="relative aspect-video bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
                              <Video className="w-8 h-8 text-purple-400" />
                            </div>
                            <p className="text-white font-semibold">Preview Ready</p>
                            <p className="text-zinc-400 text-sm mt-1">15s animated concept generated</p>
                          </div>
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-green-600/20 text-green-400 border-green-500/30 text-xs">
                              <Check className="w-3 h-3 mr-1" /> Generated
                            </Badge>
                          </div>
                        </div>

                        {/* Script Output */}
                        <div className="p-6 border-t border-zinc-800">
                          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-purple-400" />
                            Generated Script
                          </h4>
                          <pre className="text-zinc-400 text-sm whitespace-pre-wrap font-mono leading-relaxed bg-zinc-900/50 rounded-lg p-4 max-h-48 overflow-y-auto">
                            {OUTPUT_SCRIPT}
                          </pre>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-6 border-t border-zinc-800 flex flex-wrap gap-3">
                          <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 rounded-lg" onClick={handleDownloadTxt}>
                            <Download className="w-4 h-4 mr-2" /> Download .txt
                          </Button>
                          <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 rounded-lg" onClick={handleDownloadJson}>
                            <Download className="w-4 h-4 mr-2" /> Download .json
                          </Button>
                          <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 rounded-lg" onClick={handleCopy}>
                            <Copy className="w-4 h-4 mr-2" /> Copy Script
                          </Button>
                          <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 rounded-lg" onClick={handleShare}>
                            <Share2 className="w-4 h-4 mr-2" /> Share Result
                          </Button>
                          <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 rounded-lg" onClick={handleReset}>
                            <RotateCcw className="w-4 h-4 mr-2" /> Start Over
                          </Button>
                          <a
                            href="https://wa.me/2349068190825?text=Hello%20Kunmightpro%20Digital%2C%20I%20just%20generated%20a%20free%20AI%20preview%20and%20I%20want%20the%20full%20production!"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg">
                              <MessageCircle className="w-4 h-4 mr-2" /> Get Full Version on WhatsApp
                            </Button>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-zinc-500 text-sm">
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 100% Free</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> No signup needed</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Instant results</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Commercial use</span>
          </div>
        </div>
      </div>
    </section>
  );
};
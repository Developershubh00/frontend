import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTextToSpeechOptions {
  autoScroll?: boolean;
  scrollOffset?: number;
}

interface UseTextToSpeechReturn {
  isPlaying: boolean;
  isPaused: boolean;
  currentVoice: SpeechSynthesisVoice | null;
  availableVoices: SpeechSynthesisVoice[];
  speed: number;
  play: () => void;
  pause: () => void;
  stop: () => void;
  toggle: () => void;
  setVoice: (voice: SpeechSynthesisVoice) => void;
  setSpeed: (speed: number) => void;
}

export const useTextToSpeech = (
  contentRef: React.RefObject<HTMLElement>,
  options: UseTextToSpeechOptions = {}
): UseTextToSpeechReturn => {
  const { autoScroll = true, scrollOffset = 100 } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speed, setSpeed] = useState(1.0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const wordsArrayRef = useRef<Array<{ element: HTMLElement; text: string; wordIndex: number }>>([]);
  const currentWordIndexRef = useRef(-1);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // Try to find a female voice by default
      const femaleVoice = voices.find(
        voice => voice.name.toLowerCase().includes('female') || 
                 voice.name.toLowerCase().includes('woman') ||
                 voice.name.toLowerCase().includes('samantha') ||
                 voice.name.toLowerCase().includes('victoria') ||
                 voice.name.toLowerCase().includes('karen') ||
                 voice.name.toLowerCase().includes('zira')
      );
      
      if (femaleVoice) {
        setCurrentVoice(femaleVoice);
      } else if (voices.length > 0) {
        setCurrentVoice(voices[0]);
      }
    };

    loadVoices();
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Add global CSS
  useEffect(() => {
    const styleId = 'tts-word-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .tts-word {
          display: inline;
          transition: all 0.15s ease;
        }
        
        .tts-word-active {
          background-color: #2563eb !important;
          color: #ffffff !important;
          font-weight: 600 !important;
          padding: 2px 4px !important;
          border-radius: 4px !important;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4) !important;
          transform: scale(1.05);
          display: inline-block !important;
        }
        
        .tts-word-read {
          background-color: rgba(191, 219, 254, 0.3) !important;
          opacity: 0.9;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleId);
      if (style) style.remove();
    };
  }, []);

  // Wrap words in spans for highlighting
  const wrapWords = useCallback(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll(
      'p, h1, h2, h3, h4, h5, h6, li, td, th, span:not(.tts-word), div:not([class*="tts"])'
    );

    wordsArrayRef.current = [];
    let globalWordIndex = 0;

    elements.forEach((element) => {
      const el = element as HTMLElement;
      
      // Skip if already processed or empty
      if (el.querySelector('.tts-word') || !el.textContent?.trim()) return;

      // Get text content
      const text = el.textContent || '';
      const words = text.split(/(\s+)/); // Keep whitespace

      // Clear element
      el.innerHTML = '';

      // Wrap each word
      words.forEach((word) => {
        if (word.trim()) {
          // It's a word
          const span = document.createElement('span');
          span.className = 'tts-word';
          span.textContent = word;
          span.dataset.wordIndex = String(globalWordIndex);
          
          wordsArrayRef.current.push({
            element: span,
            text: word,
            wordIndex: globalWordIndex
          });
          
          el.appendChild(span);
          globalWordIndex++;
        } else {
          // It's whitespace
          el.appendChild(document.createTextNode(word));
        }
      });
    });
  }, [contentRef]);

  // Highlight specific word
  const highlightWord = useCallback((wordIndex: number) => {
    const words = wordsArrayRef.current;
    
    // Remove previous highlights
    words.forEach((word, idx) => {
      word.element.classList.remove('tts-word-active');
      if (idx < wordIndex) {
        word.element.classList.add('tts-word-read');
      } else {
        word.element.classList.remove('tts-word-read');
      }
    });

    // Highlight current word
    if (words[wordIndex]) {
      const currentElement = words[wordIndex].element;
      currentElement.classList.remove('tts-word-read');
      currentElement.classList.add('tts-word-active');
      currentWordIndexRef.current = wordIndex;

      // Auto-scroll
      if (autoScroll) {
        setTimeout(() => {
          const rect = currentElement.getBoundingClientRect();
          const absoluteTop = rect.top + window.pageYOffset;
          const middle = absoluteTop - (window.innerHeight / 2) + scrollOffset;
          
          window.scrollTo({
            top: middle,
            behavior: 'smooth'
          });
        }, 50);
      }
    }
  }, [autoScroll, scrollOffset]);

  // Clear all highlights
  const clearHighlights = useCallback(() => {
    wordsArrayRef.current.forEach(word => {
      word.element.classList.remove('tts-word-active', 'tts-word-read');
    });
    currentWordIndexRef.current = -1;
  }, []);

  // Restore original text
  const unwrapWords = useCallback(() => {
    if (!contentRef.current) return;

    const wrappedElements = contentRef.current.querySelectorAll('.tts-word');
    wrappedElements.forEach(span => {
      const text = span.textContent || '';
      const textNode = document.createTextNode(text);
      span.parentNode?.replaceChild(textNode, span);
    });

    // Normalize to merge text nodes
    contentRef.current.normalize();
    wordsArrayRef.current = [];
  }, [contentRef]);

  const play = useCallback(() => {
    if (!contentRef.current) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Wrap words
    wrapWords();

    // Get text from word array
    const text = wordsArrayRef.current.map(w => w.text).join(' ');
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    utterance.rate = speed;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    if (currentVoice) {
      utterance.voice = currentVoice;
    }

    let currentWordIndex = 0;

    // Track word boundaries
    utterance.onboundary = (event) => {
      if (event.name === 'word' && currentWordIndex < wordsArrayRef.current.length) {
        highlightWord(currentWordIndex);
        currentWordIndex++;
      }
    };

    utterance.onstart = () => {
      setIsPlaying(true);
      highlightWord(0);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      clearHighlights();
      setTimeout(() => unwrapWords(), 500);
    };

    utterance.onpause = () => {
      setIsPaused(true);
      setIsPlaying(false);
    };

    utterance.onresume = () => {
      setIsPaused(false);
      setIsPlaying(true);
    };

    utterance.onerror = (error) => {
      console.error('TTS Error:', error);
      setIsPlaying(false);
      setIsPaused(false);
      clearHighlights();
      unwrapWords();
    };

    window.speechSynthesis.speak(utterance);
  }, [contentRef, isPaused, speed, currentVoice, wrapWords, highlightWord, clearHighlights, unwrapWords]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    clearHighlights();
    setTimeout(() => unwrapWords(), 100);
  }, [clearHighlights, unwrapWords]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const handleSetVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setCurrentVoice(voice);
  }, []);

  const handleSetSpeed = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      clearHighlights();
      unwrapWords();
    };
  }, [clearHighlights, unwrapWords]);

  return {
    isPlaying,
    isPaused,
    currentVoice,
    availableVoices,
    speed,
    play,
    pause,
    stop,
    toggle,
    setVoice: handleSetVoice,
    setSpeed: handleSetSpeed,
  };
};
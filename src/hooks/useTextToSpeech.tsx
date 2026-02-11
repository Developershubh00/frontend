import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTextToSpeechOptions {
  autoScroll?: boolean;
  highlightColor?: string;
  scrollOffset?: number;
}

interface UseTextToSpeechReturn {
  isPlaying: boolean;
  isPaused: boolean;
  currentWordIndex: number;
  currentCharIndex: number;
  play: () => void;
  pause: () => void;
  stop: () => void;
  toggle: () => void;
}

export const useTextToSpeech = (
  contentRef: React.RefObject<HTMLElement>,
  options: UseTextToSpeechOptions = {}
): UseTextToSpeechReturn => {
  const {
    autoScroll = true,
    highlightColor = 'rgb(96, 165, 250)', // light blue
    scrollOffset = 100
  } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const textNodesRef = useRef<Text[]>([]);
  const originalTextRef = useRef<string[]>([]);

  // Extract all text nodes from the content
  const extractTextNodes = useCallback((element: HTMLElement): Text[] => {
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip empty text nodes and script/style elements
          if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (parent?.tagName === 'SCRIPT' || parent?.tagName === 'STYLE') {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }
    return textNodes;
  }, []);

  // Restore original text
  const restoreOriginalText = useCallback(() => {
    textNodesRef.current.forEach((node, index) => {
      if (originalTextRef.current[index]) {
        node.textContent = originalTextRef.current[index];
      }
    });
  }, []);

  // Highlight text with character-by-character animation
  const highlightText = useCallback((charIndex: number) => {
    let currentIndex = 0;
    
    textNodesRef.current.forEach((node, nodeIndex) => {
      const text = originalTextRef.current[nodeIndex];
      const nodeLength = text.length;
      
      if (charIndex >= currentIndex && charIndex < currentIndex + nodeLength) {
        // This node contains the current character
        const localCharIndex = charIndex - currentIndex;
        const before = text.substring(0, localCharIndex);
        const current = text.charAt(localCharIndex);
        const after = text.substring(localCharIndex + 1);
        
        // Create highlighted text
        const span = document.createElement('span');
        span.innerHTML = `${before}<span style="background-color: ${highlightColor}; color: #1e3a8a; transition: background-color 0.1s ease;">${current}</span>${after}`;
        
        // Replace text node with span
        if (node.parentNode) {
          node.parentNode.replaceChild(span, node);
          textNodesRef.current[nodeIndex] = span.firstChild as Text;
        }
      } else if (charIndex > currentIndex + nodeLength) {
        // Already passed this node, show it as read
        const span = document.createElement('span');
        span.textContent = text;
        span.style.opacity = '0.7';
        
        if (node.parentNode) {
          node.parentNode.replaceChild(span, node);
          textNodesRef.current[nodeIndex] = span.firstChild as Text;
        }
      }
      
      currentIndex += nodeLength;
    });
  }, [highlightColor]);

  // Auto-scroll to current position
  const scrollToCurrentPosition = useCallback(() => {
    if (!autoScroll || !contentRef.current) return;
    
    const highlightedElement = contentRef.current.querySelector(
      `span[style*="${highlightColor}"]`
    );
    
    if (highlightedElement) {
      const elementRect = highlightedElement.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - (window.innerHeight / 2) + scrollOffset;
      
      window.scrollTo({
        top: middle,
        behavior: 'smooth'
      });
    }
  }, [autoScroll, contentRef, highlightColor, scrollOffset]);

  // Animate character highlighting
  const animateHighlight = useCallback((duration: number) => {
    const totalChars = originalTextRef.current.join('').length;
    
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }
      
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const charIndex = Math.floor(progress * totalChars);
      
      setCurrentCharIndex(charIndex);
      highlightText(charIndex);
      scrollToCurrentPosition();
      
      if (progress < 1 && isPlaying) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [highlightText, isPlaying, scrollToCurrentPosition]);

  const play = useCallback(() => {
    if (!contentRef.current) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Extract text nodes and save original text
    textNodesRef.current = extractTextNodes(contentRef.current);
    originalTextRef.current = textNodesRef.current.map(node => node.textContent || '');
    
    const fullText = originalTextRef.current.join('');
    const utterance = new SpeechSynthesisUtterance(fullText);
    utteranceRef.current = utterance;

    utterance.rate = 0.9; // Slightly slower for better sync
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Calculate approximate duration
    const wordsPerMinute = 150;
    const wordCount = fullText.split(/\s+/).length;
    const durationMs = (wordCount / wordsPerMinute) * 60 * 1000;

    utterance.onstart = () => {
      startTimeRef.current = 0;
      animateHighlight(durationMs);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentWordIndex(-1);
      setCurrentCharIndex(0);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      restoreOriginalText();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      restoreOriginalText();
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  }, [contentRef, isPaused, extractTextNodes, animateHighlight, restoreOriginalText]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentWordIndex(-1);
    setCurrentCharIndex(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    restoreOriginalText();
  }, [restoreOriginalText]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else if (isPaused) {
      play();
    } else {
      play();
    }
  }, [isPlaying, isPaused, play, pause]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      restoreOriginalText();
    };
  }, [restoreOriginalText]);

  return {
    isPlaying,
    isPaused,
    currentWordIndex,
    currentCharIndex,
    play,
    pause,
    stop,
    toggle
  };
};
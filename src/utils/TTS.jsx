import React, { useEffect, useState } from "react";

export default function TTS({ text, voiceName = "Google español", rate = 1, pitch = 1, className = "" }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speakQueue = (fragments) => {
    if (!fragments.length) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(fragments[0]);
    utterance.lang = "es-ES";
    utterance.rate = rate;
    utterance.pitch = pitch;

    const selectedVoice = voices.find((v) => v.name === voiceName);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      speakQueue(fragments.slice(1)); // Llamar recursivamente con el resto
    };

    utterance.onerror = (e) => {
      console.error("Error de TTS:", e.error);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSpeak = () => {
    if (!text) return;

    // Dividir en frases por punto, coma, punto y coma, signos de exclamación o interrogación
    const fragments = text
      .split(/(?<=[.?!;])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    setIsSpeaking(true);
    setQueue(fragments);
    window.speechSynthesis.cancel(); // Por si estaba hablando antes
    speakQueue(fragments);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setQueue([]);
  };

  return (
    <button
      onClick={isSpeaking ? handleStop : handleSpeak}
      className={`inline-flex items-center p-1 text-blue-600 hover:text-blue-800 ${className}`}
      title={isSpeaking ? "Detener" : "Escuchar"}
    >
      {isSpeaking ? (
        <span className="relative">
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
        </span>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
        </svg>
      )}
    </button>
  );
}

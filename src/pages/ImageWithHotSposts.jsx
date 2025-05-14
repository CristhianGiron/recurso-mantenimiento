import { InformationCircleIcon } from "@heroicons/react/outline";
import { div } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function Tooltip({ children, position }) {
  return createPortal(
    <div
      className="absolute w-48 bg-white text-sm text-gray-800 p-2 rounded shadow border border-gray-200 z-[9999]"
      style={{
        top: position.top,
        left: position.left + 100,
        transform: "translate(-50%, -100%)",
      }}
    >
      {children}
    </div>,
    document.body
  );
}

function Hotspot({ x, y, text }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (visible && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
  }, [visible]);

  return (
    <div
      className="absolute"
      style={{
        top: `${y}%`,
        left: `${x}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative flex items-center justify-center">
        <button
          ref={buttonRef}
          className="bg-blue-600 text-white rounded-full w-6 h-6 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 z-10"
          onClick={() => setVisible(!visible)}
          aria-label="Mostrar información"
        >
          ?
        </button>

        {visible && <Tooltip position={position}>{text}</Tooltip>}
      </div>
    </div>
  );
}

export default function ImageWithHotspots({ src, alt, hotspots }) {
      const [showTooltip, setShowTooltip] = useState(false);
      const tooltipRef = useRef(null);
    
      // Cierra el tooltip al hacer clic fuera
      useEffect(() => {
        function handleClickOutside(event) {
          if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
            setShowTooltip(false);
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
  return (
    <div className="max-w-5xl mx-auto p-4 bg-white rounded-lg shadow-lg text-black overflow-hidden">
   <h1 className="text-md font-bold mb-6 flex items-center gap-2 relative">
          💻 Juego interactivo
          <span
            className="relative cursor-pointer"
            onClick={() => setShowTooltip(!showTooltip)}
            ref={tooltipRef}
          >
            <InformationCircleIcon className="w-5 text-blue-600" />
            {showTooltip && (
              <div className="absolute left-full top-10 -translate-y-1/2 ml-2 w-64 bg-white border border-gray-300 p-2 text-sm text-gray-800 rounded shadow z-50">
              Haz click en los botones para ver el nombre o descripción del componente.
              </div>
            )}
          </span>
        </h1>
      <div className="relative inline-block">
        <img src={src} alt={alt} className="w-full h-auto rounded-lg" />

        {hotspots.map((spot, index) => (
          <Hotspot key={index} x={spot.x} y={spot.y} text={spot.text} />
        ))}
      </div>
    </div>
  );
}

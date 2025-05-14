import React, { useState, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import aire from "../images/aire.png";
import brocha from "../images/brocha.png";
import pano from "../images/paño.png";
import alcohol from "../images/alcohol.png";
import destornillador from "../images/destornillador.png";
import confetti from "canvas-confetti";
import { InformationCircleIcon } from "@heroicons/react/outline";

// Lista de productos con imágenes y nombres
const PRODUCTS = [
  {
    id: "1",
    name: "Aire Comprimido",
    imageUrl: aire,
  },
  {
    id: "2",
    name: "Brocha suave",
    imageUrl: brocha,
  },
  {
    id: "3",
    name: "Paño de microfibra",
    imageUrl: pano,
  },
  {
    id: "4",
    name: "Alcohol isopropilico",
    imageUrl: alcohol,
  },
  {
    id: "5",
    name: "Destornillador",
    imageUrl: destornillador,
  },
];

const ProductName = ({ product, onSelect, isSelected, isMatched }) => {
  const handleClick = () => {
    if (!isMatched) onSelect(product);
  };

  return (
    <div
      onClick={handleClick}
      className={`p-2 text-xs text-white rounded-md shadow-md cursor-pointer transform transition-all 
        ${
          isMatched
            ? "bg-gray-400 opacity-50 cursor-not-allowed"
            : "bg-blue-600"
        }
        ${isSelected ? "scale-90" : "scale-100"}
      `}
    >
      {product.name}
    </div>
  );
};

const ProductDropBox = ({ product, onDrop, accepted }) => {
  return (
    <div
      onClick={() => onDrop(product)}
      className={`flex flex-col items-center p-4 rounded-md border-2 transition-all ${
        accepted ? "bg-green-800" : "bg-gray-800 text-gray-400"
      }`}
    >
      <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-md">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          "???"
        )}
      </div>
      {accepted && (
        <div className="mt-2 font-semibold text-white">{product.name}</div>
      )}
    </div>
  );
};

const MatchingGame = () => {
  const [matched, setMatched] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [score, setScore] = useState(0);
    const [showParticles, setShowParticles] = useState(false);

  // Componente para confeti
  const ParticleExplosion = ({ trigger }) => {
    const fire = (particleRatio, opts) => {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
      };
  
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    };
  
    useEffect(() => {
      if (trigger) {
        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
      }
    }, [trigger]);
  
    return <div className="absolute inset-0 pointer-events-none z-50" />;
  };

  const resetGame = () => {
    setMatched([]);
    setSelectedProduct(null);
    setScore(0);
  };

  // Detectar si el dispositivo es táctil
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(window.innerWidth <= 768);
    };

    checkTouchDevice();
    window.addEventListener("resize", checkTouchDevice);
    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  const handleSelect = (product) => {
    if (matched.includes(product.id)) return; // ❌ No permitir si ya está emparejado

    if (selectedProduct) {
      const isMatch = selectedProduct.name === product.name;
      const isAlreadyMatched = matched.includes(product.id);

      if (isMatch && !isAlreadyMatched) {
        setMatched((prev) => [...prev, product.id]);
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 1000);
        setScore((prev) => prev + 10);
      } else {
        setScore((prev) => prev - 10);
      }

      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
    }
  };

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
    <DndProvider backend={HTML5Backend}>
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
                Haz click en el nombre y luego en la imagen que le corresponde
                no te equivoques o perderas puntos. ¡Exitos!
              </div>
            )}
          </span>
        </h1>
        <div className="text-center mb-6 text-lg font-semibold">
          Puntuación: {score}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-6">
          {PRODUCTS.map((product) => (
            <ProductDropBox
              key={product.id}
              product={product}
              onDrop={handleSelect}
              accepted={matched.includes(product.id)}
            />
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-sm font-semibold mb-2">Selecciona un Nombre</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {PRODUCTS.map((product) => (
              <ProductName
                key={product.id}
                product={product}
                onSelect={handleSelect}
                isSelected={
                  selectedProduct && selectedProduct.id === product.id
                }
                isMatched={matched.includes(product.id)} // ✅ NUEVO
              />
            ))}
          </div>
        </div>
        <ParticleExplosion trigger={showParticles} />
        {matched.length === PRODUCTS.length && (
          <div className="text-center text-xl mt-6 font-bold animate-bounce">
            🎉 ¡Has emparejado todos los productos correctamente! Puntuación
            final: {score}
          </div>
        )}
        <div className="text-center mt-6">
          <button
            onClick={resetGame}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-all"
          >
            🔄 Reiniciar Juego
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default MatchingGame;

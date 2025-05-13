// src/utils/playSound.js
export function playSound(url, volume = 0.05) {
    const audio = new Audio(url);
    audio.volume = volume; // 0.0 a 1.0 → 0.5 = 50%
    audio.play().catch(() => {}); // Evita errores si el navegador bloquea la reproducción
  }
  
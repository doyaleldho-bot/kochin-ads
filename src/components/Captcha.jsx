
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { RefreshCw } from 'lucide-react';

const Captcha = forwardRef(({ onVerify }, ref) => {
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [canvasRef, setCanvasRef] = useState(null);

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaCode(code);
    setUserInput('');
    onVerify(false);
    return code;
  };

  useImperativeHandle(ref, () => ({
    reset: generateCaptcha
  }));

  useEffect(() => {
    if (!canvasRef) return;
    const canvas = canvasRef;
    const ctx = canvas.getContext('2d');
    
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Noise (Lines)
    for (let i = 0; i < 7; i++) {
      ctx.strokeStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.5)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
    
    // Noise (Dots)
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.5)`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Text
    ctx.font = 'bold 24px Courier New';
    ctx.fillStyle = '#1e293b';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    
    // Draw each char with slight rotation
    const charWidth = canvas.width / 6;
    for(let i=0; i<6; i++) {
        ctx.save();
        ctx.translate(15 + i * charWidth, canvas.height/2);
        ctx.rotate((Math.random() - 0.5) * 0.4);
        ctx.fillText(captchaCode[i], 0, 0);
        ctx.restore();
    }

  }, [captchaCode, canvasRef]);

  // Initial generation
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setUserInput(val);
    if (val === captchaCode) {
        onVerify(true);
    } else {
        onVerify(false);
    }
  };

  return (
    <div className="space-y-2">
        <div className="flex items-center gap-2">
            <canvas 
                ref={setCanvasRef} 
                width={200} 
                height={50} 
                className="rounded border border-slate-300 cursor-pointer"
                onClick={generateCaptcha}
                title="Click to refresh"
            />
            <button 
                type="button" 
                onClick={generateCaptcha}
                className="p-2 text-slate-500 hover:text-blue-600 transition-colors"
            >
                <RefreshCw className="w-5 h-5" />
            </button>
        </div>
        <input 
            type="text" 
            placeholder="Enter security code" 
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={userInput}
            onChange={handleChange}
        />
    </div>
  );
});

export default Captcha;

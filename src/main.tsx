import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Code, ArrowRight, Star, X, Heart, Sparkles } from 'lucide-react';

// --- Global CSS Injection for specialized effects ---
const GlobalStyles = () => (
  <style>{`
    .font-marker { font-family: 'Permanent Marker', cursive; }
    .font-mono { font-family: 'Roboto Mono', monospace; }
    .font-impact { font-family: 'Anton', sans-serif; }
    
    body {
      cursor: none; /* Hide default cursor */
    }

    .clip-jagged {
      clip-path: polygon(
        0% 0%, 100% 0%, 100% 85%, 95% 90%, 100% 100%, 
        50% 100%, 45% 95%, 0% 100%, 0% 15%, 5% 10%
      );
    }
    
    .clip-slant-left {
      clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
    }
    
    .clip-slant-right {
      clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
    }

    .bg-halftone {
      background-image: radial-gradient(#000 20%, transparent 20%), radial-gradient(#000 20%, transparent 20%);
      background-color: #D91818;
      background-position: 0 0, 4px 4px;
      background-size: 8px 8px;
    }

    .bg-halftone-white {
      background-image: radial-gradient(#ccc 20%, transparent 20%), radial-gradient(#ccc 20%, transparent 20%);
      background-position: 0 0, 4px 4px;
      background-size: 8px 8px;
    }

    .text-stroke {
      -webkit-text-stroke: 2px white;
      color: transparent;
    }
    
    .text-stroke-black {
      -webkit-text-stroke: 2px black;
      color: transparent;
    }

    .glitch-text {
      position: relative;
    }
    
    .glitch-text::before, .glitch-text::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #1a1a1a;
    }
    
    .glitch-text::before {
      left: 2px;
      text-shadow: -1px 0 #ff00c1;
      clip: rect(44px, 450px, 56px, 0);
      animation: glitch-anim 5s infinite linear alternate-reverse;
    }
    
    .glitch-text::after {
      left: -2px;
      text-shadow: -1px 0 #00fff9;
      clip: rect(44px, 450px, 56px, 0);
      animation: glitch-anim2 1s infinite linear alternate-reverse;
    }

    @keyframes glitch-anim {
      0% { clip: rect(31px, 9999px, 10px, 0); }
      20% { clip: rect(86px, 9999px, 9px, 0); }
      40% { clip: rect(14px, 9999px, 58px, 0); }
      60% { clip: rect(62px, 9999px, 34px, 0); }
      80% { clip: rect(28px, 9999px, 91px, 0); }
      100% { clip: rect(75px, 9999px, 15px, 0); }
    }

    @keyframes grain {
      0%, 100% { transform:translate(0, 0) }
      10% { transform:translate(-5%, -10%) }
      20% { transform:translate(-15%, 5%) }
      30% { transform:translate(7%, -25%) }
      40% { transform:translate(-5%, 25%) }
      50% { transform:translate(-15%, 10%) }
      60% { transform:translate(15%, 0%) }
      70% { transform:translate(0%, 15%) }
      80% { transform:translate(3%, 35%) }
      90% { transform:translate(-10%, 10%) }
    }

    .noise-overlay {
      position: fixed;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
      animation: grain 8s steps(10) infinite;
      opacity: 0.15;
    }
  `}</style>
);

// --- Components ---

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-[#D91818] rotate-45 z-[10000] pointer-events-none mix-blend-difference"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16, rotate: [45, 90, 45] }}
        transition={{ rotate: { duration: 2, repeat: Infinity }, type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#FFE600] z-[10000] pointer-events-none"
        animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
        transition={{ type: "spring", stiffness: 1000, damping: 50 }}
      />
    </>
  );
};

const StarBg = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#080808]">
      {/* Static Noise Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />
      
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#333]"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            scale: 0,
            rotate: 0 
          }}
          animate={{ 
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          <Star fill={i % 2 === 0 ? "#D91818" : "#555"} size={20 + Math.random() * 40} className="opacity-30" />
        </motion.div>
      ))}
      
      {/* Large Geometric Shapes moving */}
      <motion.div 
        className="absolute w-[150vh] h-[100px] bg-[#D91818]/20 -rotate-45 top-1/2 -left-1/4 blur-xl"
        animate={{ x: ['-10%', '10%'], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
    </div>
  );
};

const NavBar = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-start pointer-events-none"
      initial={{ y: -150 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 1 }}
    >
      <div className="pointer-events-auto cursor-pointer group" onClick={() => setActivePage('home')}>
        <div className="bg-black text-white p-2 px-4 transform -skew-x-12 border-2 border-white shadow-[5px_5px_0px_#D91818] group-hover:shadow-[8px_8px_0px_#FFE600] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200">
          <span className="font-impact text-3xl tracking-widest block transform skew-x-12 group-hover:text-[#FFE600]">PHANTOM <span className="text-[#D91818] group-hover:text-white">CODE</span></span>
        </div>
      </div>
      
      <div className="flex gap-6 pointer-events-auto perspective-500">
        {['Blog', 'Projects', 'About'].map((item, idx) => (
          <motion.button
            key={item}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ delay: 1.2 + idx * 0.1, type: "spring" }}
            whileHover={{ 
              scale: 1.1, 
              rotate: Math.random() * 10 - 5,
              backgroundColor: "#000",
              color: "#D91818",
              borderColor: "#D91818"
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActivePage('home')}
            className="bg-white text-black font-impact tracking-wide text-xl px-6 py-2 border-2 border-black transform skew-x-[-15deg] shadow-[4px_4px_0px_rgba(0,0,0,0.5)] transition-colors duration-200"
          >
            <span className="block transform skew-x-[15deg]">{item}</span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

interface BlogPostCardProps {
  title: string;
  category: string;
  date: string;
  onClick: () => void;
  index: number;
}

const BlogPostCard = ({ title, category, date, onClick, index }: BlogPostCardProps) => {
  return (
    <motion.div
      layoutId={`card-${index}`}
      onClick={onClick}
      initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0, rotate: index % 2 === 0 ? -10 : 10 }}
      whileInView={{ x: 0, opacity: 1, rotate: index % 2 === 0 ? -2 : 2 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        scale: 1.02, 
        rotate: 0, 
        zIndex: 20,
      }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
      className="cursor-pointer relative group w-full max-w-3xl mx-auto mb-16"
    >
      {/* Dynamic jagged background that appears on hover */}
      <div className="absolute inset-0 bg-[#D91818] transform scale-x-0 group-hover:scale-x-110 group-hover:scale-y-110 group-hover:rotate-2 transition-transform duration-300 ease-out clip-jagged z-0" />
      
      {/* Shadow Block */}
      <div className="absolute inset-0 bg-black transform translate-x-3 translate-y-3 -skew-x-6 z-0 transition-transform group-hover:translate-x-5 group-hover:translate-y-5" />
      
      {/* Main Card Content */}
      <div className="relative bg-white border-4 border-black p-8 transform -skew-x-6 overflow-hidden z-10 group-hover:bg-black group-hover:text-white group-hover:border-white transition-colors duration-300">
        
        {/* Category Tag */}
        <div className="flex justify-between items-center mb-6 transform skew-x-6">
          <span className="bg-black text-white px-3 py-1 font-mono font-bold text-sm group-hover:bg-white group-hover:text-black transition-colors">
            //{category}
          </span>
          <span className="font-mono text-sm font-bold opacity-60 group-hover:opacity-100 group-hover:text-[#FFE600]">{date}</span>
        </div>
        
        {/* Title with Glitch effect on hover */}
        <h3 className="text-5xl md:text-6xl font-impact uppercase mb-4 transform skew-x-6 leading-[0.9] group-hover:text-[#D91818] transition-colors relative">
          <span className="relative z-10">{title}</span>
        </h3>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-6 transform skew-x-6 border-t-2 border-gray-200 pt-4 group-hover:border-[#333]">
           <div className="flex items-center gap-2">
              <Sparkles size={18} className="group-hover:text-[#FFE600]" />
              <span className="font-marker text-xl group-hover:text-white">TAKE YOUR HEART</span>
           </div>
           <ArrowRight className="group-hover:translate-x-4 group-hover:text-[#D91818] transition-all" size={32} />
        </div>

        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>
    </motion.div>
  );
};

const CodeBlock = ({ code, title }: { code: string; title: string }) => (
  <div className="my-12 relative font-mono text-sm transform rotate-1 mx-auto max-w-3xl group">
    {/* Background decorations */}
    <div className="absolute -inset-2 bg-[#FFE600] transform -rotate-1 skew-x-3" />
    <div className="absolute -inset-2 bg-[#D91818] transform rotate-1 skew-y-2 mix-blend-multiply" />
    
    <div className="relative bg-[#080808] border-2 border-white p-6 text-gray-300 overflow-hidden shadow-[10px_10px_0px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between border-b border-gray-700 pb-4 mb-4 text-[#D91818] font-bold items-center">
        <span className="font-impact tracking-widest text-xl text-white">{title}</span>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rotate-45"/>
          <div className="w-3 h-3 bg-yellow-500 rotate-45"/>
          <div className="w-3 h-3 bg-blue-500 rotate-45"/>
        </div>
      </div>
      <pre className="overflow-x-auto custom-scrollbar p-2"><code>{code}</code></pre>
      
      {/* Code block styling accent */}
      <div className="absolute bottom-0 right-0 p-2 opacity-20 pointer-events-none">
        <Code size={100} className="text-white" />
      </div>
    </div>
  </div>
);

const ArticleView = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-50 bg-white overflow-y-auto cursor-auto"
    >
      <CustomCursor />
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[60] bg-black text-white w-16 h-16 flex items-center justify-center rounded-none transform rotate-45 hover:bg-[#D91818] hover:scale-110 hover:rotate-90 transition-all border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
      >
        <X size={32} className="-rotate-45" />
      </button>

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-[#D91818] min-h-[40vh] flex items-center justify-center relative overflow-hidden p-8 bg-halftone">
          <motion.div 
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10 max-w-5xl w-full"
          >
             <motion.span 
               initial={{ x: -100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="bg-black text-white px-4 py-1 font-mono text-lg mb-4 inline-block transform -skew-x-12"
             >
               CONFIDENTIAL // CSS_TRICKS
             </motion.span>
             <h1 className="text-7xl md:text-9xl font-impact text-white uppercase tracking-tighter transform -skew-x-6 leading-[0.85] drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]">
               前端开发中的<br/>
               <span className="text-black text-stroke stroke-white">CSS 动画技巧</span>
             </h1>
          </motion.div>
          
          {/* Animated Background Elements */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -bottom-20 w-[500px] h-[500px] bg-black opacity-10 border-[20px] border-dashed border-white rounded-full"
          />
        </div>

        {/* Content Body */}
        <div className="flex-1 bg-white relative max-w-5xl mx-auto w-full p-8 md:p-20 shadow-2xl -mt-20 mb-20 transform skew-x-0 border-4 border-black">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[60px] border-t-black border-r-[60px] border-r-transparent" />
          <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[60px] border-b-[#D91818] border-l-[60px] border-l-transparent" />

          {/* Intro */}
          <div className="mb-16 flex gap-8 items-start">
            <div className="hidden md:block text-8xl font-impact text-[#eee] leading-none select-none">P5</div>
            <div>
              <p className="font-marker text-3xl text-[#D91818] mb-6 transform -rotate-1">
                "Take Your Heart! 别让你的网页像僵尸一样死板。"
              </p>
              <p className="text-xl leading-relaxed font-sans text-gray-800 font-medium">
                在当今的Web开发中，动画不再仅仅是装饰，它是用户体验的核心。作为一名追求极致的前端怪盗，我们需要掌握那些能瞬间抓住用户眼球的视觉秘技。本文将展示三种风格迥异且极具冲击力的CSS动画。
              </p>
            </div>
          </div>

          {/* Technique 1 */}
          <section className="mb-24">
            <div className="flex items-end gap-4 mb-8 border-b-4 border-black pb-2">
               <span className="text-8xl font-impact leading-[0.7] text-[#D91818]">01</span>
               <h2 className="text-4xl font-impact uppercase">The Phantom Glitch</h2>
            </div>
            
            <p className="mb-8 text-lg">
              故障艺术（Glitch Art）是赛博朋克和P5美学的核心。通过 `clip-path` 和关键帧动画，我们可以模拟信号不稳定的视觉干扰。
            </p>
            
            <div className="p-16 bg-[#111] flex justify-center items-center mb-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-halftone opacity-20" />
              <div 
                className="text-6xl md:text-8xl font-black uppercase relative inline-block text-white glitch-text cursor-default transform transition-transform group-hover:scale-110" 
                data-text="ERROR_404"
              >
                ERROR_404
              </div>
            </div>

            <CodeBlock 
              title="CSS Glitch Effect"
              code={`/* 定义基础文字 */
.glitch {
  position: relative;
  animation: glitch-skew 1s infinite linear alternate-reverse;
}

/* 创建两个重影层 */
.glitch::before, .glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 #ff00c1;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -2px 0 #00fff9;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 1s infinite linear alternate-reverse;
}`}
            />
          </section>

          {/* Technique 2 */}
          <section className="mb-24">
            <div className="flex items-end gap-4 mb-8 border-b-4 border-black pb-2">
               <span className="text-8xl font-impact leading-[0.7] text-[#FFE600] text-stroke-black">02</span>
               <h2 className="text-4xl font-impact uppercase">All-Out Attack Hover</h2>
            </div>
            <p className="mb-8 text-lg">
              普通的悬停太无聊了。我们需要那种“甚至不需要点击就知道它被激活了”的感觉。结合 `skew`（倾斜）和 `translate`（位移）制造强烈的动能。
            </p>

            <div className="p-16 bg-white border-4 border-dashed border-gray-300 flex justify-center items-center mb-8 relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20" />
              <button className="relative px-12 py-4 bg-[#D91818] text-white font-impact tracking-[0.2em] text-2xl uppercase border-4 border-black group overflow-hidden hover:scale-110 transition-transform duration-200 shadow-[8px_8px_0px_#000]">
                <span className="relative z-20 group-hover:text-black transition-colors">CONFIRM</span>
                
                {/* Animated background fill */}
                <div className="absolute inset-0 bg-[#FFE600] transform translate-x-[-100%] skew-x-[-20deg] group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-10" />
                
                {/* Flash effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:animate-ping z-0" />
              </button>
            </div>

            <CodeBlock 
              title="Kinetic Button CSS"
              code={`.btn-kinetic {
  transform: skew(-10deg);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-kinetic:hover {
  transform: skew(-10deg) scale(1.1) rotate(-2deg);
  box-shadow: 5px 5px 0px #FFF;
}

.btn-kinetic::after {
  /* 扫光效果 */
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: #FFE600;
  transform: skewX(-15deg);
  transition: transform 0.3s;
}

.btn-kinetic:hover::after {
  transform: skewX(-15deg) translate(100%, 0);
}`}
            />
          </section>

          {/* Technique 3 */}
          <section className="mb-12">
             <div className="flex items-end gap-4 mb-8 border-b-4 border-black pb-2">
               <span className="text-8xl font-impact leading-[0.7] text-black">03</span>
               <h2 className="text-4xl font-impact uppercase">The Reveal Mask</h2>
            </div>
            <p className="mb-8 text-lg">
              利用 `clip-path` 或 `mask-image` 创建非矩形的展开效果。非常适合图片展示或卡片入场。
            </p>

            <div className="p-12 bg-gray-100 border-2 border-black flex justify-center items-center mb-8">
               <div className="relative w-full max-w-md aspect-video bg-black group cursor-pointer overflow-hidden border-4 border-black">
                 <div className="absolute inset-0 flex items-center justify-center text-white font-impact text-4xl z-10 pointer-events-none mix-blend-difference">
                   HOVER ME
                 </div>
                 <img 
                   src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                   className="absolute inset-0 w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
                   style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }} 
                 />
                 {/* React inline style simulated for CSS */}
                 <style>{`
                   .group:hover img {
                     clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%) !important;
                   }
                 `}</style>
               </div>
            </div>

             <CodeBlock 
              title="Clip-Path Reveal"
              code={`.reveal-card {
  clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); /* 初始隐藏 */
  transition: clip-path 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}

.reveal-card:hover {
  /* 完整的锯齿状展开 */
  clip-path: polygon(
    0% 0%, 100% 0%, 100% 100%, 
    80% 90%, 60% 100%, 40% 90%, 20% 100%, 0% 90%
  );
}`}
            />
          </section>
          
          <div className="mt-24 border-t-4 border-black pt-12 text-center relative">
             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                <Star fill="black" size={40} />
             </div>
            <p className="font-marker text-3xl transform -rotate-2 hover:scale-110 transition-transform inline-block cursor-pointer">THE SHOW'S OVER.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden perspective-1000">
      
      {/* Background Geometric Shapes - Composition improvements */}
      <div className="absolute inset-0 bg-[#080808]">
         {/* Right Red Panel */}
         <motion.div 
           initial={{ x: '100%' }}
           animate={{ x: '20%' }}
           transition={{ duration: 0.8, ease: "circOut" }}
           className="absolute top-0 right-0 w-[80%] h-full bg-[#D91818] clip-slant-right z-0" 
         >
           <div className="absolute inset-0 bg-halftone opacity-30" />
         </motion.div>
         
         {/* Left Yellow accent */}
         <motion.div 
           initial={{ x: '-100%' }}
           animate={{ x: '-30%' }}
           transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
           className="absolute bottom-0 left-0 w-[60%] h-[40%] bg-[#FFE600] clip-slant-left z-1"
         />
      </div>

      {/* Typography Composition */}
      <div className="z-10 relative w-full max-w-7xl h-[60vh] flex items-center justify-center">
        
        {/* Layer 1: WAKE UP (Back, Huge, Darker/Subtle) */}
        <motion.h1 
          style={{ y: y1 }}
          initial={{ opacity: 0, scale: 0.8, x: -100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-10 left-4 md:left-20 text-[12rem] md:text-[16rem] font-impact leading-none text-white select-none pointer-events-none tracking-tighter z-10"
        >
          WAKE UP
        </motion.h1>

        {/* Layer 2: GET UP (Middle, RGB Split Pulse - No Shaking) */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="absolute top-1/3 left-1/4 md:left-1/3 z-20 group"
        >
          {/* Red Channel Echo */}
          <motion.h1
             className="absolute top-0 left-0 text-8xl md:text-[10rem] font-impact leading-none text-[#D91818] opacity-0 mix-blend-screen pointer-events-none"
             animate={{ 
               x: [0, -8, 0, -4, 0],
               opacity: [0, 0.8, 0, 0.5, 0]
             }}
             transition={{ 
               duration: 4, 
               times: [0, 0.02, 0.05, 0.08, 1], 
               repeat: Infinity, 
               repeatDelay: 1 
             }}
          >
            GET UP
          </motion.h1>

          {/* Cyan Channel Echo */}
          <motion.h1
             className="absolute top-0 left-0 text-8xl md:text-[10rem] font-impact leading-none text-[#00FFFF] opacity-0 mix-blend-screen pointer-events-none"
             animate={{ 
               x: [0, 8, 0, 4, 0],
               opacity: [0, 0.8, 0, 0.5, 0]
             }}
             transition={{ 
               duration: 4, 
               times: [0, 0.02, 0.05, 0.08, 1], 
               repeat: Infinity, 
               repeatDelay: 1 
             }}
          >
            GET UP
          </motion.h1>

          {/* Main Text with Breathing Scale */}
          <motion.h1 
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-8xl md:text-[10rem] font-impact leading-none text-stroke pointer-events-none relative z-10"
          >
            GET UP
          </motion.h1>
        </motion.div>

        {/* Layer 3: GET OUT (Front, Sticker Style) */}
        <motion.div
          initial={{ scale: 3, opacity: 0, rotate: 20 }}
          animate={{ scale: 1, opacity: 1, rotate: -5 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
          className="absolute bottom-20 right-4 md:right-20 z-30"
        >
           <motion.div 
             whileHover={{ scale: 1.1, rotate: 0 }}
             className="bg-black text-[#D91818] p-6 px-10 clip-jagged shadow-[10px_10px_0px_#fff] transition-transform cursor-pointer"
           >
             <h1 className="text-7xl md:text-9xl font-impact leading-none tracking-wide">
               GET OUT
             </h1>
           </motion.div>
        </motion.div>
      </div>

      {/* Intro Card */}
      <motion.div 
        style={{ y: y2 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-10 md:left-20 z-20 bg-white border-4 border-black p-4 max-w-xs transform rotate-2"
      >
         <p className="font-mono text-lg font-bold border-b-2 border-black mb-2 pb-1">
           PHANTOM THIEVES OF HEARTS
         </p>
         <p className="font-marker text-xl text-[#D91818]">
           "We will take your boredom."
         </p>
      </motion.div>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global noise overlay
  const NoiseOverlay = () => (
    <div className="noise-overlay" />
  );

  const posts = [
    { 
      id: 1, 
      title: "CSS ANIMATION TECHNIQUES", 
      category: "DESIGN", 
      date: "2023.10.27",
      content: "article" 
    },
    { id: 2, title: "REACT STATE MANAGEMENT", category: "CODE", date: "2023.11.05" },
    { id: 3, title: "WEBGL FOR BEGINNERS", category: "GRAPHICS", date: "2023.11.12" },
    { id: 4, title: "THE ART OF UI", category: "THOUGHTS", date: "2023.11.20" },
  ];

  const handlePostClick = (post: typeof posts[0]) => {
    if (post.content === 'article') {
      setSelectedArticle(post);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-black overflow-hidden relative selection:bg-[#D91818] selection:text-white">
      <GlobalStyles />
      <NoiseOverlay />
      <CustomCursor />
      <StarBg />
      <NavBar setActivePage={setActivePage} />

      <main className="relative z-10 pb-20">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              
              <div className="container mx-auto px-4 mt-20 relative">
                {/* Section Divider */}
                <div className="w-full h-2 bg-[#D91818] mb-20 transform -skew-x-12" />
                
                {/* Section Title */}
                <div className="mb-20 flex items-center justify-center relative">
                   <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <span className="text-9xl font-impact text-white whitespace-nowrap">TARGET ACQUIRED</span>
                   </div>
                   <div className="bg-[#FFE600] border-4 border-black p-4 shadow-[8px_8px_0px_#D91818] transform -rotate-2 z-10">
                     <h2 className="text-6xl font-impact uppercase px-8 tracking-widest">Latest Heists</h2>
                  </div>
                </div>

                <div className="grid gap-2">
                  {posts.map((post, index) => (
                    <BlogPostCard 
                      key={post.id} 
                      index={index}
                      title={post.title}
                      category={post.category}
                      date={post.date}
                      onClick={() => handlePostClick(post)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Full Screen Article Overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleView onClose={() => setSelectedArticle(null)} />
        )}
      </AnimatePresence>
      
      {/* Footer Decoration */}
      <div className="fixed bottom-8 right-8 z-40">
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.2, rotate: 180 }}
          whileTap={{ scale: 0.8 }}
          className="bg-[#D91818] p-6 w-20 h-20 flex items-center justify-center rounded-full text-white border-4 border-black shadow-[0_0_0_4px_white,0_0_20px_rgba(217,24,24,0.8)]"
        >
           <Heart fill="black" className="text-black" size={32} />
        </motion.button>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
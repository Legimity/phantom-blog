import { motion } from 'framer-motion';
import { Star, X } from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import CodeBlock from '../components/CodeBlock';

type ArticleProps = {
  onClose: () => void;
};

const CssAnimationArticle = ({ onClose }: ArticleProps) => {
  return (
    <motion.div 
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-50 bg-white overflow-y-auto cursor-auto"
    >
      <CustomCursor />
      
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[60] bg-black text-white w-16 h-16 flex items-center justify-center rounded-none transform rotate-45 hover:bg-[#D91818] hover:scale-110 hover:rotate-90 transition-all border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
      >
        <X size={32} className="-rotate-45" />
      </button>

      <div className="min-h-screen flex flex-col">
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
          
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -bottom-20 w-[500px] h-[500px] bg-black opacity-10 border-[20px] border-dashed border-white rounded-full"
          />
        </div>

        <div className="flex-1 bg-white relative max-w-5xl mx-auto w-full p-8 md:p-20 shadow-2xl -mt-20 mb-20 transform skew-x-0 border-4 border-black">
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[60px] border-t-black border-r-[60px] border-r-transparent" />
          <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[60px] border-b-[#D91818] border-l-[60px] border-l-transparent" />

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

          <section className="mb-24">
            <div className="flex items-end gap-4 mb-8 border-b-4 border-black pb-2">
               <span className="text-8xl font-impact leading-[0.7] text-[#D91818]">01</span>
               <h2 className="text-4xl font-impact uppercase">The Phantom Glitch</h2>
            </div>
            
            <p className="mb-8 text-lg">
              故障艺术（Glitch Art）是赛博朋克和P5美学的核心。通过 <code>clip-path</code> 和关键帧动画，我们可以模拟信号不稳定的视觉干扰。
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

          <section className="mb-24">
            <div className="flex items-end gap-4 mb-8 border-b-4 border-black pb-2">
               <span className="text-8xl font-impact leading-[0.7] text-[#FFE600] text-stroke-black">02</span>
               <h2 className="text-4xl font-impact uppercase">All-Out Attack Hover</h2>
            </div>
            <p className="mb-8 text-lg">
              普通的悬停太无聊了。我们需要那种“甚至不需要点击就知道它被激活了”的感觉。结合 <code>skew</code>（倾斜）和 <code>translate</code>（位移）制造强烈的动能。
            </p>

            <div className="p-16 bg-white border-4 border-dashed border-gray-300 flex justify-center items-center mb-8 relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20" />
              <button className="relative px-12 py-4 bg-[#D91818] text-white font-impact tracking-[0.2em] text-2xl uppercase border-4 border-black group overflow-hidden hover:scale-110 transition-transform duration-200 shadow-[8px_8px_0px_#000]">
                <span className="relative z-20 group-hover:text-black transition-colors">CONFIRM</span>
                <div className="absolute inset-0 bg-[#FFE600] transform translate-x-[-100%] skew-x-[-20deg] group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-10" />
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

          <section className="mb-12">
             <div className="flex items-end gap-4 mb-8 border-b-4 border-black pb-2">
               <span className="text-8xl font-impact leading-[0.7] text-black">03</span>
               <h2 className="text-4xl font-impact uppercase">The Reveal Mask</h2>
             </div>
            <p className="mb-8 text-lg">
              利用 <code>clip-path</code> 或 <code>mask-image</code> 创建非矩形的展开效果。非常适合图片展示或卡片入场。
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

export default CssAnimationArticle;

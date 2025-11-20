import { motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import CustomCursor from '../components/CustomCursor';

type ArticleProps = {
  onClose: () => void;
};

const ReactStateArticle = ({ onClose }: ArticleProps) => {
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
        className="fixed top-8 right-8 z-[60] bg-black text-white w-16 h-16 flex items-center justify-center rounded-none transform rotate-45 hover:bg-[#1E90FF] hover:scale-110 hover:rotate-90 transition-all border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
      >
        <X size={32} className="-rotate-45" />
      </button>

      <div className="min-h-screen flex flex-col">
        <div className="bg-[#0F172A] min-h-[40vh] flex items-center justify-center relative overflow-hidden p-8">
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
              className="bg-white text-black px-4 py-1 font-mono text-lg mb-4 inline-block transform -skew-x-12"
            >
              PLAYBOOK // REACT_STATE
            </motion.span>
            <h1 className="text-7xl md:text-9xl font-impact text-white uppercase tracking-tighter transform -skew-x-6 leading-[0.85] drop-shadow-[8px_8px_0px_rgba(30,144,255,0.8)]">
              React State<br/>
              <span className="text-[#1E90FF] text-stroke stroke-white">管理作战手册</span>
            </h1>
          </motion.div>

          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -left-10 -bottom-20 w-[520px] h-[520px] bg-[#1E90FF]/20 border-[20px] border-dashed border-white rounded-full"
          />
        </div>

        <div className="flex-1 bg-white relative max-w-5xl mx-auto w-full p-8 md:p-20 shadow-2xl -mt-20 mb-20 transform skew-x-0 border-4 border-black">
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[60px] border-t-black border-r-[60px] border-r-transparent" />
          <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[60px] border-b-[#1E90FF] border-l-[60px] border-l-transparent" />

          <div className="mb-14 flex gap-8 items-start">
            <div className="hidden md:block text-8xl font-impact text-[#e5e7eb] leading-none select-none">S-T-A-T-E</div>
            <div>
              <p className="font-marker text-3xl text-[#1E90FF] mb-6 transform -rotate-1">
                "状态混乱 = 心之怪盗团的潜行破绽。"
              </p>
              <p className="text-xl leading-relaxed font-sans text-gray-800 font-medium">
                React 的状态管理，是让界面保持一致、流畅又可预期的核心。下面按作战步骤拆解，帮你判断何时用 <code>useState</code>，何时升级到 <code>useReducer</code> 或外部状态。
              </p>
            </div>
          </div>

          <section className="mb-16">
            <div className="flex items-end gap-4 mb-8 border-b-4 border-black pb-2">
               <span className="text-8xl font-impact leading-[0.7] text-[#1E90FF]">01</span>
               <h2 className="text-4xl font-impact uppercase">Local motion</h2>
            </div>
            <p className="mb-6 text-lg">
              单一组件的 UI 微动效，用 <code>useState</code> 最轻量。保持状态靠近使用它的地方，减少跨组件依赖。
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#0F172A] text-white p-6 border-4 border-black transform -skew-x-2 shadow-[8px_8px_0px_#1E90FF]">
                <p className="font-impact text-2xl mb-2">Signals</p>
                <p className="text-sm opacity-80">按钮 hover、输入框值、展开/折叠状态。</p>
              </div>
              <div className="bg-white text-black p-6 border-4 border-black transform skew-x-1 shadow-[8px_8px_0px_#0F172A]">
                <p className="font-impact text-2xl mb-2">Rule</p>
                <p className="text-sm">状态只在一个组件里消费？直接用 <code>useState</code>，别急着抽象。</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="flex items-end gap-4 mb-8 border-b-4 border-black pb-2">
               <span className="text-8xl font-impact leading-[0.7] text-black">02</span>
               <h2 className="text-4xl font-impact uppercase">Reducer tactics</h2>
            </div>
            <p className="mb-8 text-lg">
              当状态字段增多且有明确的事件流，<code>useReducer</code> 可以把更新逻辑集中管理，方便调试与回溯。
            </p>

            <CodeBlock 
              title="State machine-ish reducer"
              code={`type Phase = 'idle' | 'loading' | 'resolved' | 'error';

type State = { phase: Phase; data?: Todo[]; error?: string };

type Action =
  | { type: 'FETCH' }
  | { type: 'SUCCESS'; payload: Todo[] }
  | { type: 'FAIL'; message: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH':
      return { phase: 'loading' };
    case 'SUCCESS':
      return { phase: 'resolved', data: action.payload };
    case 'FAIL':
      return { phase: 'error', error: action.message };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { phase: 'idle' });`}
            />
          </section>

          <section className="mb-16">
            <div className="flex items-end gap-4 mb-8 border-b-4 border-black pb-2">
               <span className="text-8xl font-impact leading-[0.7] text-[#1E90FF] text-stroke-black">03</span>
               <h2 className="text-4xl font-impact uppercase">Context or store?</h2>
            </div>
            <p className="mb-6 text-lg">
              需要跨多个路由或兄弟组件共享状态时，再考虑 Context 或外部 store。遵循“能下沉到最近的父节点就别全局”的原则。
            </p>

            <CodeBlock 
              title="Context slice (lightweight)"
              code={`const CartContext = createContext<CartController | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);
  const value = {
    items,
    add: (item: CartItem) => setItems((prev) => [...prev, item]),
    clear: () => setItems([]),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};`}
            />
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Sparkles className="text-[#1E90FF]" />
              <h3 className="text-3xl font-impact uppercase">Performance checkpoints</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-4 border-black p-4 bg-[#0F172A] text-white shadow-[6px_6px_0px_#1E90FF]">
                <p className="font-impact text-xl mb-2">结构化 state</p>
                <p className="text-sm opacity-80">避免多余的嵌套；拆出原子字段，减少无谓的引用变化。</p>
              </div>
              <div className="border-4 border-black p-4 bg-white shadow-[6px_6px_0px_#0F172A]">
                <p className="font-impact text-xl mb-2">记忆化</p>
                <p className="text-sm">列表渲染用 key 稳定；重计算用 <code>useMemo</code>；回调用 <code>useCallback</code> 只在依赖变化时更新。</p>
              </div>
              <div className="border-4 border-black p-4 bg-[#1E90FF] text-black shadow-[6px_6px_0px_#0F172A]">
                <p className="font-impact text-xl mb-2">分片更新</p>
                <p className="text-sm">把外部数据缓存到 SWR/React Query；用选择器（selector）选择局部片段，降低重渲染扇形。</p>
              </div>
            </div>
          </section>

          <div className="mt-20 border-t-4 border-black pt-10 text-center relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
              <Sparkles size={32} className="text-[#1E90FF]" />
            </div>
            <p className="font-marker text-3xl transform -rotate-2 hover:scale-110 transition-transform inline-block cursor-pointer">
              Keep it predictable. Keep it fast.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReactStateArticle;

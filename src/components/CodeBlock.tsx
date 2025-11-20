import { Code } from 'lucide-react';

const CodeBlock = ({ code, title }: { code: string; title: string }) => (
  <div className="my-12 relative font-mono text-sm transform rotate-1 mx-auto max-w-3xl group">
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
      
      <div className="absolute bottom-0 right-0 p-2 opacity-20 pointer-events-none">
        <Code size={100} className="text-white" />
      </div>
    </div>
  </div>
);

export default CodeBlock;

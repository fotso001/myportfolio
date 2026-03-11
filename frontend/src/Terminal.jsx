import { useState, useRef, useEffect } from 'react';

const Terminal = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState(['Type "help" to see available commands...']);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.toLowerCase().trim();
      let response = '';

      switch (cmd) {
        case 'help':
          response = 'Available commands: whoami, skills, clear, exit, contact';
          break;
        case 'whoami':
          response = `${data.name} - ${data.title}`;
          break;
        case 'skills':
          response = `Tech Stack: ${Object.values(data.skills).flat().join(', ')}`;
          break;
        case 'contact':
          response = `Email: ${data.email} | Phone: ${data.phone}`;
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'exit':
          setIsOpen(false);
          return;
        default:
          response = `Command not found: ${cmd}. Type "help" for a list of commands.`;
      }

      setHistory([...history, `> ${input}`, response]);
      setInput('');
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-cyber-accent text-cyber-dark rounded-full shadow-[0_0_20px_rgba(0,242,255,0.4)] flex items-center justify-center font-black animate-glow z-[100] hover:scale-110 transition-transform"
      >
        {'>_'}
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 w-[90vw] md:w-[400px] h-[300px] glass border-cyber-accent/30 rounded-t-xl overflow-hidden shadow-2xl flex flex-col z-[100] animate-reveal">
      <div className="bg-cyber-accent/10 px-4 py-2 border-b border-cyber-accent/20 flex justify-between items-center">
        <span className="text-[10px] font-bold text-cyber-accent tracking-widest uppercase">Eph-Terminal v1.0</span>
        <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">×</button>
      </div>
      <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 text-cyber-accent/80">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-white' : ''}>{line}</div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-3 bg-black/20 flex items-center">
        <span className="mr-2 text-cyber-accent">❯</span>
        <input 
          autoFocus
          className="bg-transparent border-none outline-none flex-1 text-white font-mono text-xs"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
        />
      </div>
    </div>
  );
};

export default Terminal;

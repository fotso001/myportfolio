import { useState, useEffect } from 'react'
import Terminal from './Terminal'

const TechIcon = ({ name }) => {
  const icons = {
    "Python": "🐍", "Java": "☕", "Node.js (Express)": "🟢", "Nest.js": "🐱",
    "React": "⚛️", "React Native": "📱", "Tailwind CSS": "🌊", "JavaScript (ES6+)": "🟨",
    "Docker": "🐳", "Git": "📂", "MySQL": "🐬", "MongoDB": "🍃", "Top 10 OWASP": "🛡️",
    "IAM/JWT": "🔑", "DevSecOps": "🚀", "Linux (Hardening)": "🐧"
  }
  return <span className="mr-2">{icons[name] || '•'}</span>
}

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/api/data')
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error fetching data:", err)
        setLoading(false)
      })
  }, [])

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')
    try {
      const resp = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      })
      if (resp.ok) {
        setFormStatus('success')
        setContactForm({ name: '', email: '', message: '' })
      } else throw new Error()
    } catch {
      setFormStatus('error')
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-cyber-dark text-cyber-accent font-mono animate-pulse">
      {'> INITIALIZING INFRASTRUCTURE...'}
    </div>
  )

  if (!data) return (
    <div className="flex items-center justify-center min-h-screen bg-cyber-dark text-red-500 font-mono italic animate-pulse">
      {'> TERMINAL ERROR: BACKEND UNREACHABLE_'}
    </div>
  )

  return (
    <div className="min-h-screen bg-cyber-gradient selection:bg-cyber-accent selection:text-cyber-dark relative overflow-hidden">
      <Terminal data={data} />
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-20"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyber-accent/10 blur-[120px] rounded-full"></div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-black tracking-tighter text-cyber-accent hover:scale-105 transition-transform cursor-pointer glitch" data-text={data.name}>
             {data.name}
          </h1>
          <div className="hidden md:flex space-x-8 items-center text-[10px] font-black uppercase tracking-[.3em] text-cyber-text/50">
            <a href="#about" className="hover:text-cyber-accent transition-colors">About</a>
            <a href="#skills" className="hover:text-cyber-accent transition-colors">Stack</a>
            <a href="#experience" className="hover:text-cyber-accent transition-colors">Journey</a>
            <a href="#contact" className="hover:text-cyber-accent transition-colors text-cyber-accent">_Contact</a>
            <div className="h-4 w-px bg-white/10 mx-2"></div>
            <a href={data.links.github} target="_blank" className="hover:text-white transition-colors">GIT</a>
            <a href={data.links.gitlab} target="_blank" className="hover:text-white transition-colors">GITLAB</a>
            <a href={data.links.linkedin || "#"} target="_blank" className="hover:text-white transition-colors">LINKEDIN</a>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-40">
          
          {/* Hero Section */}
          <section id="about" className="md:flex items-center justify-between py-20 gap-12">
            <div className="md:w-3/5 space-y-10 reveal">
              <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-lg bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent text-[10px] font-black tracking-widest uppercase">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-cyber-accent opacity-75"></span>
                  <span className="bg-cyber-accent rounded-full h-2 w-2"></span>
                </span>
                <span>SEC-OPS INFRASTRUCTURE READY</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter">
                CYBER <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent via-blue-400 to-white glitch" data-text="ENGINEER.">ENGINEER.</span>
              </h2>
              <p className="text-lg text-cyber-text/60 italic leading-relaxed max-w-xl font-medium border-l-2 border-cyber-accent pl-6">
                "{data.profile}"
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <a href="http://localhost:8000/downloads/ephraimCV.pdf" download className="glow-btn px-10 py-4 bg-cyber-accent text-cyber-dark font-black rounded-sm shadow-2xl hover:bg-white transition-all transform hover:-rotate-1 active:scale-95">
                   DOWNLOAD_CV.PDF
                </a>
                <div className="flex gap-4 items-center">
                  <a href={data.links.github} target="_blank" title="GitHub" className="p-4 border border-white/10 text-white hover:border-cyber-accent transition-all rounded-sm">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                  <a href={data.links.gitlab} target="_blank" title="GitLab" className="p-4 border border-white/10 text-white hover:border-cyber-accent transition-all rounded-sm">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.135-.423-.73-.423-.867 0L16.418 9.452H7.582L4.919 1.263c-.136-.423-.734-.423-.867 0L1.387 9.452.045 13.587c-.123.376.012.791.333 1.025l11.622 8.438 11.622-8.438c.321-.234.456-.649.333-1.025"/></svg>
                  </a>
                  <a href={data.links.linkedin || "#"} target="_blank" title="LinkedIn" className="p-4 border border-white/10 text-white hover:border-cyber-accent transition-all rounded-sm">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/5 relative flex justify-center reveal stagger-1">
              <div className="relative w-72 h-72 md:w-96 md:h-96 group animate-float">
                <div className="absolute inset-0 border-[0.5px] border-cyber-accent/40 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 rounded-sm overflow-hidden border border-white/10 group-hover:border-cyber-accent transition-colors duration-700 shadow-2xl skew-x-1">
                  <img src="/profile.jpg" alt={data.name} className="w-full h-full object-cover filter contrast-125 brightness-75 group-hover:brightness-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                </div>
                <div className="absolute bottom-0 right-0 glass px-6 py-3 border-l-2 border-cyber-accent translate-x-1/4 translate-y-1/4">
                    <p className="text-[10px] font-black text-white tracking-[.2em]">IDENTITY // VERIFIED</p>
                    <p className="text-[8px] text-cyber-accent font-mono uppercase tracking-widest">{data.location}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Visuals */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 reveal stagger-2">
            <div className="relative group overflow-hidden rounded-sm aspect-[16/6] border border-white/5 shadow-2xl bg-black">
               <img src="/cyber_security_bg.png" className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-700" alt="Cybersecurity" />
               <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h4 className="text-xl font-black text-white tracking-widest uppercase mb-2 glitch" data-text="Cyber-Secure Arch">Cyber-Secure Arch</h4>
                  <div className="h-0.5 w-12 bg-cyber-accent transform group-hover:w-full transition-all duration-500"></div>
               </div>
            </div>
            <div className="relative group overflow-hidden rounded-sm aspect-[16/6] border border-white/5 shadow-2xl bg-black">
               <img src="/fullstack_dev_bg.png" className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-700" alt="Fullstack" />
               <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h4 className="text-xl font-black text-white tracking-widest uppercase mb-2">Scalable Systems</h4>
                  <div className="h-0.5 w-12 bg-cyber-accent transform group-hover:w-full transition-all duration-500"></div>
               </div>
            </div>
          </section>

          {/* Enhanced Skills */}
          <section id="skills" className="space-y-20 reveal">
            <div className="text-center space-y-4">
              <span className="text-cyber-accent text-[10px] font-black tracking-[1em] uppercase block">Stack_Info</span>
              <h3 className="text-5xl font-black text-white tracking-tighter">Tools of the Trade.</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(data.skills).map(([category, items]) => (
                <div key={category} className="glass p-10 rounded-sm border-t border-white/5 hover:border-cyber-accent transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,242,255,0.1)]">
                  <h4 className="text-white/30 font-black mb-10 text-[10px] uppercase tracking-[.4em]">{category}</h4>
                  <div className="space-y-4">
                    {items.map(skill => (
                      <div key={skill} className="flex items-center text-sm font-bold text-cyber-text/80 hover:text-cyber-accent transition-colors cursor-default group">
                        <TechIcon name={skill} />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="space-y-32 reveal">
             <div className="text-center">
                <h3 className="text-5xl font-black text-white">Experience()</h3>
             </div>
             <div className="space-y-20">
               {data.experience.map((exp, idx) => (
                  <div key={idx} className="group flex flex-col md:flex-row gap-8 items-start">
                     <div className="md:w-1/4">
                        <span className="text-cyber-accent font-mono text-sm font-bold tracking-widest block">{exp.period}</span>
                        <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">{exp.location || 'INTERNAL_PROJ'}</span>
                     </div>
                     <div className="md:w-3/4 glass p-10 rounded-sm border-l-4 border-white/10 group-hover:border-cyber-accent transition-all duration-500 flex flex-col space-y-6">
                        <h4 className="text-3xl font-black text-white tracking-tighter">{exp.role || exp.title}</h4>
                        <p className="text-sm font-bold text-cyber-accent uppercase tracking-widest">{exp.company || 'ACADEMIC_REPOSITORY'}</p>
                        <ul className="space-y-3">
                           {exp.highlights.map((h, i) => (
                              <li key={i} className="text-cyber-text/50 font-medium text-sm flex items-center gap-3">
                                 <span className="text-cyber-accent/20">#</span>
                                 <span>{h}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               ))}
             </div>
          </section>

          {/* Enhanced Contact Form */}
          <section id="contact" className="py-20 reveal">
            <div className="glass p-16 md:p-24 rounded-sm border border-white/5 relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-20">
               <div className="space-y-8">
                  <h3 className="text-6xl font-black text-white tracking-tighter">Let's <br />Connect_</h3>
                  <p className="text-cyber-text/50 font-medium">Currently seeking a high-stakes apprenticeship in Cybersecurity or Software Engineering. Use the encrypted channel below.</p>
                  <div className="space-y-4 font-mono text-xs text-cyber-accent">
                     <p className="flex items-center gap-4"><span className="text-white/20">EMAIL:</span> {data.email}</p>
                     <p className="flex items-center gap-4"><span className="text-white/20">TEL:</span> {data.phone}</p>
                  </div>
               </div>
               
               <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <input 
                        type="text" placeholder="NAME" 
                        required
                        className="bg-white/5 border border-white/10 p-4 font-mono text-xs text-white focus:border-cyber-accent outline-none transition-colors"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                     />
                     <input 
                        type="email" placeholder="EMAIL" 
                        required
                        className="bg-white/5 border border-white/10 p-4 font-mono text-xs text-white focus:border-cyber-accent outline-none transition-colors"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                     />
                  </div>
                  <textarea 
                     placeholder="ENCRYPTED_MESSAGE" rows="4" 
                     required
                     className="bg-white/5 border border-white/10 p-4 font-mono text-xs text-white focus:border-cyber-accent outline-none transition-colors w-full resize-none"
                     value={contactForm.message}
                     onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  />
                  <button 
                    disabled={formStatus === 'sending'}
                    className="w-full p-4 bg-white text-cyber-dark font-black tracking-widest uppercase hover:bg-cyber-accent transition-all disabled:opacity-50"
                  >
                     {formStatus === 'sending' ? 'TRANSMITTING...' : 'SEND_MESSAGE()'}
                  </button>
                  {formStatus === 'success' && <p className="text-green-500 font-mono text-[10px] animate-pulse">✓ DATA TRANSMITTED SUCCESSFULLY.</p>}
                  {formStatus === 'error' && <p className="text-red-500 font-mono text-[10px]">! TRANSMISSION FAILED. CHECK BACKEND.</p>}
               </form>
            </div>
          </section>

        </div>
      </main>

      <footer className="py-32 text-center relative z-10 border-t border-white/5">
        <p className="text-[8px] font-black text-white/10 tracking-[1.5em] uppercase">Built with FastAPI, React & Resilience // 2026</p>
      </footer>
    </div>
  )
}

export default App

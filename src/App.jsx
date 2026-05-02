import React, { useState, useRef, useEffect } from 'react';
import {
  Upload, FileText, Download, CheckCircle, AlertCircle,
  Sparkles, Shield, Zap, User, IndianRupee, FileCheck,
  ChevronRight, X, BarChart3, Calendar, Phone, Mail, MapPin,
  Users, Store, Calculator, Briefcase, CheckSquare, Target,
  Lock, CircleDollarSign, Gift, ArrowRight, Github, Linkedin,
  MessageCircle, ExternalLink
} from 'lucide-react';
import { generatePDF } from './utils/pdfGenerator';

// ─── Helpers ─────────────────────────────────────────────
function fmt(num) {
  if (num === undefined || num === null) return '—';
  return '₹ ' + Number(num).toLocaleString('en-IN');
}

// ─── Sub-components ───────────────────────────────────────
function FeaturePill({ icon: Icon, label }) {
  return (
    <span className="feature-pill">
      <Icon size={12} />
      {label}
    </span>
  );
}

function DataRow({ label, value }) {
  return (
    <div className="data-row">
      <span className="data-label">{label}</span>
      <span className="data-value">{value}</span>
    </div>
  );
}

function SectionCard({ color, dotColor, title, children, delay = '' }) {
  return (
    <div className={`glass p-5 anim-fadeUp${delay}`} style={{ borderColor: `rgba(${color},0.18)` }}>
      <div className="section-header">
        <div className="section-dot" style={{ background: `rgb(${dotColor})` }} />
        {title}
      </div>
      {children}
    </div>
  );
}

function StatCard({ value, label, color }) {
  return (
    <div className="stat-card">
      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: `rgb(${color})`, marginBottom: '0.2rem' }}>
        {value}
      </div>
      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  );
}

// ─── Site Navigation Header ──────────────────────────────

function Logo() {
  return (
    <div className="relative flex items-center gap-3 group">
      <div className="w-10 h-10 rounded-full bg-[#121212] border border-white/10 flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
        <span className="text-white font-black text-xl leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>ad</span>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-black text-lg tracking-tighter text-white">ITRGEN</span>
        <span className="text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase">Compliance</span>
      </div>
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo />
        </div>

        <div className="glass-header px-6 py-2 rounded-full flex items-center gap-6 border border-white/10 shadow-2xl">
          <div className="hidden md:flex items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
            <span>Facing issues?</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span>Need a project?</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
          <a 
            href="https://www.linkedin.com/in/ashish-das-663b32197/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black hover:bg-white/90 transition-all font-bold text-sm shadow-xl hover:scale-105 active:scale-95"
          >
            Connect with Ashish <ArrowRight size={14} />
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a href="https://github.com/07-ashishdas" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/ashish-das-663b32197/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Landing Page Sections ───────────────────────────────

function HeroSection({ onTryNow }) {
  return (
    <div className="text-center py-20 px-4 anim-fadeUp">
      <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
        Tax Clarity, Without the <span className="text-orange-500">Complexity</span>
      </h1>
      <div className="max-w-3xl mx-auto space-y-6 text-lg text-white/60 leading-relaxed">
        <p>
          Most people don't struggle with tax filing because they don't want to comply—they struggle
          because the system makes it hard to understand what they've already done.
          That's why we built this tool.
        </p>
        <p>
          It's part of our broader Compliance Stack at Finace India—a growing suite
          of public utilities designed to save time, reduce dependency, and help you stay one step ahead.
        </p>
        <p className="text-white/90 font-bold text-xl pt-4">Ready when you are.</p>
      </div>
      <div className="mt-10">
        <button 
          onClick={onTryNow}
          className="bg-[#1a1a3a] border border-white/10 px-8 py-4 rounded-full font-bold text-white hover:bg-[#252550] transition-all flex items-center gap-2 mx-auto"
        >
          Try the ITR Computation Tool now <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function UseCasesSection() {
  const cases = [
    {
      title: "For Salaried Employees",
      desc: "Whether it's for a new credit card, a housing loan, or just checking how much tax was paid—employees are using this to get their full summary without relying on someone else.",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      pos: "left"
    },
    {
      title: "For Business Founders",
      desc: "When applying for a personal or business loan, founders often need to show income clearly. One user generated a quick, neat summary that helped get approval—no delays, no follow-ups.",
      icon: Store,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      pos: "right"
    },
    {
      title: "For Accounting Professionals",
      desc: "One boutique consulting firm used this tool to generate computation summaries for 50+ clients during tax season. It saved days of manual work and let them focus on deeper financial advice, not data entry.",
      icon: Calculator,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      pos: "left"
    },
    {
      title: "For Freelancers & Consultants",
      desc: "An independent designer had to apply for a Schengen visa. Instead of hiring someone, she used the tool to create a clean income tax summary that was accepted by the embassy without questions.",
      icon: Briefcase,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      pos: "right"
    }
  ];

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-black mb-3">Real Use Cases</h2>
        <p className="text-white/40 text-lg font-medium">For whom this tool is for</p>
      </div>

      <div className="relative flex flex-col md:grid md:grid-cols-3 items-center gap-12">
        {/* Left Side */}
        <div className="space-y-24 z-10">
          {[cases[0], cases[2]].map((c, i) => (
            <div key={i} className="relative">
              <div className="md:text-right">
                <h3 className={`text-xl font-bold mb-3 ${c.color}`}>{c.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed max-w-xs ml-auto">
                  {c.desc}
                </p>
              </div>
              <div className={`hidden md:block absolute top-4 -right-12 w-12 h-[1px] bg-white/10`} />
            </div>
          ))}
        </div>

        {/* Center Circle */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3 p-3">
            <div className={`${cases[0].bgColor} ${cases[0].borderColor} border rounded-tl-[100px] rounded-br-2xl rounded-tr-2xl rounded-bl-2xl flex items-center justify-center shadow-lg shadow-blue-500/5`}>
              <Users className="text-blue-500" size={36} />
            </div>
            <div className={`${cases[1].bgColor} ${cases[1].borderColor} border rounded-tr-[100px] rounded-bl-2xl rounded-tl-2xl rounded-br-2xl flex items-center justify-center shadow-lg shadow-purple-500/5`}>
              <Store className="text-purple-500" size={36} />
            </div>
            <div className={`${cases[2].bgColor} ${cases[2].borderColor} border rounded-bl-[100px] rounded-tr-2xl rounded-tl-2xl rounded-br-2xl flex items-center justify-center shadow-lg shadow-green-500/5`}>
              <Calculator className="text-green-500" size={36} />
            </div>
            <div className={`${cases[3].bgColor} ${cases[3].borderColor} border rounded-br-[100px] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl flex items-center justify-center shadow-lg shadow-orange-500/5`}>
              <Briefcase className="text-orange-500" size={36} />
            </div>
          </div>
          <div className="absolute -inset-6 border border-white/5 rounded-full -z-10" />
          <div className="absolute -inset-12 border border-white/5 rounded-full -z-10 opacity-50" />
        </div>

        {/* Right Side */}
        <div className="space-y-24 z-10">
          {[cases[1], cases[3]].map((c, i) => (
            <div key={i} className="relative">
              <div className="md:text-left">
                <h3 className={`text-xl font-bold mb-3 ${c.color}`}>{c.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed max-w-xs mr-auto">
                  {c.desc}
                </p>
              </div>
              <div className={`hidden md:block absolute top-4 -left-12 w-12 h-[1px] bg-white/10`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Instant Summary within a minute",
      desc: "No long forms. No manual work. Just upload your ITR JSON file or log in securely and see your complete tax summary right away.",
      icon: CheckSquare,
      color: "purple"
    },
    {
      title: "Always Accurate",
      desc: "The summary is generated directly from your filed return. Every number is pulled exactly as per your tax data, so nothing gets missed.",
      icon: Target,
      color: "orange"
    },
    {
      title: "Clear, Clean PDF Format",
      desc: "You get a neat, downloadable report that's easy to read and ready to share—with banks, for visa applications, or for your own records.",
      icon: FileText,
      color: "green"
    },
    {
      title: "Private & Secure",
      desc: "Your data is never stored on our servers. It stays on your device. Privacy is our top priority.",
      icon: Lock,
      color: "blue"
    },
    {
      title: "Saves Time & Money",
      desc: "No more digging through forms or paying for help. You get a professional summary in seconds—without any extra cost.",
      icon: CircleDollarSign,
      color: "yellow"
    },
    {
      title: "Free Forever",
      desc: "This is a public utility tool from Finace India. It will always be free, because compliance should be accessible to everyone.",
      icon: Gift,
      color: "indigo"
    }
  ];

  return (
    <div className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black mb-4">Why People Love This Tool</h2>
        <p className="text-white/50 max-w-2xl mx-auto text-lg">
          First time in India — generating your ITR computation is now instant, private, and effortless. No third party, no chaos, just results in a blink.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all group">
              <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform ${
                f.color === 'purple' ? 'text-purple-400' :
                f.color === 'orange' ? 'text-orange-400' :
                f.color === 'green' ? 'text-green-400' :
                f.color === 'blue' ? 'text-blue-400' :
                f.color === 'yellow' ? 'text-yellow-400' : 'text-indigo-400'
              }`}>
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-bold mb-3">{f.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {f.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────
function App() {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef(null);
  const toolRef = useRef(null);

  const scrollToTool = () => {
    toolRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const processFile = (uploadedFile) => {
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop().toLowerCase();
    if (ext !== 'json') {
      setError(`Invalid file type: .${ext}. Please upload only .json files downloaded from the Income Tax portal.`);
      setFile(null);
      setJsonData(null);
      return;
    }

    setFile(uploadedFile);
    setError(null);
    setJsonData(null);
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.ITR && data.ITR.ITR4) {
          setJsonData(data);
          // Auto-scroll to preview after valid upload
          setTimeout(scrollToTool, 100);
        } else {
          setError('Invalid ITR JSON structure. Expected ITR → ITR4 format.');
          setJsonData(null);
        }
      } catch (err) {
        console.error('Parse error:', err);
        const first100 = e.target.result.toString().substring(0, 100);
        setError(`Cannot parse this file as JSON. File starts with: "${first100}"`);
        setFile(null);
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setError('Failed to read the file. Please try again.');
      setFile(null);
      setIsLoading(false);
    };
    reader.readAsText(uploadedFile);
  };

  const handleFileInput = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const handleGeneratePDF = () => {
    if (!jsonData) return;
    setIsGenerating(true);
    try { generatePDF(jsonData); }
    catch (err) { console.error(err); setError('Error generating PDF. Please try again.'); }
    finally { setIsGenerating(false); }
  };

  const clearFile = () => {
    setFile(null);
    setJsonData(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  // Derived data — dynamically detect ITR form
  const itrData   = jsonData?.ITR;
  const formKeys  = (itrData && typeof itrData === 'object') ? Object.keys(itrData).filter(k => k !== 'CreationInfo') : [];
  const formKey   = formKeys[0] || 'ITR4';
  const itr       = itrData?.[formKey];
  const personal  = itr?.PersonalInfo;
  const income    = itr?.IncomeDeductions;
  
  // Tax Paid can be in different locations depending on form
  const taxes     = itr?.TaxesPaid || itr?.TaxPaid?.TaxesPaid;
  
  const firstName = String(personal?.AssesseeName?.FirstName || '');
  const lastName  = String(personal?.AssesseeName?.SurNameOrOrgName || '');

  // Safety Masking Helpers
  const maskName = (name) => {
    const str = String(name || '');
    if (!str) return '***';
    return str[0] + '*'.repeat(Math.max(0, str.length - 1));
  };

  const maskPAN = (pan) => {
    const str = String(pan || '');
    if (str.length < 5) return '***';
    return str.slice(0, 3) + '****' + str.slice(-2);
  };

  const maskAadhaar = (aadhaar) => {
    const str = String(aadhaar || '');
    if (str.length < 4) return '***';
    return '••••••' + str.slice(-4);
  };

  const maskDOB = (dob) => {
    const str = String(dob || '');
    if (str.length < 4) return '***';
    return '**-**-' + str.slice(0, 4);
  };

  return (
    <div className="min-h-screen pt-20">
      <SiteHeader />
      {/* ── Landing Sections ── */}
      <HeroSection onTryNow={scrollToTool} />
      <UseCasesSection />
      <FeaturesSection />

      {/* ── Tool Section ── */}
      <div ref={toolRef} style={{ maxWidth: '860px', margin: '0 auto', padding: '5rem 1.25rem' }}>

        {/* ── Hero Header ── */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="anim-fadeUp">

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem',
          background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: '50px', padding: '0.4rem 1.2rem', fontSize: '0.78rem', fontWeight: 700,
          letterSpacing: '0.06em', textTransform: 'uppercase', color: '#c4b5fd' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <User size={13} />
            Made by Ashish Das
          </span>
          <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <a href="https://github.com/07-ashishdas" target="_blank" rel="noopener noreferrer" className="social-link-hover">
              <Github size={14} />
            </a>
            <a href="https://www.linkedin.com/in/ashish-das-663b32197/" target="_blank" rel="noopener noreferrer" className="social-link-hover">
              <Linkedin size={14} />
            </a>
          </div>
        </div>

        {/* Icon Orb */}
        <div className="icon-orb anim-fadeUp-2" style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="text-white font-black text-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>ad</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.9rem' }}
            className="anim-fadeUp-2">
          <span className="gradient-text">ITR Computation</span><br />
          <span style={{ color: 'rgba(255,255,255,0.88)' }}>Generator</span>
        </h1>

        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.45)', maxWidth: '460px', margin: '0 auto 1.6rem', lineHeight: 1.65 }}
           className="anim-fadeUp-3">
          Upload your ITR JSON file and instantly generate a professional
          PDF computation sheet — ready to share or print.
        </p>

        {/* Feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}
             className="anim-fadeUp-4">
          <FeaturePill icon={Shield}    label="Secure — 100% local" />
          <FeaturePill icon={Zap}       label="Instant PDF" />
          <FeaturePill icon={BarChart3} label="Income Analysis" />
        </div>
      </div>

      {/* ── Main Glass Card ── */}
      <div className="glass p-8 anim-fadeUp-3">

        {/* ── Upload Zone ── */}
        <div
          className={`upload-zone${jsonData ? ' active-file' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !file && fileRef.current?.click()}
          style={{ cursor: file ? 'default' : 'pointer', marginBottom: '1.5rem',
            transform: isDragging ? 'scale(1.015)' : 'scale(1)', transition: 'transform 0.2s ease' }}
        >
          <div className="upload-zone-inner">
            <input
              ref={fileRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />

            {!file ? (
              <>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem', lineHeight: 1 }}>
                  {isDragging ? '📂' : '📄'}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', marginBottom: '0.35rem' }}>
                  {isDragging ? 'Drop your file here' : 'Drop your ITR JSON file here'}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)', marginBottom: '1.25rem' }}>
                  or click to browse
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
                  style={{
                    background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.4)',
                    borderRadius: '10px', padding: '0.55rem 1.4rem', color: '#c4b5fd',
                    fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(124,58,237,0.18)'}
                >
                  Browse File
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(6,182,212,0.3))',
                    border: '1px solid rgba(16,185,129,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <FileText size={22} color="#34d399" />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                      {file.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                      {(file.size / 1024).toFixed(1)} KB · JSON
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); clearFile(); }}
                  style={{
                    background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '8px', padding: '0.45rem 0.8rem', color: '#fca5a5',
                    fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', gap: '0.35rem', transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.12)'}
                >
                  <X size={13} /> Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Error Banner ── */}
        {error && (
          <div className="anim-scaleIn" style={{
            display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
            background: 'rgba(239,68,68,0.09)', border: '1px solid rgba(239,68,68,0.28)',
            borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '1.5rem'
          }}>
            <AlertCircle size={18} color="#f87171" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
            <div>
              <div style={{ fontWeight: 700, color: '#fca5a5', fontSize: '0.85rem', marginBottom: '0.15rem' }}>Upload Error</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem' }}>{error}</div>
            </div>
          </div>
        )}

        {/* ── Loading State ── */}
        {isLoading && (
          <div className="anim-scaleIn" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ width: 40, height: 40, border: '3px solid rgba(124,58,237,0.2)', borderTopColor: '#7c3aed', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Processing your ITR file…</p>
          </div>
        )}

        {/* ── Validated — Data Preview ── */}
        {jsonData && !isLoading && (
          <div className="anim-scaleIn">

            {/* Success Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(6,182,212,0.2))',
                  border: '1px solid rgba(16,185,129,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <CheckCircle size={18} color="#34d399" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
                    JSON Validated
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.4)' }}>
                    {itr?.Form_ITR4 ? 'ITR-4' : itr?.Form_ITR1 ? 'ITR-1' : itr?.Form_ITR2 ? 'ITR-2' : itr?.Form_ITR3 ? 'ITR-3' : formKey} · AY {itr?.Form_ITR4?.AssessmentYear || itr?.Form_ITR1?.AssessmentYear || itr?.Form_ITR2?.AssessmentYear || itr?.Form_ITR3?.AssessmentYear || '—'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                className="btn-primary"
              >
                {isGenerating ? (
                  <>
                    <div style={{
                      width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white', borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }} />
                    Generating…
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Download PDF
                    <ChevronRight size={14} style={{ opacity: 0.7 }} />
                  </>
                )}
              </button>
            </div>

            {/* Stats Bar */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              <StatCard
                value={fmt(income?.GrossTotIncome)}
                label="Gross Total Income"
                color="199,130,255"
              />
              <StatCard
                value={fmt(income?.TotalIncome)}
                label="Net Taxable Income"
                color="99,202,255"
              />
              <StatCard
                value={fmt((taxes?.TDS || 0) + (taxes?.AdvanceTax || 0) + (taxes?.SelfAssessmentTax || 0))}
                label="Total Tax Paid"
                color="110,231,183"
              />
            </div>

            {/* Data Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>

              {/* Personal Info — masked for privacy */}
              <SectionCard color="199,130,255" dotColor="167,139,250" title="Personal Information">
                <DataRow label={<><User size={11} style={{display:'inline',marginRight:4}}/>Name</>}
                  value={`${maskName(firstName)} ${maskName(lastName)}`} />
                <DataRow label="PAN" value={maskPAN(personal?.PAN)} />
                <DataRow label="Date of Birth" value={maskDOB(personal?.DOB)} />
                <DataRow label="Aadhaar" value={maskAadhaar(personal?.AadhaarCardNo)} />
                <DataRow label={<><Phone size={11} style={{display:'inline',marginRight:4}}/>Mobile</>}
                  value={personal?.Address?.MobileNo ? `******${String(personal.Address.MobileNo).slice(-4)}` : '***'} />
                <DataRow label={<><Mail size={11} style={{display:'inline',marginRight:4}}/>Email</>}
                  value={personal?.Address?.EmailAddress ? '***@***.***' : '***'} />
                {personal?.Address?.CityOrTownOrDistrict && (
                  <DataRow label={<><MapPin size={11} style={{display:'inline',marginRight:4}}/>City</>}
                    value={`***, ** — ****`} />
                )}
              </SectionCard>

              {/* Income Details */}
              <SectionCard color="99,202,255" dotColor="96,165,250" title="Income Summary" delay="-2">
                <DataRow label="Business / Profession" value={fmt(income?.IncomeFromBusinessProf)} />
                <DataRow label="Gross Salary"           value={fmt(income?.GrossSalary)} />
                <DataRow label="House Property"         value={fmt(income?.TotalIncomeOfHP)} />
                <DataRow label="Other Sources"          value={fmt(income?.IncomeOthSrc)} />
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0.5rem 0.5rem' }} />
                <DataRow label="Gross Total Income"
                  value={<span className="gradient-text" style={{fontSize:'0.92rem',fontWeight:800}}>{fmt(income?.GrossTotIncome)}</span>} />
                <DataRow label="Total Taxable Income"
                  value={<span className="gradient-text" style={{fontSize:'0.92rem',fontWeight:800}}>{fmt(income?.TotalIncome)}</span>} />
              </SectionCard>

              {/* Taxes Paid */}
              {taxes && (
                <SectionCard color="110,231,183" dotColor="52,211,153" title="Taxes Paid" delay="-3">
                  <DataRow label="TDS (Tax Deducted)"     value={fmt(taxes?.TDS)} />
                  <DataRow label="TCS (Tax Collected)"    value={fmt(taxes?.TCS)} />
                  <DataRow label="Advance Tax"            value={fmt(taxes?.AdvanceTax)} />
                  <DataRow label="Self Assessment Tax"    value={fmt(taxes?.SelfAssessmentTax)} />
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0.5rem 0.5rem' }} />
                  <DataRow label="Total Tax Paid"
                    value={<span className="gradient-text-green" style={{fontSize:'0.92rem',fontWeight:800}}>
                      {fmt((taxes?.TDS||0)+(taxes?.TCS||0)+(taxes?.AdvanceTax||0)+(taxes?.SelfAssessmentTax||0))}
                    </span>} />
                </SectionCard>
              )}

              {/* Filing Info */}
              <SectionCard color="253,186,116" dotColor="251,146,60" title="Filing Information" delay="-4">
                <DataRow label={<><Calendar size={11} style={{display:'inline',marginRight:4}}/>Assessment Year</>}
                  value={itr?.Form_ITR4?.AssessmentYear || itr?.Form_ITR1?.AssessmentYear || itr?.Form_ITR2?.AssessmentYear || itr?.Form_ITR3?.AssessmentYear || '—'} />
                <DataRow label="Form Type"      value={itr?.Form_ITR4 ? 'ITR-4 (Sugam)' : itr?.Form_ITR1 ? 'ITR-1 (Sahaj)' : itr?.Form_ITR2 ? 'ITR-2' : itr?.Form_ITR3 ? 'ITR-3' : formKey} />
                <DataRow label="Filing Status"  value={itr?.FilingStatus?.ReturnFileSec || '—'} />
                <DataRow label="Section"        value={itr?.FilingStatus?.SeqNo || '—'} />
              </SectionCard>
            </div>

            {/* Download CTA */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button onClick={handleGeneratePDF} disabled={isGenerating} className="btn-primary"
                style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                <Download size={18} />
                {isGenerating ? 'Generating PDF…' : 'Download Full Computation PDF'}
              </button>
              <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                PDF is generated locally — no data leaves your device.
              </p>
            </div>
          </div>
        )}

        {/* ── Empty state hints ── */}
        {!jsonData && !error && !isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { icon: Shield,    title: 'Private',   desc: 'Data stays on your device' },
              { icon: Zap,       title: 'Instant',   desc: 'PDF ready in seconds' },
              { icon: FileCheck, title: 'Accurate',  desc: 'Mapped to ITR fields' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ textAlign: 'center', padding: '1rem', minWidth: 120 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '12px', margin: '0 auto 0.6rem',
                  background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={18} color="#a78bfa" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.2rem' }}>{title}</div>
                <div style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.35)' }}>{desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ marginTop: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', paddingBottom: '2rem' }}
           className="anim-fadeUp-4">
        <p>© 2026 ITR Computation Tool · Made with ❤️ by Ashish Das</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.8rem' }}>
          <a href="https://github.com/07-ashishdas" target="_blank" rel="noopener noreferrer" 
             style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
             className="social-link-hover">
            <Github size={14} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/ashish-das-663b32197/" target="_blank" rel="noopener noreferrer"
             style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
             className="social-link-hover">
            <Linkedin size={14} /> LinkedIn
          </a>
        </div>
        <p style={{ marginTop: '0.8rem', opacity: 0.6 }}>Part of Finace India Compliance Stack</p>
      </div>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default App;

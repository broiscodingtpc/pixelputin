/* @jsxRuntime classic */
/* @jsx React.createElement */
const { useState } = React;

const CONTRACT_ADDRESS = "TBA";
const PUTIN_SPRITE_SRC = "./public/pixel-putin.png";
const BACKGROUND_IMG_SRC = "./public/background.png";

function PixelPutinSite() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [typed, setTyped] = React.useState("");
  const [showOverlay, setShowOverlay] = React.useState(true);
  const [reveal, setReveal] = React.useState({
    navbar: false,
    hero: false,
    about: false,
    how: false,
    tokenomics: false,
    roadmap: false,
    faq: false,
    footer: false,
  });

  const STEPS = [
    {
      id: "navbar",
      code: `function Navbar(){\n  return (\n    <header className=\"...\">\n      <nav>Pixel Putin • Telegram</nav>\n    </header>\n  );\n}`,
      reveal: ["navbar"],
    },
    {
      id: "hero",
      code: `function Hero(){\n  return (\n    <section className=\"...\">\n      <h1>Dictate the Pump</h1>\n      <a className=\"btn\">Telegram</a>\n    </section>\n  );\n}`,
      reveal: ["hero"],
    },
    {
      id: "about",
      code: `function About(){\n  return (\n    <section id=\"about\">\n      <h2>Why Pixel Putin?</h2>\n      <Card .../>\n    </section>\n  );\n}`,
      reveal: ["about"],
    },
    {
      id: "how",
      code: `function HowToBuy(){\n  return (\n    <section id=\"how-to-buy\">\n      <ol>Steps to buy...</ol>\n    </section>\n  );\n}`,
      reveal: ["how"],
    },
    {
      id: "tokenomics",
      code: `function Tokenomics(){\n  return (\n    <section id=\"tokenomics\">\n      <Card title=\"Total Supply\"/>\n    </section>\n  );\n}`,
      reveal: ["tokenomics"],
    },
    {
      id: "roadmap",
      code: `function Roadmap(){\n  return (\n    <section id=\"roadmap\">\n      <Card title=\"Phase 1\"/>\n    </section>\n  );\n}`,
      reveal: ["roadmap"],
    },
    {
      id: "faq",
      code: `function FAQ(){\n  return (\n    <section id=\"faq\">\n      <Faq items={[...]} />\n    </section>\n  );\n}`,
      reveal: ["faq"],
    },
    {
      id: "footer",
      code: `function Footer(){\n  return (\n    <footer>© Pixel Putin</footer>\n  );\n}`,
      reveal: ["footer"],
    },
  ];

  React.useEffect(() => {
    if (!showOverlay) return;
    if (stepIndex >= STEPS.length) return;
    const text = STEPS[stepIndex].code;
    setTyped("");
    let i = 0;
    const speedMs = 12; // typing speed per char
    const timer = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        // reveal component after a short pause
        setTimeout(() => {
          setReveal((prev) => {
            const next = { ...prev };
            for (const key of STEPS[stepIndex].reveal) next[key] = true;
            return next;
          });
          // next step
          setTimeout(() => {
            if (stepIndex + 1 < STEPS.length) {
              setStepIndex(stepIndex + 1);
            } else {
              // all done → fade out overlay
              setTimeout(() => setShowOverlay(false), 700);
            }
          }, 450);
        }, 250);
      }
    }, speedMs);
    return () => clearInterval(timer);
  }, [stepIndex, showOverlay]);

  return (
    <div className="relative min-h-screen w-full bg-[#090616] text-white overflow-hidden font-mono">
      <PixelArtBackground />
      <PixelWalker />

      {/* Code typing overlay */}
      {showOverlay && (
        <div className="fixed left-4 right-4 top-4 z-30 md:left-8 md:right-8">
          <div className="rounded-xl border border-white/10 bg-black/70 backdrop-blur px-4 py-3 shadow-xl code-panel">
            <div className="text-xs text-white/60 mb-2">typing: {STEPS[stepIndex]?.id}.jsx</div>
            <pre className="text-[11px] md:text-xs leading-5 text-emerald-200 whitespace-pre-wrap min-h-[120px] max-h-[40vh] overflow-auto [text-shadow:0_0_2px_rgba(0,0,0,.6)] _code" style={{color:'#a7f3d0'}}>
{typed}
            </pre>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      {reveal.navbar && <Navbar />}

      {/* HERO */}
      {reveal.hero && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-24">
          <img
            src={PUTIN_SPRITE_SRC}
            alt="Pixel Putin"
            className="w-24 h-24 md:w-32 md:h-32 [image-rendering:pixelated] drop-shadow-[0_4px_24px_rgba(139,92,246,.4)] animate-bounce"
          />
          <h1 className="text-balance bg-gradient-to-br from-white via-fuchsia-100 to-emerald-100 bg-clip-text text-5xl md:text-7xl font-extrabold tracking-tight text-transparent">
            Dictate the Pump
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-white/80">
            Putin goes pixel. A meme coin built for laughs, degen chaos, and chart domination. No politics – just memes, vodka, and bombs on the chart.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="https://t.me/piixelputin" target="_blank" rel="noreferrer" className="btn btn-primary">Telegram</a>
          </div>
        </div>
      )}

      {/* ABOUT */}
      {reveal.about && (
        <section id="about" className="relative z-10 py-20 bg-black/40 border-t border-white/10 scroll-mt-24">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-fuchsia-300 to-emerald-200 bg-clip-text text-transparent">
              Why Pixel Putin?
            </h2>
            <p className="text-white/70 mb-10">
              Because every meme coin needs a dictator… of the charts. Pixel Putin brings arcade vibes, pixel bombs, and Russian bear energy straight to your wallet. Forget geopolitics – this is degen‑politics.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card title="💣 Bomb the Charts" text="Explosive memes and sudden pumps. Our community throws bombs of pure chaos onto Solana." />
              <Card title="🇷🇺 Flag Planting" text="Plant the Russian flag on degen land. Every holder waves pixels of domination across crypto Twitter." />
              <Card title="🧑‍✈️ Pixel Putin" text="The fearless 8‑bit leader staring at red candles, puffing a cigar, and dictating the next ATH." />
            </div>
          </div>
        </section>
      )}

      {/* HOW TO BUY */}
      {reveal.how && (
        <section id="how-to-buy" className="relative z-10 py-20 border-t border-white/10 scroll-mt-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-200 to-fuchsia-200 bg-clip-text text-transparent text-center">
              How to Buy
            </h2>
            <ol className="space-y-4 text-white/80">
              <li className="rounded-xl border border-white/10 bg-black/30 p-4">
                1. Install a Solana wallet (e.g., Phantom) and create a new wallet.
              </li>
              <li className="rounded-xl border border-white/10 bg-black/30 p-4">
                2. Fund your wallet with SOL from your preferred exchange.
              </li>
              <li className="rounded-xl border border-white/10 bg-black/30 p-4">
                3. Select the SOL pair on your preferred DEX and paste the contract address below.
              </li>
              <li className="rounded-xl border border-white/10 bg-black/30 p-4">
                4. Swap SOL for $PUTIN. Always verify the contract address.
              </li>
            </ol>

            <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-5 text-center">
              <div className="text-sm text-white/60 mb-2">Contract Address</div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <code className="text-xs md:text-sm bg-black/60 border border-white/10 rounded px-2 py-1">{CONTRACT_ADDRESS}</code>
                <CopyButton text={CONTRACT_ADDRESS} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TOKENOMICS */}
      {reveal.tokenomics && (
        <section id="tokenomics" className="relative z-10 py-20 border-t border-white/10 scroll-mt-24">
          <div className="container mx-auto px-6 max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-fuchsia-300 to-emerald-200 bg-clip-text text-transparent">
              Tokenomics
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card title="Total Supply" text="1,000,000,000 $PUTIN" />
              <Card title="Taxes" text="0% buy / 0% sell" />
              <Card title="Liquidity" text="Initial liquidity seeded and community driven." />
            </div>
            <p className="mt-6 text-xs text-white/50">
              Disclaimer: This is a meme project for entertainment. Not financial advice.
            </p>
          </div>
        </section>
      )}

      {/* ROADMAP */}
      {reveal.roadmap && (
        <section id="roadmap" className="relative z-10 py-20 border-t border-white/10 scroll-mt-24">
          <div className="container mx-auto px-6 max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-200 to-fuchsia-200 bg-clip-text text-transparent">
              Roadmap (totally serious)
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <Card title="Phase 1" text="Launch, memes, and vodka shots. Community raid season begins." />
              <Card title="Phase 2" text="NFT pixel Putins, meme contests, and random airdrops to loyal comrades." />
              <Card title="Phase 3" text="Pixel Putin arcade mini‑game and staking for 'Vodka Points'." />
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {reveal.faq && (
        <section id="faq" className="relative z-10 py-20 border-t border-white/10 scroll-mt-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-fuchsia-300 to-emerald-200 bg-clip-text text-transparent text-center">
              FAQ
            </h2>
            <Faq
              items={[
                {
                  q: "Is this financial advice?",
                  a: "No. This is a meme coin for entertainment only. Do your own research.",
                },
                {
                  q: "Any political affiliation?",
                  a: "No. It’s satire and pixel art culture. No endorsement implied.",
                },
                {
                  q: "Where can I buy?",
                  a: "Use Raydium and always verify the contract address posted above.",
                },
              ]}
            />
          </div>
        </section>
      )}

      {/* FOOTER */}
      {reveal.footer && (
        <footer className="relative z-10 border-t border-white/10 bg-black/40">
          <div className="container mx-auto flex flex-col items-center justify-between gap-3 py-6 px-4 md:flex-row">
            <div className="text-xs text-white/50">© {new Date().getFullYear()} Pixel Putin • Meme Project</div>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <a href="https://t.me/piixelputin" target="_blank" rel="noreferrer" className="hover:text-white">Telegram</a>
            </div>
          </div>
          <div className="container mx-auto px-4 pb-8 text-center text-[11px] text-white/40">
            This site and token are for memes. Not affiliated with any real person or organization. No promises, no guarantees.
          </div>
        </footer>
      )}

      <style>{`
        .btn{border:1px solid rgba(255,255,255,.14);border-radius:.8rem;padding:.6rem 1rem}
        .btn-primary{background:linear-gradient(90deg,#8B5CF6,#06D6A0);color:#0b0616;border-color:transparent;font-weight:800}
        .btn-primary:hover{filter:brightness(1.05)}
        .btn-ghost{color:rgba(255,255,255,.8)}
        .btn-ghost:hover{color:#fff;background:rgba(255,255,255,.06)}
      `}</style>
    </div>
  );
}

window.PixelPutinSite = PixelPutinSite;

function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 font-extrabold tracking-tight">
          <img src={PUTIN_SPRITE_SRC} alt="Pixel Putin" className="w-6 h-6 [image-rendering:pixelated]" />
          <span>Pixel Putin</span>
        </div>
        <nav className="hidden md:flex items-center gap-4 text-sm text-white/80">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#how-to-buy" className="hover:text-white">How to Buy</a>
          <a href="#tokenomics" className="hover:text-white">Tokenomics</a>
          <a href="#roadmap" className="hover:text-white">Roadmap</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
          <a href="https://t.me/piixelputin" target="_blank" rel="noreferrer" className="btn btn-primary">Telegram</a>
        </nav>
      </div>
    </div>
  );
}

function Card({ title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-5 text-center">
      <h3 className="font-bold mb-2 text-lg">{title}</h3>
      <p className="text-white/70 text-sm">{text}</p>
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };
  return (
    <button onClick={copy} className="btn btn-ghost text-xs">
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

// FAQ simple accordion
function Faq({ items }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <div key={idx} className="rounded-xl border border-white/10 bg-black/30">
          <button
            className="w-full text-left px-4 py-3 flex items-center justify-between"
            onClick={() => setOpen(open === idx ? -1 : idx)}
          >
            <span className="font-bold">{it.q}</span>
            <span className="text-white/60">{open === idx ? "−" : "+"}</span>
          </button>
          {open === idx && (
            <div className="px-4 pb-4 text-white/70 text-sm">{it.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// Pixelated digital art background
function PixelArtBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Full-screen background image from public */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BACKGROUND_IMG_SRC})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          imageRendering: 'pixelated',
          opacity: 0.6,
          filter: 'brightness(1.08) contrast(1.06)'
        }}
      />
      {/* Base pixel grid */}
      <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.05)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(255,255,255,.05)_0_1px,transparent_1px_8px)] [image-rendering:pixelated]" />

      {/* Scanlines */}
      <div className="absolute inset-0 opacity-10 [background-image:repeating-linear-gradient(180deg,rgba(0,0,0,.4)_0_2px,transparent_2px_4px)]" />

      {/* Pixel bombs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-red-500 text-xs animate-bounce"
          style={{
            top: `${5 + i * 10}%`,
            left: `${(i * 15) % 90 + 5}%`,
            fontFamily: "monospace",
            imageRendering: "pixelated",
          }}
        >
          💣
        </div>
      ))}

      {/* Moving sprite handled by <PixelWalker /> */}

      {/* Russian flags scattered */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-sm"
          style={{
            top: `${15 + i * 12}%`,
            left: `${(i * 20) % 90 + 5}%`,
            fontFamily: "monospace",
            imageRendering: "pixelated",
          }}
        >
          🇷🇺
        </div>
      ))}
    </div>
  );
}

function PixelWalker() {
  const [pos, setPos] = React.useState({ x: 50, y: 70 }); // vw, vh
  const [dir, setDir] = React.useState({ dx: 1, dy: 0 });
  const [flip, setFlip] = React.useState(false);
  const speed = 0.5; // percent per tick

  React.useEffect(() => {
    function randomDirection() {
      let dx = Math.round(Math.random() * 2) - 1; // -1,0,1
      let dy = Math.round(Math.random() * 2) - 1;
      if (dx === 0 && dy === 0) dx = 1; // ensure movement
      return { dx, dy };
    }

    let currentDir = { ...dir };
    const interval = setInterval(() => {
      // occasional direction change
      if (Math.random() < 0.04) {
        currentDir = randomDirection();
        setDir(currentDir);
      }

      setPos(prev => {
        let nx = prev.x + currentDir.dx * speed;
        let ny = prev.y + currentDir.dy * speed;
        // bounds to keep sprite on screen and above footer
        const minX = 4, maxX = 96;
        const minY = 14, maxY = 90;
        let bounced = false;
        if (nx < minX) { nx = minX; currentDir.dx = Math.abs(currentDir.dx); bounced = true; }
        if (nx > maxX) { nx = maxX; currentDir.dx = -Math.abs(currentDir.dx); bounced = true; }
        if (ny < minY) { ny = minY; currentDir.dy = Math.abs(currentDir.dy); bounced = true; }
        if (ny > maxY) { ny = maxY; currentDir.dy = -Math.abs(currentDir.dy); bounced = true; }
        if (bounced) setDir({ ...currentDir });
        setFlip(currentDir.dx < 0);
        return { x: nx, y: ny };
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={PUTIN_SPRITE_SRC}
      alt="Pixel Walker"
      style={{
        position: 'fixed',
        left: `${pos.x}vw`,
        top: `${pos.y}vh`,
        transform: `translate(-50%, -50%) scaleX(${flip ? -1 : 1})`,
        imageRendering: 'pixelated',
        pointerEvents: 'none',
        width: '88px',
        height: '88px',
        zIndex: 20,
        filter: 'drop-shadow(0 6px 22px rgba(139,92,246,.35))',
      }}
    />
  );
}

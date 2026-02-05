export function AnimatedWaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @keyframes wave1 {
              0%, 100% { d: path('M0,200 Q300,150 600,200 T1200,200'); }
              50% { d: path('M0,200 Q300,250 600,200 T1200,200'); }
            }
            @keyframes wave2 {
              0%, 100% { d: path('M0,250 Q300,200 600,250 T1200,250'); }
              50% { d: path('M0,250 Q300,300 600,250 T1200,250'); }
            }
            @keyframes wave3 {
              0%, 100% { d: path('M0,300 Q300,250 600,300 T1200,300'); }
              50% { d: path('M0,300 Q300,350 600,300 T1200,300'); }
            }
            @keyframes slide {
              0% { transform: translateX(0); }
              100% { transform: translateX(50px); }
            }
            .wave-line {
              stroke: #FFD12E;
              stroke-width: 1.5;
              fill: none;
              animation: slide 20s linear infinite;
            }
            .wave-line-1 { animation-delay: 0s; opacity: 0.8; }
            .wave-line-2 { animation-delay: -5s; opacity: 0.6; }
            .wave-line-3 { animation-delay: -10s; opacity: 0.4; }
            .wave-line-4 { animation-delay: -15s; opacity: 0.3; }
          `}</style>
        </defs>

        {/* Background gradient */}
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#060B18" stopOpacity="1" />
            <stop offset="100%" stopColor="#060B18" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Animated wave lines */}
        <g>
          {/* Wave lines - multiple layers for depth */}
          <path
            className="wave-line wave-line-1"
            d="M0,150 Q150,100 300,150 T600,150 T900,150 T1200,150"
          />
          <path
            className="wave-line wave-line-1"
            d="M0,170 Q150,120 300,170 T600,170 T900,170 T1200,170"
          />
          <path
            className="wave-line wave-line-1"
            d="M0,190 Q150,140 300,190 T600,190 T900,190 T1200,190"
          />
          <path
            className="wave-line wave-line-1"
            d="M0,210 Q150,160 300,210 T600,210 T900,210 T1200,210"
          />

          <path
            className="wave-line wave-line-2"
            d="M0,250 Q150,200 300,250 T600,250 T900,250 T1200,250"
          />
          <path
            className="wave-line wave-line-2"
            d="M0,270 Q150,220 300,270 T600,270 T900,270 T1200,270"
          />
          <path
            className="wave-line wave-line-2"
            d="M0,290 Q150,240 300,290 T600,290 T900,290 T1200,290"
          />
          <path
            className="wave-line wave-line-2"
            d="M0,310 Q150,260 300,310 T600,310 T900,310 T1200,310"
          />

          <path
            className="wave-line wave-line-3"
            d="M0,350 Q150,300 300,350 T600,350 T900,350 T1200,350"
          />
          <path
            className="wave-line wave-line-3"
            d="M0,370 Q150,320 300,370 T600,370 T900,370 T1200,370"
          />
          <path
            className="wave-line wave-line-3"
            d="M0,390 Q150,340 300,390 T600,390 T900,390 T1200,390"
          />
          <path
            className="wave-line wave-line-3"
            d="M0,410 Q150,360 300,410 T600,410 T900,410 T1200,410"
          />

          <path
            className="wave-line wave-line-4"
            d="M0,450 Q150,400 300,450 T600,450 T900,450 T1200,450"
          />
          <path
            className="wave-line wave-line-4"
            d="M0,470 Q150,420 300,470 T600,470 T900,470 T1200,470"
          />
          <path
            className="wave-line wave-line-4"
            d="M0,490 Q150,440 300,490 T600,490 T900,490 T1200,490"
          />
          <path
            className="wave-line wave-line-4"
            d="M0,510 Q150,460 300,510 T600,510 T900,510 T1200,510"
          />
        </g>
      </svg>
    </div>
  );
}

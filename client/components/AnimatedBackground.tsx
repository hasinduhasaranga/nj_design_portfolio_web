export function AnimatedBackground() {
  return (
    <>
      {/* Simple animated gradient orbs */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(7, 143, 240, 0.3), transparent)',
          top: '15%',
          left: '10%',
          filter: 'blur(80px)',
          animation: 'float 8s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(11, 91, 168, 0.25), transparent)',
          bottom: '25%',
          right: '10%',
          filter: 'blur(80px)',
          animation: 'float 10s ease-in-out infinite 2s',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Dot particles */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          backgroundColor: '#078FF0',
          opacity: 0.4,
          animation: 'pulse 4s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          top: '35%',
          right: '25%',
          width: '2px',
          height: '2px',
          borderRadius: '50%',
          backgroundColor: '#078FF0',
          opacity: 0.3,
          animation: 'pulse 5s ease-in-out infinite 1s',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </>
  );
}

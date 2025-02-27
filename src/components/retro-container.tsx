export default function RetroContainer({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="crt-effect">
          <div className="container mx-auto px-4 max-w-6xl flex flex-col min-h-screen">
            {children}
          </div>
          
          <div className="scanline"></div>
          
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(155,135,245,0.15)_0%,rgba(30,30,50,0)_70%)]"></div>
          </div>
        </div>
      </div>
    );
  }
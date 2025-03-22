
interface InstitutionBackgroundProps {
  children: React.ReactNode;
}

const InstitutionBackground = ({ children }: InstitutionBackgroundProps) => {
  return (
    <div className="min-h-screen bg-gray-100 bg-opacity-90 relative">
      {/* Background image with overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1589909202802-8f4aadce1849?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
          alt="KKTC Manzarası"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-white bg-opacity-85"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {children}
      </div>
    </div>
  );
};

export default InstitutionBackground;

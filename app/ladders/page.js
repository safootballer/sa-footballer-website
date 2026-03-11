export default function Ladders() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <a href="/" className="text-sm hover:underline mb-2 block">← Back to Home</a>
          <h1 className="text-4xl font-bold">League Ladders</h1>
          <p className="text-blue-100 mt-2">Live standings updated from PlayHQ</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Embed your ladder widget here */}
          <iframe 
            src="https://ladder-hu0e.onrender.com"
            className="w-full h-screen border-0"
            title="League Ladders"
          />
        </div>
      </div>
    </div>
  );
}
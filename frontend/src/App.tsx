export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Recipe Scraper
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Tailwind v4 is officially running.
        </p>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition">
          Ready to Scrape
        </button>
      </div>
    </div>
  )
}

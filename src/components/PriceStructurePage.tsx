export function PriceStructurePage() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Price Structure Calculator - Test Version
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-gray-700 mb-4">
            This is a minimal test version to isolate the production error.
          </p>

          <div className="bg-green-100 border border-green-400 rounded p-4">
            <p className="text-green-800">
              If you can see this message, the basic component is working.
            </p>
          </div>

          <div className="mt-8">
            <a
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Helmet } from 'react-helmet-async'

export function PriceStructurePage() {
  return (
    <>
      <Helmet>
        <title>Price Structure Calculator - Primary Water</title>
        <meta name="description" content="Internal pricing calculator for primary water supply partnerships. Password protected content." />
        <meta name="keywords" content="pricing calculator, water supply, partnership, internal tool" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="bingbot" content="noindex, nofollow" />
        <link rel="icon" href="/files/favicon primary water.png" />
      </Helmet>

      <div className="min-h-screen bg-blue-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">
            Price Structure Calculator - Test Version (Step 1: + Helmet)
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700 mb-4">
              Testing with Helmet component added back.
            </p>

            <div className="bg-green-100 border border-green-400 rounded p-4">
              <p className="text-green-800">
                If you can see this message, Helmet is working fine.
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
    </>
  )
}

import { useState } from 'react'
import { Keyboard } from 'lucide-react'

export function KeyboardInstructions() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed right-4 bottom-16 z-[999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 shadow-lg transition-all"
        aria-label="Keyboard shortcuts"
      >
        <Keyboard className="w-5 h-5 text-blue-500" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Keyboard Shortcuts</h3>
          <ul className="text-sm space-y-1 text-blue-700">
            <li>← / → : Previous / Next section</li>
            <li>↑ / ↓ : Previous / Next section</li>
            <li>Home : First section</li>
            <li>End : Last section</li>
            <li>1-5 : Jump to section</li>
            <li>Esc : Close dialogs</li>
          </ul>
        </div>
      )}
    </div>
  )
}

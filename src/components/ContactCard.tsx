import { useState } from 'react'
import { Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ContactCard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    consent: false
  })
  const [showNotification, setShowNotification] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.consent) {
      alert('Please accept the privacy policy to continue')
      return
    }

    setIsSubmitting(true)

    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:office@findprimarywater.com?subject=Contact Form Submission from ${formData.name}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`

      // Open default email client
      window.location.href = mailtoLink

      // Show success notification
      setShowNotification(true)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
        consent: false
      })

      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false)
      }, 5000)
    } catch (error) {
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-5xl w-full mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-blue-900">Contact Information</h2>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="text-sm text-blue-700 mb-1">EMAIL</div>
              <a 
                href="mailto:office@findprimarywater.com"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                office@findprimarywater.com
              </a>
            </div>
          </div>

          <div className="pl-16 space-y-2">
            <p className="font-medium text-blue-900">Primary Water Sp. z o. o.</p>
            <p className="text-blue-700">NIP: 5783171050</p>
            <p className="text-blue-700">REGON: 52893773200000</p>
            <p className="text-blue-700">ALEJA GRUNWALDZKA 2 B1 /ELZAM</p>
            <p className="text-blue-700">82-300 Elbląg</p>
            <p className="text-blue-700">Poland</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg relative">
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-sm"
            >
              Message sent successfully! We'll get back to you soon.
            </motion.div>
          )}
        </AnimatePresence>

        <h2 className="text-2xl font-bold text-blue-900 mb-6">Send Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm text-blue-900">Name</label>
            <input 
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm text-blue-900">Email</label>
            <input 
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full p-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm text-blue-900">Message</label>
            <textarea 
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full p-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
              className="mt-1 rounded border-blue-300 text-blue-500 focus:ring-blue-500"
              required
            />
            <label htmlFor="consent" className="text-sm text-blue-700">
              I consent to the processing of my personal data in accordance with the{' '}
              <a href="/privacy" className="text-blue-500 hover:text-blue-600">
                Privacy Policy
              </a>
            </label>
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:shadow-lg hover:bg-blue-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
      </div>
    </div>
  )
}

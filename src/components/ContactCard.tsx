import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormErrors {
  name?: string
  email?: string
  message?: string
  consent?: string
}

export function ContactCard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    recipient: 'office@findprimarywater.com',
    consent: false
  })
  const [showNotification, setShowNotification] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous errors
    setErrors({})

    // Validate form
    if (!validateForm()) {
      return
    }

    if (!formData.consent) {
      setErrors(prev => ({ ...prev, consent: 'Please accept the privacy policy to continue' }))
      return
    }

    setIsSubmitting(true)

    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:${formData.recipient}?subject=Contact Form Submission from ${formData.name}&body=${encodeURIComponent(
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
        recipient: 'office@findprimarywater.com',
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
    <div className="max-w-6xl w-full mx-auto bg-blue-50/30 rounded-2xl p-3 sm:p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
        {/* Contact Info Column */}
        <div className="lg:col-span-4">
          {/* Main Office */}
          <div className="mb-3 sm:mb-4">
            <h2 className="text-base font-bold text-blue-900 mb-2">Contact Information</h2>
            <div className="text-xs space-y-0.5">
              <div className="text-blue-700 mb-1">HEAD OFFICE </div>
              <a 
                href="mailto:office@findprimarywater.com"
                className="text-blue-500 hover:text-blue-700 transition-colors block mb-4"
              >
                office@findprimarywater.com
              </a>

              <p className="font-medium text-blue-900">Primary Water Sp. z o. o.</p>
              <p className="text-blue-700">NIP: 5783171050</p>
              <p className="text-blue-700">REGON: 52893773200000</p>
              <p className="text-blue-700">ALEJA GRUNWALDZKA 2 B1 /ELZAM</p>
              <p className="text-blue-700">82-300 Elbląg</p>
              <p className="text-blue-700">Poland</p>
            </div>
          </div>

          {/* Partners Section */}
          <div>
            <h2 className="text-base font-bold text-blue-900 mb-2">Our Partners</h2>
            <div className="text-xs space-y-0.5">
              <div className="text-blue-700 mb-1">NAMIBIA</div>
              <a 
                href="mailto:namibia@findprimarywater.com"
                className="text-blue-500 hover:text-blue-700 transition-colors block mb-4"
              >
                namibia@findprimarywater.com
              </a>

              <p className="font-medium text-blue-900">Primary Water Solutions CC</p>
              <p className="text-blue-700">Tax Reg: CC/2024/07816</p>
              <p className="text-blue-700">Private Bag 12012</p>
              <p className="text-blue-700">Ausspannplatz</p>
              <p className="text-blue-700">Windhoek</p>
              <p className="text-blue-700">Namibia</p>
              
              <a 
                href="tel:+264811294326"
                className="text-blue-500 hover:text-blue-700 transition-colors block"
              >
                +264 81 129 4326
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-8 bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm relative">
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

          <h2 className="text-base font-bold text-blue-900 mb-3">Send Message</h2>
          <form onSubmit={handleSubmit} className="space-y-2" noValidate>
          <div>
            <label htmlFor="recipient" className="text-sm text-blue-700">Send To</label>
            <select
              id="recipient"
              value={formData.recipient}
              onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
              className="w-full h-9 px-2.5 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 bg-white text-sm"
            >
              <option value="office@findprimarywater.com">Primary Water Head Office</option>
              <option value="namibia@findprimarywater.com">Primary Water Namibia</option>
            </select>
          </div>
          <div>
            <label htmlFor="name" className="text-sm text-blue-700">Name</label>
            <input 
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full h-9 px-2.5 rounded-lg border text-sm ${
                errors.name 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-blue-200 focus:ring-blue-500'
              } focus:ring-2`}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              required
            />
            {errors.name && (
              <div id="name-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="email" className="text-sm text-blue-700">Email</label>
            <input 
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full h-9 px-2.5 rounded-lg border text-sm ${
                errors.email 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-blue-200 focus:ring-blue-500'
              } focus:ring-2`}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              required
            />
            {errors.email && (
              <div id="email-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="message" className="text-sm text-blue-700">Message</label>
            <textarea 
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className={`w-full px-2.5 py-2 rounded-lg border text-sm ${
                errors.message 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-blue-200 focus:ring-blue-500'
              } focus:ring-2`}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              rows={2}
              required
            />
            {errors.message && (
              <div id="message-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.message}
              </div>
            )}
          </div>
          <div className="flex items-start gap-2 text-xs">
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
            {errors.consent && (
              <div className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.consent}
              </div>
            )}
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:shadow-md hover:bg-blue-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden text-sm"
          >
            <span className={`transition-opacity duration-200 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
              Send Message
            </span>
            {isSubmitting && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </motion.button>
          </form>
        </div>
      </div>
    </div>
  )
}

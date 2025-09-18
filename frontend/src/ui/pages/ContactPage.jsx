import React, { useState, useEffect, useRef } from 'react';

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRefs = useRef({});

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Us",
      detail: "hello@ethnicwear.com",
      description: "Send us an email anytime!",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: "📞",
      title: "Call Us",
      detail: "+91 98765 43210",
      description: "Mon-Fri from 8am to 5pm",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: "📍",
      title: "Visit Us",
      detail: "123 Fashion Street, Jaipur",
      description: "Come say hello at our store",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: "💬",
      title: "Live Chat",
      detail: "Available 24/7",
      description: "Chat with our support team",
      color: "from-orange-400 to-red-500"
    }
  ];

  const faqs = [
    {
      question: "What are your shipping options?",
      answer: "We offer free shipping on orders above ₹999. Standard delivery takes 3-5 business days, and express delivery takes 1-2 business days."
    },
    {
      question: "Do you accept returns?",
      answer: "Yes! We have a 30-day return policy. Items must be in original condition with tags attached."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and cash on delivery."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email and SMS to monitor your package."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section with Glossy Golden Theme */}
      <section className="relative overflow-hidden bg-glossy-gold text-white">
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-[0.5px]"></div>
        <div className="relative container-responsive py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up drop-shadow-2xl">
              Get In <span className="text-golden-200 drop-shadow-lg">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
        
        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-golden-300 rounded-full opacity-30 animate-pulse shadow-glossy"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-golden-200 rounded-full opacity-30 animate-pulse shadow-glossy"></div>
      </section>

      {/* Contact Info Cards */}
      <section 
        id="contact-info"
        ref={ref => sectionRefs.current['contact-info'] = ref}
        className="py-20 -mt-10 relative z-10"
      >
        <div className="container-responsive">
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${
            isVisible['contact-info'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-white rounded-3xl p-6 shadow-glossy hover:shadow-golden-lg transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border-2 border-golden-100 hover:border-golden-300 relative overflow-hidden">
                  <div className={`w-14 h-14 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-glossy-gold bg-glossy-gold bg-clip-text text-transparent font-semibold mb-2">{info.detail}</p>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                  
                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section 
        id="contact-form"
        ref={ref => sectionRefs.current['contact-form'] = ref}
        className="py-20"
      >
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className={`transition-all duration-1000 ${
              isVisible['contact-form'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="bg-white rounded-3xl p-8 shadow-glossy border-2 border-golden-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Send us a <span className="text-glossy-gold bg-glossy-gold bg-clip-text text-transparent">Message</span>
                </h2>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    🎉 Thank you! Your message has been sent successfully. We'll get back to you soon!
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-golden-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-glossy-gold text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-golden-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-glossy"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Contact Image */}
            <div className={`transition-all duration-1000 ${
              isVisible['contact-form'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="relative">
                <div className="bg-glossy-gold rounded-3xl p-8 transform hover:scale-105 transition-transform duration-500 shadow-glossy">
                  <img 
                    src="/Girls.webp" 
                    alt="Contact Us" 
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-golden-200 text-gray-900 p-4 rounded-2xl shadow-glossy border-2 border-golden-300">
                  <p className="font-bold text-lg">24/7 Support</p>
                  <p className="text-sm">We're here to help!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        id="faq"
        ref={ref => sectionRefs.current.faq = ref}
        className="py-20 bg-gray-50"
      >
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-glossy-gold bg-glossy-gold bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our products and services
            </p>
          </div>
          
          <div className={`max-w-3xl mx-auto transition-all duration-1000 ${
            isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="mb-6 bg-white rounded-2xl shadow-glossy overflow-hidden hover:shadow-golden-lg transition-shadow duration-300 border-2 border-golden-100 hover:border-golden-300"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Enhanced Golden Theme */}
      <section className="py-20 bg-glossy-gold text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative container-responsive">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-2xl">
              Ready to <span className="text-golden-200 drop-shadow-lg">Connect?</span>
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12">
              Join thousands of satisfied customers who trust us for their ethnic wear needs. 
              Let's start a conversation today!
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <button className="bg-golden-200 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-golden-100 transition-all duration-300 transform hover:scale-105 shadow-glossy">
                Start Shopping
              </button>
              <button className="border-2 border-golden-200 text-golden-100 px-8 py-4 rounded-full font-bold text-lg hover:bg-golden-100 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                Call Us Now
              </button>
            </div>
          </div>
        </div>
        
        {/* Enhanced Decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 border-2 border-golden-200/40 rounded-full animate-pulse shadow-glossy"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-golden-100/40 rounded-full animate-pulse shadow-glossy"></div>
      </section>
    </div>
  );
}



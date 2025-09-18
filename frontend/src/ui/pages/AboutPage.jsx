import React, { useState, useEffect, useRef } from 'react';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState({});
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

  const teamMembers = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Founder & CEO",
      image: "/sample 1.png",
      description: "Passionate about bringing traditional Indian fashion to the modern world."
    },
    {
      id: 2,
      name: "Arjun Patel",
      role: "Creative Director",
      image: "/sample 2.png",
      description: "Expert in blending contemporary designs with ethnic aesthetics."
    },
    {
      id: 3,
      name: "Meera Singh",
      role: "Head of Design",
      image: "/sample 3.jpeg",
      description: "Specializes in children's ethnic wear and sustainable fashion."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: "👥" },
    { number: "1000+", label: "Products", icon: "👗" },
    { number: "5", label: "Years Experience", icon: "⭐" },
    { number: "100%", label: "Satisfaction", icon: "💝" }
  ];

  const values = [
    {
      icon: "🌱",
      title: "Sustainability",
      description: "Committed to eco-friendly practices and sustainable fashion.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: "✨",
      title: "Quality",
      description: "Premium materials and meticulous craftsmanship.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: "🎨",
      title: "Innovation",
      description: "Blending traditional aesthetics with contemporary designs.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: "💖",
      title: "Customer First",
      description: "Your satisfaction is our priority.",
      color: "from-pink-400 to-rose-500"
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
              About <span className="text-golden-200 drop-shadow-lg">Our Story</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Crafting beautiful ethnic wear that celebrates tradition while embracing modernity
            </p>
          </div>
        </div>
        
        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-golden-300 rounded-full opacity-30 animate-pulse shadow-glossy"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-golden-200 rounded-full opacity-30 animate-pulse shadow-glossy"></div>
      </section>

      {/* Our Story Section */}
      <section 
        id="story"
        ref={ref => sectionRefs.current.story = ref}
        className="py-20"
      >
        <div className="container-responsive">
          <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            isVisible.story ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-glossy-gold bg-glossy-gold bg-clip-text text-transparent">Journey</span>
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Founded in 2019, our brand was born from a simple yet powerful vision: to make 
                  authentic Indian ethnic wear accessible to families worldwide while maintaining 
                  the highest standards of quality and craftsmanship.
                </p>
                <p>
                  What started as a small boutique has grown into a trusted name in ethnic fashion, 
                  serving over 50,000 happy customers across the globe. We specialize in women's 
                  ethnic wear and children's traditional clothing.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-glossy-gold rounded-3xl p-8 transform hover:scale-105 transition-transform duration-500 shadow-glossy">
                <img 
                  src="/Festive.avif" 
                  alt="Our Story" 
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl border-4 border-golden-200"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Golden Gradient */}
      <section 
        id="stats"
        ref={ref => sectionRefs.current.stats = ref}
        className="py-16 bg-glossy-gold text-white relative overflow-hidden"
      >
        <div className="container-responsive">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${
            isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group hover:scale-110 transition-transform duration-300"
              >
                <div className="text-4xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-golden-100 drop-shadow-lg">
                  {stat.number}
                </div>
                <div className="text-gray-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section 
        id="values"
        ref={ref => sectionRefs.current.values = ref}
        className="py-20"
      >
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-glossy-gold bg-glossy-gold bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
            isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {values.map((value, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden"
              >
                <div className="bg-white rounded-3xl p-8 shadow-glossy hover:shadow-golden-lg transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border-2 border-golden-100 hover:border-golden-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  
                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        id="team"
        ref={ref => sectionRefs.current.team = ref}
        className="py-20 bg-gray-50"
      >
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-glossy-gold bg-glossy-gold bg-clip-text text-transparent">Amazing Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind our brand
            </p>
          </div>
          
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${
            isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {teamMembers.map((member, index) => (
              <div 
                key={member.id}
                className="group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-glossy hover:shadow-golden-lg transition-all duration-500 transform hover:-translate-y-4 border-2 border-golden-100 hover:border-golden-300">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-glossy-gold bg-glossy-gold bg-clip-text text-transparent font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section with Enhanced Golden Theme */}
      <section 
        id="mission"
        ref={ref => sectionRefs.current.mission = ref}
        className="py-20 bg-glossy-gold text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative container-responsive">
          <div className={`text-center transition-all duration-1000 ${
            isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-2xl">
              Our <span className="text-golden-200 drop-shadow-lg">Mission</span>
            </h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-12">
              To preserve and celebrate the beauty of Indian ethnic fashion while making it accessible 
              to families worldwide. We believe that everyone deserves to feel confident and beautiful 
              in clothing that honors tradition while embracing the future.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <button className="bg-golden-200 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-golden-100 transition-all duration-300 transform hover:scale-105 shadow-glossy">
                Shop Our Collection
              </button>
              <button className="border-2 border-golden-200 text-golden-100 px-8 py-4 rounded-full font-bold text-lg hover:bg-golden-100 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                Contact Us
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



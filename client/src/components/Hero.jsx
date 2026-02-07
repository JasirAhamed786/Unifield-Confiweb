import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, BookOpen, TrendingUp, Shield, Globe, Award, Star, CheckCircle } from 'lucide-react';

const Hero = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Comprehensive Crop Library",
      description: "Access detailed guides for 50+ crops with disease management and best practices"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Real-time Market Data",
      description: "Stay updated with live commodity prices and market trends"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Expert Community",
      description: "Connect with agricultural experts and fellow farmers worldwide"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Government Schemes",
      description: "Discover and apply for subsidies, loans, and agricultural programs"
    }
  ];

  const stats = [
    { number: "50+", label: "Crop Guides" },
    { number: "10K+", label: "Active Farmers" },
    { number: "500+", label: "Expert Advisors" },
    { number: "95%", label: "Success Rate" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Wheat Farmer, Punjab",
      content: "UniField helped me increase my yield by 30% through better disease management and modern techniques.",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      role: "Organic Farmer, Spain",
      content: "The platform's global network allowed me to learn sustainable farming practices from experts worldwide.",
      rating: 5
    },
    {
      name: "Dr. Ahmed Hassan",
      role: "Agricultural Scientist",
      content: "An excellent resource for both farmers and researchers. The research updates are invaluable.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Unifying Global
              <span className="block text-secondary">Agriculture</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect, Learn, and Grow with UniField - Your comprehensive platform for modern farming,
              expert guidance, and agricultural innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/register"
                className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose UniField?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for successful modern agriculture in one comprehensive platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Real stories from farmers and experts worldwide</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Farming?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of farmers who are already using UniField to improve their yields and connect with the global agricultural community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/crops"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300"
              >
                Explore Crops
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;

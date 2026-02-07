import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, FileText, ExternalLink, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchSchemes();
  }, []);

  useEffect(() => {
    filterSchemes();
  }, [schemes, searchTerm, selectedCategory]);

  const fetchSchemes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/schemes');
      setSchemes(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Failed to load government schemes');
      setLoading(false);
    }
  };

  const filterSchemes = () => {
    let filtered = schemes;

    if (searchTerm) {
      filtered = filtered.filter(scheme =>
        scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory);
    }

    setFilteredSchemes(filtered);
  };

  const categories = ['All', 'Subsidy', 'Loan', 'Insurance', 'Training', 'Other'];

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Government Schemes</h1>
        <p className="text-xl text-gray-600">Discover available government schemes and subsidies for farmers and agricultural organizations.</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme, index) => (
          <motion.div
            key={scheme._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-48 bg-gradient-to-r from-primary to-secondary relative">
              {scheme.imageUrl && (
                <img
                  src={scheme.imageUrl}
                  alt={scheme.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
                  }}
                />
              )}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  scheme.category === 'Subsidy' ? 'bg-green-500 text-white' :
                  scheme.category === 'Loan' ? 'bg-blue-500 text-white' :
                  scheme.category === 'Insurance' ? 'bg-yellow-500 text-white' :
                  scheme.category === 'Training' ? 'bg-purple-500 text-white' :
                  'bg-gray-500 text-white'
                }`}>
                  {scheme.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{scheme.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{scheme.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {scheme.region}
                </div>
                {scheme.deadline && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Deadline: {new Date(scheme.deadline).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors flex items-center justify-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Learn More
                </button>
                <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No schemes found matching your criteria.</p>
        </div>
      )}
    </motion.div>
  );
};

export default GovernmentSchemes;

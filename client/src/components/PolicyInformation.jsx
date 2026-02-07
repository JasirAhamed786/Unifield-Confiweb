import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building, Phone, Search, Filter, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const PolicyInformation = () => {
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchPolicies();
  }, []);

  useEffect(() => {
    filterPolicies();
  }, [policies, searchTerm, selectedCategory]);

  const fetchPolicies = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/policies');
      setPolicies(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Failed to load policy information');
      setLoading(false);
    }
  };

  const filterPolicies = () => {
    let filtered = policies;

    if (searchTerm) {
      filtered = filtered.filter(policy =>
        policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(policy => policy.category === selectedCategory);
    }

    setFilteredPolicies(filtered);
  };

  const categories = ['All', 'Agricultural Policy', 'Trade Policy', 'Environmental Policy', 'Technology Policy', 'Other'];

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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Policy Information</h1>
        <p className="text-xl text-gray-600">Stay updated with agricultural policies, regulations, and government initiatives worldwide.</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search policies..."
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

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPolicies.map((policy, index) => (
          <motion.div
            key={policy._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-48 bg-gradient-to-r from-secondary to-accent relative">
              {policy.imageUrl && (
                <img
                  src={policy.imageUrl}
                  alt={policy.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
                  }}
                />
              )}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  policy.category === 'Agricultural Policy' ? 'bg-green-500 text-white' :
                  policy.category === 'Trade Policy' ? 'bg-blue-500 text-white' :
                  policy.category === 'Environmental Policy' ? 'bg-yellow-500 text-white' :
                  policy.category === 'Technology Policy' ? 'bg-purple-500 text-white' :
                  'bg-gray-500 text-white'
                }`}>
                  {policy.category.split(' ')[0]}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{policy.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{policy.summary}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {policy.region}
                </div>
                {policy.effectiveDate && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Effective: {new Date(policy.effectiveDate).toLocaleDateString()}
                  </div>
                )}
                {policy.implementingAuthority && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Building className="h-4 w-4 mr-2" />
                    {policy.implementingAuthority}
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <Link
                  to={`/policies/${policy._id}`}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors flex items-center justify-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Read Policy
                </Link>
                {policy.contactInfo && (
                  <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                    <Phone className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPolicies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No policies found matching your criteria.</p>
        </div>
      )}
    </motion.div>
  );
};

export default PolicyInformation;

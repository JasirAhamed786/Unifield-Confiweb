import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, User, Eye, Heart, Search, Filter, Clock, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

const ResearchUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [filteredUpdates, setFilteredUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchUpdates();
  }, []);

  useEffect(() => {
    filterUpdates();
  }, [updates, searchTerm, selectedCategory]);

  const fetchUpdates = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/research');
      setUpdates(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Failed to load research updates');
      setLoading(false);
    }
  };

  const filterUpdates = () => {
    let filtered = updates;

    if (searchTerm) {
      filtered = filtered.filter(update =>
        update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        update.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        update.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(update => update.category === selectedCategory);
    }

    setFilteredUpdates(filtered);
  };

  const categories = ['All', 'Crop Science', 'Technology', 'Sustainability', 'Policy', 'Other'];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Crop Science': return 'bg-green-500';
      case 'Technology': return 'bg-blue-500';
      case 'Sustainability': return 'bg-yellow-500';
      case 'Policy': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Updates</h1>
        <p className="text-xl text-gray-600">Stay informed with the latest agricultural research, innovations, and scientific breakthroughs from around the world.</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search research updates..."
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

      {/* Research Updates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUpdates.map((update, index) => (
          <motion.article
            key={update._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-48 bg-gradient-to-r from-secondary to-accent relative">
              {update.imageUrl && (
                <img
                  src={update.imageUrl}
                  alt={update.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
                  }}
                />
              )}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(update.category)}`}>
                  {update.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                <Link to={`/research/${update._id}`} className="hover:text-primary transition-colors">
                  {update.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{update.summary}</p>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <User className="h-4 w-4 mr-1" />
                <span className="mr-4">{update.author}</span>
                <Calendar className="h-4 w-4 mr-1" />
                <span className="mr-4">{new Date(update.publishedDate).toLocaleDateString()}</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{update.readTime} min read</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{update.views}</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    <span>{update.likes}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {update.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                    <Tag className="h-3 w-3 mr-1" />
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/research/${update._id}`}
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Read Full Article
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      {filteredUpdates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No research updates found matching your criteria.</p>
        </div>
      )}
    </motion.div>
  );
};

export default ResearchUpdates;

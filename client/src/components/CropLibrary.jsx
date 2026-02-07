import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, Calendar, Droplets, Sprout, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CropLibrary = () => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');

  useEffect(() => {
    fetchCrops();
  }, []);

  useEffect(() => {
    filterCrops();
  }, [crops, searchTerm, selectedSeason]);

  const fetchCrops = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cropguides');
      setCrops(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching crops:', err);
      toast.error('Failed to load crop library');
      setLoading(false);
    }
  };

  const filterCrops = () => {
    let filtered = crops;

    if (searchTerm) {
      filtered = filtered.filter(crop =>
        crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.season.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.soil.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSeason) {
      filtered = filtered.filter(crop => crop.season === selectedSeason);
    }

    setFilteredCrops(filtered);
  };

  const cropImages = {
    'Wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'Rice': 'https://images.unsplash.com/photo-1536304993881-ff6e9aefacd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'Corn': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'Soybean': 'https://images.unsplash.com/photo-1592982375567-7b3930a7f9a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'Cotton': 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'Sugarcane': 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'Tomato': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'Onion': 'https://images.unsplash.com/photo-1618512496248-a01a9a7d3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'Carrot': 'https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  };

  const seasons = ['Spring', 'Summer', 'Fall', 'Winter', 'Year-round'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Crop Library</h1>
          <p className="text-xl text-gray-600">Discover comprehensive guides for various crops</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">All Seasons</option>
              {seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Crop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop, index) => (
            <motion.div
              key={crop._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={crop.imageUrl}
                  alt={crop.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-2 py-1 rounded-full text-sm font-medium">
                  {crop.season}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{crop.name}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Season: {crop.season}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Sprout className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Soil: {crop.soil}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Droplets className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Water: {crop.water}</span>
                  </div>
                </div>

                <Link
                  to={`/crops/${crop._id}`}
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80 transition-colors inline-block text-center"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No crops found matching your criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CropLibrary;

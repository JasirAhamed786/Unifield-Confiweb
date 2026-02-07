import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, Droplets, Sprout, AlertTriangle, Star, Heart } from 'lucide-react';

const CropDetail = () => {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    fetchCrop();
  }, [id]);

  const fetchCrop = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cropguides/${id}`);
      setCrop(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Here you would typically save to user's favorites
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!crop) return <div className="text-center py-8">Crop not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{crop.name}</h1>
              <p className="text-xl opacity-90">Comprehensive growing guide</p>
            </div>
            <button
              onClick={toggleFavorite}
              className={`p-3 rounded-full ${isFavorited ? 'bg-red-500' : 'bg-white/20'} hover:bg-white/30 transition-colors`}
            >
              <Heart className={`h-6 w-6 ${isFavorited ? 'text-white' : 'text-white'}`} fill={isFavorited ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Calendar className="h-6 w-6 text-primary mr-2" />
                  Growing Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Season</h3>
                    <p className="text-gray-700">{crop.season}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Soil Type</h3>
                    <p className="text-gray-700">{crop.soil}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Water Requirements</h3>
                    <p className="text-gray-700">{crop.water}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Planting Season</h3>
                    <p className="text-gray-700">{crop.season}</p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                  Common Diseases & Pests
                </h2>
                <div className="space-y-4">
                  {crop.diseases && crop.diseases.length > 0 ? (
                    crop.diseases.map((disease, index) => (
                      <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <h3 className="font-semibold text-red-800 mb-2">{disease.name}</h3>
                        <p className="text-red-700 mb-2"><strong>Symptoms:</strong> {disease.symptoms}</p>
                        <p className="text-red-700"><strong>Treatment:</strong> {disease.treatment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No common diseases reported for this crop.</p>
                  )}
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Sprout className="h-6 w-6 text-green-500 mr-2" />
                  Growing Tips
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <ul className="space-y-2 text-green-800">
                    <li>• Ensure proper soil drainage to prevent root rot</li>
                    <li>• Monitor for pests regularly, especially during early growth stages</li>
                    <li>• Water consistently but avoid overwatering</li>
                    <li>• Use organic fertilizers for sustainable growth</li>
                    <li>• Rotate crops annually to maintain soil health</li>
                  </ul>
                </div>
              </motion.section>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={crop.imageUrl}
                  alt={crop.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-primary text-white p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Growth Period:</span>
                    <span>90-120 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yield Potential:</span>
                    <span>High</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span>Moderate</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Climate:</span>
                    <span>Tropical</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-secondary text-white p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold mb-4">Market Insights</h3>
                <p className="mb-3">Current market trends for {crop.name}:</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Avg. Price:</span>
                    <span>$2.50/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trend:</span>
                    <span className="text-green-200">↗ Rising</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Demand:</span>
                    <span>High</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-accent text-white p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold mb-4">Expert Rating</h3>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-current" />
                  ))}
                  <span className="ml-2">5.0</span>
                </div>
                <p className="text-sm opacity-90">Highly recommended for sustainable farming</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CropDetail;

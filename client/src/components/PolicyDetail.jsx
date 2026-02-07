import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building, Phone, FileText, ExternalLink, Bookmark, Share2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const PolicyDetail = () => {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    fetchPolicy();
  }, [id]);

  const fetchPolicy = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/policies/${id}`);
      setPolicy(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Failed to load policy details');
      setLoading(false);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleShare = () => {
    navigator.share({
      title: policy?.title,
      text: policy?.summary,
      url: window.location.href
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  );

  if (!policy) return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">Policy not found</p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent to-primary text-white p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                policy.category === 'Agricultural Policy' ? 'bg-green-500 text-white' :
                policy.category === 'Trade Policy' ? 'bg-blue-500 text-white' :
                policy.category === 'Environmental Policy' ? 'bg-yellow-500 text-white' :
                policy.category === 'Technology Policy' ? 'bg-purple-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {policy.category.split(' ')[0]}
              </span>
              <h1 className="text-4xl font-bold mb-2">{policy.title}</h1>
              <p className="text-xl opacity-90">{policy.summary}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleBookmark}
                className={`p-3 rounded-full ${isBookmarked ? 'bg-white/20' : 'bg-white/10'} hover:bg-white/30 transition-colors`}
              >
                <Bookmark className="h-6 w-6" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-full bg-white/10 hover:bg-white/30 transition-colors"
              >
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/90">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{policy.region}</span>
            </div>
            {policy.effectiveDate && (
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Effective: {new Date(policy.effectiveDate).toLocaleDateString()}</span>
              </div>
            )}
            {policy.implementingAuthority && (
              <div className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                <span>{policy.implementingAuthority}</span>
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {policy.imageUrl && (
          <div className="p-8">
            <img
              src={policy.imageUrl}
              alt={policy.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Full Content */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FileText className="h-6 w-6 text-primary mr-2" />
              Policy Details
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {policy.content}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Key Information */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
              Key Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {policy.effectiveDate && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Effective Date</h3>
                  <p className="text-blue-700">{new Date(policy.effectiveDate).toLocaleDateString()}</p>
                </div>
              )}
              {policy.expiryDate && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Expiry Date</h3>
                  <p className="text-red-700">{new Date(policy.expiryDate).toLocaleDateString()}</p>
                </div>
              )}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Implementing Authority</h3>
                <p className="text-green-700">{policy.implementingAuthority}</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Category</h3>
                <p className="text-purple-700">{policy.category}</p>
              </div>
            </div>
          </motion.section>

          {/* Contact Information */}
          {policy.contactInfo && (
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Phone className="h-6 w-6 text-secondary mr-2" />
                Contact Information
              </h2>
              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6">
                <p className="text-gray-700">{policy.contactInfo}</p>
              </div>
            </motion.section>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-6 border-t"
          >
            <button className="flex-1 bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/80 transition-colors flex items-center justify-center font-semibold">
              <FileText className="h-5 w-5 mr-2" />
              Download Full Policy
            </button>
            <button className="flex-1 bg-secondary text-white px-8 py-3 rounded-lg hover:bg-secondary/80 transition-colors flex items-center justify-center font-semibold">
              <ExternalLink className="h-5 w-5 mr-2" />
              Official Website
            </button>
          </motion.div>
        </div>
      </div>

      {/* Related Policies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <h3 className="text-2xl font-bold mb-6">Related Policies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Placeholder for related policies - in a real app, you'd fetch similar policies */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-semibold mb-2">National Agriculture Policy 2024</h4>
            <p className="text-gray-600 text-sm mb-3">Comprehensive policy framework for sustainable agricultural development...</p>
            <span className="text-primary font-medium">Read More →</span>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-semibold mb-2">EU Green Deal Reforms</h4>
            <p className="text-gray-600 text-sm mb-3">Major reforms to make European agriculture climate-neutral by 2050...</p>
            <span className="text-primary font-medium">Read More →</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PolicyDetail;

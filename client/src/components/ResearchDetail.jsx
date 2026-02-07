import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, User, Eye, Heart, Clock, Tag, Share2, Bookmark } from 'lucide-react';
import toast from 'react-hot-toast';

const ResearchDetail = () => {
  const { id } = useParams();
  const [research, setResearch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetchResearch();
  }, [id]);

  const fetchResearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/research/${id}`);
      setResearch(res.data);
      setLikes(res.data.likes);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Failed to load research details');
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const newLikes = likes + 1;
      setLikes(newLikes);
      await axios.put(`http://localhost:5000/api/research/${id}`, { likes: newLikes });
      toast.success('Research liked!');
    } catch (err) {
      console.log(err);
      toast.error('Failed to like research');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleShare = () => {
    navigator.share({
      title: research?.title,
      text: research?.summary,
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

  if (!research) return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">Research article not found</p>
    </div>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            research.category === 'Crop Science' ? 'bg-green-100 text-green-800' :
            research.category === 'Technology' ? 'bg-blue-100 text-blue-800' :
            research.category === 'Sustainability' ? 'bg-yellow-100 text-yellow-800' :
            research.category === 'Policy' ? 'bg-purple-100 text-purple-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {research.category}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full ${isBookmarked ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'} hover:bg-primary hover:text-white transition-colors`}
            >
              <Bookmark className="h-5 w-5" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{research.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{research.summary}</p>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{research.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(research.publishedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{research.readTime} min read</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <Eye className="h-4 w-4 mr-1" />
              <span>{research.views}</span>
            </div>
            <button
              onClick={handleLike}
              className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
            >
              <Heart className="h-4 w-4 mr-1" />
              <span>{likes}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {research.imageUrl && (
        <div className="mb-8">
          <img
            src={research.imageUrl}
            alt={research.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {research.content}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
        <div className="flex flex-wrap gap-2">
          {research.tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
              <Tag className="h-3 w-3 mr-1" />
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Author Bio */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
            {research.author.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{research.author}</h3>
            <p className="text-gray-600">Agricultural Research Expert</p>
          </div>
        </div>
        <p className="text-gray-700">
          {research.author} is a leading researcher in agricultural sciences, specializing in {research.category.toLowerCase()}.
          Their work focuses on innovative solutions for sustainable farming and food security.
        </p>
      </div>

      {/* Related Articles */}
      <div className="border-t pt-8">
        <h3 className="text-2xl font-bold mb-6">Related Research</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Placeholder for related articles - in a real app, you'd fetch similar articles */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">Sustainable Rice Farming Techniques</h4>
            <p className="text-gray-600 text-sm">New methods reduce water usage by 30% while maintaining yields...</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">AI-Powered Pest Detection</h4>
            <p className="text-gray-600 text-sm">Machine learning model achieves 95% accuracy in early pest identification...</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ResearchDetail;

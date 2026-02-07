import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AuthContext } from '../contexts/AuthContext';
import { motion, useAnimation } from 'framer-motion';
import { Loader2, Cloud, TrendingUp, MessageSquare, BookOpen, Award, Users, Calendar, Target, Zap, Eye, Clock, Star } from 'lucide-react';
import toast from 'react-hot-toast';

// Animated Counter Component
const AnimatedCounter = ({ value }) => {
  return <span>{value}</span>;
};

// Skeleton Loading Component
const SkeletonCard = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
  </div>
);

const Dashboard = () => {
  const [weather, setWeather] = useState({
    location: 'Delhi, India',
    temperature: 28,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 12
  });
  const [marketData, setMarketData] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCrops: 45,
    activeSchemes: 12,
    forumPosts: 89,
    marketAlerts: 5
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marketRes, postsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/marketdata'),
          axios.get('http://localhost:5000/api/forumposts')
        ]);
        setMarketData(marketRes.data);
        setRecentPosts(postsRes.data.slice(0, 5));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        toast.error('Failed to load dashboard data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = marketData.map(item => ({
    name: item.cropName,
    price: item.price,
    trend: item.trend
  }));

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 p-6 rounded-xl h-48"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <div key={i} className="bg-gray-200 p-6 rounded-xl h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Welcome Section with Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-lg text-gray-600">
              Here's what's happening in your agricultural dashboard today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 lg:mt-0">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2 rounded-lg font-medium">
              {user?.role}
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Crops</p>
                <p className="text-2xl font-bold text-primary">
                  <AnimatedCounter value={stats.totalCrops} />
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-primary/60" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Schemes</p>
                <p className="text-2xl font-bold text-secondary">
                  <AnimatedCounter value={stats.activeSchemes} />
                </p>
              </div>
              <Target className="h-8 w-8 text-secondary/60" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Forum Posts</p>
                <p className="text-2xl font-bold text-accent">
                  <AnimatedCounter value={stats.forumPosts} />
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-accent/60" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Market Alerts</p>
                <p className="text-2xl font-bold text-orange-600">
                  <AnimatedCounter value={stats.marketAlerts} />
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600/60" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-xl shadow-lg border border-sky-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Cloud className="h-6 w-6 text-sky-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Weather</h3>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-sky-500 rounded-full mr-1 animate-pulse"></div>
              <span className="text-sky-600 font-medium">Updated</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-gray-600"><span className="font-medium">Location:</span></p>
              <p className="font-semibold text-gray-800">{weather.location}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600"><span className="font-medium">Temperature:</span></p>
              <p className="font-semibold text-gray-800 text-lg">{weather.temperature}°C</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600"><span className="font-medium">Condition:</span></p>
              <p className="font-semibold text-gray-800">{weather.condition}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600"><span className="font-medium">Humidity:</span></p>
              <p className="font-semibold text-gray-800">{weather.humidity}%</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-sky-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Perfect for farming today!</span>
              <Cloud className="h-5 w-5 text-sky-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-lg border border-green-100"
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">Market Overview</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f9fafb',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#059669"
                strokeWidth={3}
                dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl shadow-lg border border-purple-100"
        >
          <div className="flex items-center mb-4">
            <Zap className="h-6 w-6 text-purple-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/crops"
                className="flex items-center bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-3 rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full justify-center"
              >
                <BookOpen className="h-5 w-5 mr-3" />
                Browse Crops
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/forum"
                className="flex items-center bg-gradient-to-r from-secondary to-secondary/80 text-white px-4 py-3 rounded-lg hover:from-secondary/90 hover:to-secondary/70 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full justify-center"
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                Ask Experts
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/profile"
                className="flex items-center bg-gradient-to-r from-accent to-accent/80 text-white px-4 py-3 rounded-lg hover:from-accent/90 hover:to-accent/70 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full justify-center"
              >
                <Users className="h-5 w-5 mr-3" />
                Update Profile
              </Link>
            </motion.div>
          </div>
          <div className="mt-4 pt-4 border-t border-purple-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Most popular actions</span>
              <Zap className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </motion.div>
      </div>

      {user?.role === 'Farmer' && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -3 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl shadow-lg border border-orange-100"
          >
            <div className="flex items-center mb-4">
              <Star className="h-6 w-6 text-orange-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Saved Crops</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Your favorite crops for quick access</p>
              <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                0 crops
              </div>
            </div>
            <Link to="/crops" className="inline-flex items-center mt-4 text-orange-600 hover:text-orange-700 font-medium">
              <Eye className="h-4 w-4 mr-1" />
              View All Crops
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -3 }}
            className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl shadow-lg border border-teal-100"
          >
            <div className="flex items-center mb-4">
              <Target className="h-6 w-6 text-teal-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Recommended Schemes</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Government schemes for farmers</p>
              <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                3 available
              </div>
            </div>
            <Link to="/schemes" className="inline-flex items-center mt-4 text-teal-600 hover:text-teal-700 font-medium">
              <Calendar className="h-4 w-4 mr-1" />
              Explore Schemes
            </Link>
          </motion.div>
        </motion.div>
      )}

      {user?.role === 'Expert' && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold mb-4">Recent Questions</h3>
          <div className="space-y-2">
            {recentPosts.map(post => (
              <Link key={post._id} to={`/forum/${post._id}`} className="block p-3 border rounded hover:bg-gray-50">
                <h4 className="font-medium">{post.title}</h4>
                <p className="text-sm text-gray-600">{post.content.substring(0, 100)}...</p>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Dashboard;

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AuthContext } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Loader2, Cloud, TrendingUp, MessageSquare, BookOpen, Award, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [weather, setWeather] = useState({});
  const [marketData, setMarketData] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weatherRes, marketRes, postsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/weather'),
          axios.get('http://localhost:5001/api/marketdata'),
          axios.get('http://localhost:5000/api/forumposts')
        ]);
        setWeather(weatherRes.data);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold mb-4">Weather</h3>
          <p>Location: {weather.location}</p>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.condition}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold mb-4">Market Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#059669" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link to="/crops" className="block bg-primary text-white px-4 py-2 rounded hover:bg-primary/80">Browse Crops</Link>
            <Link to="/forum" className="block bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/80">Ask Experts</Link>
            <Link to="/profile" className="block bg-accent text-white px-4 py-2 rounded hover:bg-accent/80">Update Profile</Link>
          </div>
        </motion.div>
      </div>

      {user?.role === 'Farmer' && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Saved Crops</h3>
            <p>Your saved crops will appear here.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Recommended Schemes</h3>
            <p>Government schemes tailored for you.</p>
          </div>
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

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, FileText, ExternalLink, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const GovernmentSchemeDetail = () => {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScheme();
  }, [id]);

  const fetchScheme = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/schemes/${id}`);
      setScheme(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching scheme:', err);
      toast.error('Failed to load scheme details');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Scheme not found.</p>
        <Link to="/schemes" className="text-primary hover:underline">Back to schemes</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <Link to="/schemes" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Government Schemes
      </Link>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative h-64 bg-gradient-to-r from-primary to-secondary">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{scheme.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {scheme.region}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Deadline: {new Date(scheme.deadline).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-2">Eligibility</h3>
              <p className="text-sm text-gray-600">{scheme.eligibility}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <FileText className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-2">Benefits</h3>
              <p className="text-sm text-gray-600">{scheme.benefits}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ExternalLink className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-2">Category</h3>
              <p className="text-sm text-gray-600">{scheme.category}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{scheme.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Application Process</h2>
            <p className="text-gray-700 leading-relaxed">{scheme.applicationProcess}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-700">{scheme.contactInfo}</p>
          </div>

          <div className="bg-primary text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Ready to Apply?</h3>
            <p className="mb-4">Don't miss this opportunity. Apply before the deadline to secure your benefits.</p>
            <button className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GovernmentSchemeDetail;

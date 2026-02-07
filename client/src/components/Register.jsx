import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, MapPin, AlertCircle, Globe, X, FileText, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/auth/register', data);
      toast.success('Account created successfully!');

      // Auto login after registration
      const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
        email: data.email,
        password: data.password
      });
      login(loginRes.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/10 to-accent/10 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl"
      >
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-secondary rounded-full flex items-center justify-center mb-4">
            <User className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Join UniField
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your account to access agricultural resources
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                  {...register('name', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                />
              </div>
              {errors.name && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
              </div>
              {errors.email && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Create a password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                    }
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            {/* Role Field */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                I am a
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="role"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                  {...register('role', { required: 'Please select your role' })}
                >
                  <option value="Farmer">Farmer</option>
                  <option value="Expert">Agricultural Expert</option>
                  <option value="Admin">Administrator</option>
                </select>
              </div>
              {errors.role && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.role.message}
                </div>
              )}
            </div>

            {/* Language Preference */}
            <div>
              <label htmlFor="languagePref" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Language
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="languagePref"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                  {...register('languagePref')}
                >
                  <option value="EN">English</option>
                  <option value="HI">Hindi</option>
                  <option value="ES">Spanish</option>
                </select>
              </div>
            </div>

            {/* Location Field */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="location"
                  type="text"
                  autoComplete="address-level2"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors ${
                    errors.location ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="City, State/Country"
                  {...register('location', {
                    required: 'Location is required'
                  })}
                />
              </div>
              {errors.location && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.location.message}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
              {...register('terms', {
                required: 'You must accept the terms and conditions'
              })}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-secondary hover:text-secondary/80 font-medium underline"
              >
                Terms and Conditions
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="text-secondary hover:text-secondary/80 font-medium underline"
              >
                Privacy Policy
              </button>
            </label>
          </div>
          {errors.terms && (
            <div className="flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.terms.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-secondary hover:text-secondary/80 transition-colors"
              >
                Sign in here
              </Link>
            </span>
          </div>
        </form>
      </motion.div>

      {/* Terms and Conditions Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowTermsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 text-secondary mr-2" />
                    <h3 className="text-xl font-bold text-gray-900">Terms and Conditions</h3>
                  </div>
                  <button
                    onClick={() => setShowTermsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <h4 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h4>
                  <p className="mb-4">
                    By accessing and using UniField, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">2. Use License</h4>
                  <p className="mb-4">
                    Permission is granted to temporarily access the materials (information or software) on UniField's website for personal, non-commercial transitory viewing only.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">3. User Responsibilities</h4>
                  <p className="mb-4">
                    Users are responsible for maintaining the confidentiality of their account and password. Users agree to accept responsibility for all activities that occur under their account.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">4. Content Policy</h4>
                  <p className="mb-4">
                    Users may not post content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or invasive of another's privacy.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">5. Privacy</h4>
                  <p className="mb-4">
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of UniField, to understand our practices.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">6. Termination</h4>
                  <p className="mb-4">
                    We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">7. Limitation of Liability</h4>
                  <p className="mb-4">
                    In no event shall UniField or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on UniField's website.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">8. Governing Law</h4>
                  <p className="mb-4">
                    These terms and conditions are governed by and construed in accordance with applicable laws, and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts.
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowTermsModal(false)}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    I Understand
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowPrivacyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Shield className="h-6 w-6 text-secondary mr-2" />
                    <h3 className="text-xl font-bold text-gray-900">Privacy Policy</h3>
                  </div>
                  <button
                    onClick={() => setShowPrivacyModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <h4 className="text-lg font-semibold mb-3">1. Information We Collect</h4>
                  <p className="mb-4">
                    We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, location, and agricultural preferences.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">2. How We Use Your Information</h4>
                  <p className="mb-4">
                    We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">3. Information Sharing</h4>
                  <p className="mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">4. Data Security</h4>
                  <p className="mb-4">
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">5. Cookies and Tracking</h4>
                  <p className="mb-4">
                    We use cookies and similar technologies to enhance your experience on our platform, analyze usage patterns, and provide personalized content.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">6. Your Rights</h4>
                  <p className="mb-4">
                    You have the right to access, update, or delete your personal information. You may also opt out of certain communications or request data portability.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">7. Children's Privacy</h4>
                  <p className="mb-4">
                    Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">8. Changes to This Policy</h4>
                  <p className="mb-4">
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "last updated" date.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">9. Contact Us</h4>
                  <p className="mb-4">
                    If you have any questions about this privacy policy, please contact us at privacy@unifield.com.
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowPrivacyModal(false)}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    I Understand
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Register;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, FileText, BookOpen, Gavel, BarChart3, Settings, Plus, Edit, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    users: 0,
    crops: 0,
    schemes: 0,
    research: 0,
    policies: 0,
    posts: 0
  });
  const [data, setData] = useState({
    users: [],
    crops: [],
    schemes: [],
    research: [],
    policies: [],
    posts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'Admin') {
      fetchStats();
      fetchData();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const [usersRes, cropsRes, schemesRes, researchRes, policiesRes, postsRes] = await Promise.all([
        axios.get('http://localhost:5001/api/users'),
        axios.get('http://localhost:5001/api/cropguides'),
        axios.get('http://localhost:5001/api/schemes'),
        axios.get('http://localhost:5001/api/research'),
        axios.get('http://localhost:5001/api/policies'),
        axios.get('http://localhost:5001/api/forumposts')
      ]);

      setStats({
        users: usersRes.data.length,
        crops: cropsRes.data.length,
        schemes: schemesRes.data.length,
        research: researchRes.data.length,
        policies: policiesRes.data.length,
        posts: postsRes.data.length
      });
    } catch (err) {
      console.log(err);
      toast.error('Failed to load statistics');
    }
  };

  const fetchData = async () => {
    try {
      const [usersRes, cropsRes, schemesRes, researchRes, policiesRes, postsRes] = await Promise.all([
        axios.get('http://localhost:5003/api/users'),
        axios.get('http://localhost:5003/api/cropguides'),
        axios.get('http://localhost:5003/api/schemes'),
        axios.get('http://localhost:5003/api/research'),
        axios.get('http://localhost:5003/api/policies'),
        axios.get('http://localhost:5003/api/forumposts')
      ]);

      setData({
        users: usersRes.data,
        crops: cropsRes.data,
        schemes: schemesRes.data,
        research: researchRes.data,
        policies: policiesRes.data,
        posts: postsRes.data
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Failed to load data');
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      let endpoint;
      switch (type) {
        case 'user': endpoint = `api/users/${id}`; break;
        case 'crop': endpoint = `api/cropguides/${id}`; break;
        case 'scheme': endpoint = `api/schemes/${id}`; break;
        case 'research': endpoint = `api/research/${id}`; break;
        case 'policy': endpoint = `api/policies/${id}`; break;
        case 'post': endpoint = `api/forumposts/${id}`; break;
        default: return;
      }

      await axios.delete(`http://localhost:5000/${endpoint}`);
      toast.success(`${type} deleted successfully`);
      fetchStats();
      fetchData();
    } catch (err) {
      console.log(err);
      toast.error(`Failed to delete ${type}`);
    }
  };

  if (user?.role !== 'Admin') {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'crops', label: 'Crop Guides', icon: FileText },
    { id: 'schemes', label: 'Schemes', icon: BookOpen },
    { id: 'research', label: 'Research', icon: FileText },
    { id: 'policies', label: 'Policies', icon: Gavel },
    { id: 'forum', label: 'Forum Posts', icon: FileText }
  ];

  const renderTable = (items, columns, type) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold capitalize">{type}</h3>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                {columns.map((col, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(type, item._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-xl text-gray-600">Manage UniField platform content and users</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Crop Guides</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.crops}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Schemes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.schemes}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Research</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.research}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <Gavel className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Policies</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.policies}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-indigo-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Forum Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.posts}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-gray-600">John Farmer joined the platform</p>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">New research article published</p>
                  <p className="text-sm text-gray-600">Drought-resistant wheat varieties study</p>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Scheme updated</p>
                  <p className="text-sm text-gray-600">PM-KISAN scheme deadline extended</p>
                </div>
                <span className="text-sm text-gray-500">3 days ago</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Users */}
      {activeTab === 'users' && renderTable(
        data.users,
        [
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          { key: 'location', label: 'Location' }
        ],
        'user'
      )}

      {/* Crops */}
      {activeTab === 'crops' && renderTable(
        data.crops,
        [
          { key: 'name', label: 'Name' },
          { key: 'season', label: 'Season' },
          { key: 'soil', label: 'Soil Type' }
        ],
        'crop'
      )}

      {/* Schemes */}
      {activeTab === 'schemes' && renderTable(
        data.schemes,
        [
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'region', label: 'Region' },
          { key: 'isActive', label: 'Status', render: (item) => item.isActive ? 'Active' : 'Inactive' }
        ],
        'scheme'
      )}

      {/* Research */}
      {activeTab === 'research' && renderTable(
        data.research,
        [
          { key: 'title', label: 'Title' },
          { key: 'author', label: 'Author' },
          { key: 'category', label: 'Category' },
          { key: 'isPublished', label: 'Status', render: (item) => item.isPublished ? 'Published' : 'Draft' }
        ],
        'research'
      )}

      {/* Policies */}
      {activeTab === 'policies' && renderTable(
        data.policies,
        [
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'region', label: 'Region' },
          { key: 'isActive', label: 'Status', render: (item) => item.isActive ? 'Active' : 'Inactive' }
        ],
        'policy'
      )}

      {/* Forum Posts */}
      {activeTab === 'forum' && renderTable(
        data.posts,
        [
          { key: 'title', label: 'Title' },
          { key: 'userID', label: 'Author', render: (item) => item.userID?.name || 'Unknown' },
          { key: 'upvotes', label: 'Upvotes' },
          { key: 'expertReplies', label: 'Expert Reply', render: (item) => item.expertReplies ? 'Yes' : 'No' }
        ],
        'post'
      )}
    </div>
  );
};

export default AdminPanel;

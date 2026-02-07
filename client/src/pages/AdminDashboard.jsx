import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  BookOpen,
  Gavel,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Menu,
  X,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    users: 0,
    crops: 0,
    schemes: 0,
    research: 0,
    policies: 0,
    posts: 0,
    marketdata: 0
  });
  const [data, setData] = useState({
    users: [],
    crops: [],
    schemes: [],
    research: [],
    policies: [],
    posts: [],
    marketdata: []
  });
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentType, setCurrentType] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (user?.role === 'Admin') {
      fetchStats();
      fetchData();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const [usersRes, cropsRes, schemesRes, researchRes, policiesRes, postsRes, marketdataRes] = await Promise.all([
        axios.get('http://localhost:5000/api/users', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
        axios.get('http://localhost:5000/api/cropguides'),
        axios.get('http://localhost:5000/api/schemes'),
        axios.get('http://localhost:5000/api/research'),
        axios.get('http://localhost:5000/api/policies'),
        axios.get('http://localhost:5000/api/forumposts'),
        axios.get('http://localhost:5000/api/marketdata')
      ]);

      setStats({
        users: usersRes.data.length,
        crops: cropsRes.data.length,
        schemes: schemesRes.data.length,
        research: researchRes.data.length,
        policies: policiesRes.data.length,
        posts: postsRes.data.length,
        marketdata: marketdataRes.data.length
      });
    } catch (err) {
      console.log(err);
      toast.error('Failed to load statistics');
    }
  };

  const fetchData = async () => {
    try {
      const [usersRes, cropsRes, schemesRes, researchRes, policiesRes, postsRes, marketdataRes] = await Promise.all([
        axios.get('http://localhost:5000/api/users', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
        axios.get('http://localhost:5000/api/cropguides'),
        axios.get('http://localhost:5000/api/schemes'),
        axios.get('http://localhost:5000/api/research'),
        axios.get('http://localhost:5000/api/policies'),
        axios.get('http://localhost:5000/api/forumposts'),
        axios.get('http://localhost:5000/api/marketdata')
      ]);

      setData({
        users: usersRes.data,
        crops: cropsRes.data,
        schemes: schemesRes.data,
        research: researchRes.data,
        policies: policiesRes.data,
        posts: postsRes.data,
        marketdata: marketdataRes.data
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
        case 'marketdata': endpoint = `api/marketdata/${id}`; break;
        case 'post': endpoint = `api/forumposts/${id}`; break;
        default: return;
      }

      await axios.delete(`http://localhost:5000/${endpoint}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success(`${type} deleted successfully`);
      fetchStats();
      fetchData();
    } catch (err) {
      console.log(err);
      toast.error(`Failed to delete ${type}`);
    }
  };

  const handleView = (type, item) => {
    alert(`${type.toUpperCase()} DETAILS:\n\n${JSON.stringify(item, null, 2)}`);
  };

  const handleEdit = (type, item) => {
    setCurrentType(type);
    setCurrentItem(item);
    const itemCopy = { ...item };
    // Stringify array fields for form display
    if (Array.isArray(itemCopy.diseases)) itemCopy.diseases = JSON.stringify(itemCopy.diseases);
    if (Array.isArray(itemCopy.tags)) itemCopy.tags = JSON.stringify(itemCopy.tags);
    setFormData(itemCopy);
    setShowEditModal(true);
  };

  const handleAddNew = (type) => {
    setCurrentType(type);
    setCurrentItem(null);
    setFormData({});
    setImageFile(null);
    setShowAddModal(true);
  };

  const handleFormSubmit = async (e, type) => {
    e.preventDefault();

    try {
      let dataToSend;
      let headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      };

      // Filter out _id and prepare data
      const cleanFormData = { ...formData };
      delete cleanFormData._id;
      delete cleanFormData.__v;
      delete cleanFormData.createdAt;
      delete cleanFormData.updatedAt;

      if (type === 'crop' || type === 'scheme') {
        // Types that support images
        dataToSend = new FormData();
        Object.keys(cleanFormData).forEach(key => {
          let value = cleanFormData[key];
          if (Array.isArray(value)) {
            value = JSON.stringify(value);
          }
          if (value !== null && value !== undefined && value !== '') {
            dataToSend.append(key, value);
          }
        });
        if (imageFile) {
          dataToSend.append('image', imageFile);
        }
        // Let axios set Content-Type for FormData
      } else {
        // Other types - send as JSON
        dataToSend = cleanFormData;
        headers['Content-Type'] = 'application/json';
      }

      let endpoint;
      let method = currentItem ? 'put' : 'post';
      switch (type) {
        case 'crop': endpoint = currentItem ? `api/cropguides/${currentItem._id}` : 'api/cropguides'; break;
        case 'marketdata': endpoint = currentItem ? `api/marketdata/${currentItem._id}` : 'api/marketdata'; break;
        case 'scheme': endpoint = currentItem ? `api/schemes/${currentItem._id}` : 'api/schemes'; break;
        case 'research': endpoint = currentItem ? `api/research/${currentItem._id}` : 'api/research'; break;
        case 'policy': endpoint = currentItem ? `api/policies/${currentItem._id}` : 'api/policies'; break;
        case 'post': endpoint = currentItem ? `api/forumposts/${currentItem._id}` : 'api/forumposts'; break;
        default: return;
      }

      const response = await axios[method](`http://localhost:5000/${endpoint}`, dataToSend, { headers });

      toast.success(`${type} ${currentItem ? 'updated' : 'created'} successfully`);
      setShowAddModal(false);
      setShowEditModal(false);
      setCurrentType(null);
      setFormData({});
      setImageFile(null);
      fetchStats();
      fetchData();
    } catch (err) {
      console.log('Error details:', err.response?.data || err.message);
      toast.error(`Failed to ${currentItem ? 'update' : 'create'} ${type}: ${err.response?.data?.message || err.message}`);
    }
  };

  const getFormFields = (type) => {
    switch (type) {
      case 'crop':
        return [
          { key: 'name', label: 'Name', type: 'text', required: true },
          { key: 'season', label: 'Season', type: 'text', required: true },
          { key: 'soil', label: 'Soil Type', type: 'text', required: true },
          { key: 'water', label: 'Water Requirements', type: 'text', required: true },
          { key: 'diseases', label: 'Diseases (JSON)', type: 'textarea', required: false },
          { key: 'image', label: 'Image', type: 'file', required: !currentItem }
        ];
      case 'scheme':
        return [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'description', label: 'Description', type: 'textarea', required: true },
          { key: 'category', label: 'Category', type: 'text', required: true },
          { key: 'eligibility', label: 'Eligibility', type: 'textarea', required: true },
          { key: 'benefits', label: 'Benefits', type: 'textarea', required: true },
          { key: 'applicationProcess', label: 'Application Process', type: 'textarea', required: true },
          { key: 'deadline', label: 'Deadline', type: 'date', required: false },
          { key: 'contactInfo', label: 'Contact Info', type: 'text', required: false },
          { key: 'region', label: 'Region', type: 'text', required: true },
          { key: 'isActive', label: 'Active', type: 'checkbox', required: false },
          { key: 'image', label: 'Image', type: 'file', required: !currentItem }
        ];
      case 'research':
        return [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'summary', label: 'Summary', type: 'textarea', required: true },
          { key: 'content', label: 'Content', type: 'textarea', required: true },
          { key: 'author', label: 'Author', type: 'text', required: true },
          { key: 'category', label: 'Category', type: 'text', required: true },
          { key: 'tags', label: 'Tags', type: 'text', required: false },
          { key: 'publishedDate', label: 'Published Date', type: 'date', required: false },
          { key: 'isPublished', label: 'Published', type: 'checkbox', required: false }
        ];
      case 'policy':
        return [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'summary', label: 'Summary', type: 'textarea', required: true },
          { key: 'content', label: 'Content', type: 'textarea', required: true },
          { key: 'category', label: 'Category', type: 'text', required: true },
          { key: 'region', label: 'Region', type: 'text', required: true },
          { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: false },
          { key: 'implementingAuthority', label: 'Implementing Authority', type: 'text', required: false },
          { key: 'contactInfo', label: 'Contact Info', type: 'text', required: false },
          { key: 'isActive', label: 'Active', type: 'checkbox', required: false }
        ];
      case 'marketdata':
        return [
          { key: 'cropName', label: 'Crop Name', type: 'text', required: true },
          { key: 'region', label: 'Region', type: 'text', required: true },
          { key: 'price', label: 'Price', type: 'number', required: true },
          { key: 'trend', label: 'Trend', type: 'text', required: true }
        ];
      case 'post':
        return [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'content', label: 'Content', type: 'textarea', required: true },
          { key: 'tags', label: 'Tags', type: 'text', required: false },
          { key: 'upvotes', label: 'Upvotes', type: 'number', required: false },
          { key: 'expertReplies', label: 'Expert Replies', type: 'checkbox', required: false }
        ];
      default:
        return [];
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'crop-guides', label: 'Crop Guides', icon: FileText },
    { id: 'market-data', label: 'Market Data', icon: BarChart3 },
    { id: 'government-schemes', label: 'Government Schemes', icon: BookOpen },
    { id: 'forum-posts', label: 'Forum Posts', icon: FileText },
    { id: 'policy-info', label: 'Policy Info', icon: Gavel },
    { id: 'research-updates', label: 'Research Updates', icon: FileText },
    { id: 'user-management', label: 'User Management', icon: Users }
  ];

  const renderTable = (items, columns, type) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold capitalize">{type.replace('-', ' ')}</h3>
          <button
            onClick={() => handleAddNew(type)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors flex items-center"
          >
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
                    <button
                      onClick={() => handleView(type, item)}
                      className="text-blue-600 hover:text-blue-900"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(type, item)}
                      className="text-yellow-600 hover:text-yellow-900"
                      title="Edit Item"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(type, item._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Item"
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

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-emerald-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`}>
        <div className="flex items-center justify-center h-16 bg-emerald-900">
          <h1 className="text-white text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-3 text-left text-white hover:bg-emerald-700 transition-colors ${
                activeTab === tab.id ? 'bg-emerald-700' : ''
              }`}
            >
              <tab.icon className="h-5 w-5 mr-3" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-semibold text-gray-900 capitalize">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            <div></div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                    <BarChart3 className="h-8 w-8 text-indigo-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Market Data</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.marketdata}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-pink-500" />
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

          {activeTab === 'user-management' && renderTable(
            data.users,
            [
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role' },
              { key: 'location', label: 'Location' }
            ],
            'user'
          )}

          {activeTab === 'crop-guides' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Crop Guides</h3>
                  <button
                    onClick={() => handleAddNew('crop')}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Season</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Soil Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.crops.map((crop) => (
                      <tr key={crop._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img src={crop.imageUrl.startsWith('http') ? crop.imageUrl : `http://localhost:5000${crop.imageUrl}`} alt={crop.name} className="h-12 w-12 object-cover rounded" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{crop.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{crop.season}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{crop.soil}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView('crop', crop)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEdit('crop', crop)}
                              className="text-yellow-600 hover:text-yellow-900"
                              title="Edit Item"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete('crop', crop._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Item"
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
          )}

          {/* Placeholder for other tabs */}
          {activeTab === 'market-data' && renderTable(
            data.marketdata,
            [
              { key: 'cropName', label: 'Crop Name' },
              { key: 'region', label: 'Region' },
              { key: 'price', label: 'Price' },
              { key: 'trend', label: 'Trend' }
            ],
            'marketdata'
          )}

          {activeTab === 'government-schemes' && renderTable(
            data.schemes,
            [
              { key: 'title', label: 'Title' },
              { key: 'category', label: 'Category' },
              { key: 'region', label: 'Region' },
              { key: 'isActive', label: 'Status', render: (item) => item.isActive ? 'Active' : 'Inactive' }
            ],
            'scheme'
          )}

          {activeTab === 'forum-posts' && renderTable(
            data.posts,
            [
              { key: 'title', label: 'Title' },
              { key: 'userID', label: 'Author', render: (item) => item.userID?.name || 'Unknown' },
              { key: 'upvotes', label: 'Upvotes' },
              { key: 'expertReplies', label: 'Expert Reply', render: (item) => item.expertReplies ? 'Yes' : 'No' }
            ],
            'post'
          )}

          {activeTab === 'policy-info' && renderTable(
            data.policies,
            [
              { key: 'title', label: 'Title' },
              { key: 'category', label: 'Category' },
              { key: 'region', label: 'Region' },
              { key: 'isActive', label: 'Status', render: (item) => item.isActive ? 'Active' : 'Inactive' }
            ],
            'policy'
          )}

          {activeTab === 'research-updates' && renderTable(
            data.research,
            [
              { key: 'title', label: 'Title' },
              { key: 'author', label: 'Author' },
              { key: 'category', label: 'Category' },
              { key: 'isPublished', label: 'Status', render: (item) => item.isPublished ? 'Published' : 'Draft' }
            ],
            'research'
          )}
        </main>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && currentType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {showAddModal ? `Add New ${currentType.replace('-', ' ')}` : `Edit ${currentType.replace('-', ' ')}`}
            </h3>
            <form onSubmit={(e) => handleFormSubmit(e, currentType)}>
              {getFormFields(currentType).map((field) => (
                <div key={field.key} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={formData[field.key] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required={field.required}
                      rows={3}
                    />
                  ) : field.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={formData[field.key] || false}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.checked })}
                      className="mt-1"
                    />
                  ) : field.type === 'file' ? (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required={field.required}
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.key] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required={field.required}
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setCurrentType(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700"
                >
                  {showAddModal ? 'Add' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

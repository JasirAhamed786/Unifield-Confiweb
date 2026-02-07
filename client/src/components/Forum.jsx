import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CheckCircle, Plus, Bookmark, Share2, Trash2, Heart, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });
  const [savedPosts, setSavedPosts] = useState(new Set());
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get('http://localhost:5000/api/forumposts')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Please login to add a post');
      return;
    }

    try {
      const tags = newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      await axios.post('http://localhost:5000/api/forumposts', {
        ...newPost,
        tags
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Post added successfully!');
      setNewPost({ title: '', content: '', tags: '' });
      setShowAddPost(false);
      fetchPosts();
    } catch (err) {
      toast.error('Failed to add post');
    }
  };

  const handleSavePost = (postId) => {
    if (!token) {
      toast.error('Please login to save posts');
      return;
    }

    const newSaved = new Set(savedPosts);
    if (newSaved.has(postId)) {
      newSaved.delete(postId);
      toast.success('Post unsaved');
    } else {
      newSaved.add(postId);
      toast.success('Post saved');
    }
    setSavedPosts(newSaved);
  };

  const handleSharePost = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${post.title}\n${post.content}\n${window.location.href}`);
      toast.success('Link copied to clipboard');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!token) return;

    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:5000/api/forumposts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Post deleted');
        fetchPosts();
      } catch (err) {
        toast.error('Failed to delete post');
      }
    }
  };

  const handleUpvote = async (postId) => {
    if (!token) {
      toast.error('Please login to upvote');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/forumposts/${postId}`, {
        upvotes: posts.find(p => p._id === postId).upvotes + 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPosts();
    } catch (err) {
      toast.error('Failed to upvote');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Community Forum</h2>
        {token && (
          <button
            onClick={() => setShowAddPost(!showAddPost)}
            className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Post
          </button>
        )}
      </div>

      {showAddPost && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Create New Post</h3>
          <form onSubmit={handleAddPost}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Post Title"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Post Content"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-secondary h-32"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={newPost.tags}
                onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90"
              >
                Post
              </button>
              <button
                type="button"
                onClick={() => setShowAddPost(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                {post.expertReplies && <CheckCircle className="ml-2 h-5 w-5 text-green-500" />}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpvote(post._id)}
                  className="flex items-center text-gray-500 hover:text-red-500"
                >
                  <Heart className="h-5 w-5 mr-1" />
                  {post.upvotes}
                </button>
                <button
                  onClick={() => handleSavePost(post._id)}
                  className={`p-1 rounded ${savedPosts.has(post._id) ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                >
                  <Bookmark className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleSharePost(post)}
                  className="p-1 text-gray-500 hover:text-green-500"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                {user && (user.role === 'Admin' || post.userID === user._id) && (
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="p-1 text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
            <p className="text-gray-600 mb-3">{post.content}</p>
            <div className="flex flex-wrap mb-3">
              {post.tags.map(tag => (
                <span key={tag} className="bg-primary text-white px-2 py-1 rounded-md text-sm mr-2">#{tag}</span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>By: {post.userID?.name || 'Anonymous'}</span>
              <span>Role: {post.userID?.role || 'User'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;

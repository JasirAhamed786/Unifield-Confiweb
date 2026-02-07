import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/forumposts/${id}`);
      setPost(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    try {
      const replyData = {
        title: `Reply to: ${post.title}`,
        content: newReply,
        tags: post.tags,
        userID: user._id
      };
      await axios.post('http://localhost:5000/api/forumposts', replyData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewReply('');
      fetchPost(); // Refresh to show new reply
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!post) return <div className="text-center py-8">Post not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <h1 className="text-2xl font-bold flex-1">{post.title}</h1>
            {post.expertReplies && <CheckCircle className="h-6 w-6 text-green-500 ml-2" />}
          </div>
          <p className="text-gray-700 mb-4">{post.content}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="bg-primary text-white px-2 py-1 rounded text-sm">#{tag}</span>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>By: {post.userID?.name} ({post.userID?.role})</span>
            <span>Upvotes: {post.upvotes}</span>
          </div>
        </div>
      </div>

      {user && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Add a Reply</h2>
            <form onSubmit={handleReply}>
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Share your expertise..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
                required
              />
              <button
                type="submit"
                className="mt-3 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/80"
              >
                Post Reply
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Replies</h2>
        {replies.length === 0 ? (
          <p className="text-gray-500">No replies yet. Be the first to help!</p>
        ) : (
          replies.map(reply => (
            <motion.div
              key={reply._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-4 rounded-lg shadow"
            >
              <div className="flex items-center mb-2">
                <span className="font-medium">{reply.userID?.name}</span>
                {reply.userID?.role === 'Expert' && <CheckCircle className="h-4 w-4 text-green-500 ml-2" />}
                <span className="text-sm text-gray-500 ml-2">({reply.userID?.role})</span>
              </div>
              <p className="text-gray-700">{reply.content}</p>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default PostDetail;

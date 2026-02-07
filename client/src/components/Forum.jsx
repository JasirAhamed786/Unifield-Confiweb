import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';

const Forum = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/forumposts')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Community Forum</h2>
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              {post.expertReplies && <CheckCircle className="ml-2 h-5 w-5 text-green-500" />}
            </div>
            <p className="text-gray-600">{post.content}</p>
            <div className="flex flex-wrap mt-2">
              {post.tags.map(tag => (
                <span key={tag} className="bg-primary text-white px-2 py-1 rounded-md text-sm mr-2">#{tag}</span>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">Upvotes: {post.upvotes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;

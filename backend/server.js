const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/unifield', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Routes
app.get('/', (req, res) => res.send('UniField Backend'));

// Auth routes
const User = require('./models/User');

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role, languagePref, location } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role,
    languagePref,
    location
  });

  try {
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET || 'secretkey');
  res.json({ token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
});

// Protected user routes
app.get('/api/users', verifyToken, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

app.get('/api/users/:id', verifyToken, async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  res.json(user);
});

app.put('/api/users/:id', verifyToken, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  res.json(user);
});

// Weather API
app.get('/api/weather', (req, res) => {
  // Mock data
  res.json({
    location: 'Mumbai',
    temperature: 28,
    condition: 'Sunny',
    forecast: 'Clear skies'
  });
});

// Diagnose API
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
app.post('/api/diagnose', upload.single('image'), (req, res) => {
  // Mock diagnosis
  res.json({
    diagnosis: 'Healthy crop',
    treatment: 'No action needed'
  });
});

// CropGuide routes
const CropGuide = require('./models/CropGuide');
app.get('/api/cropguides', async (req, res) => {
  const guides = await CropGuide.find();
  res.json(guides);
});

app.get('/api/cropguides/:id', async (req, res) => {
  const guide = await CropGuide.findById(req.params.id);
  res.json(guide);
});

app.post('/api/cropguides', verifyToken, async (req, res) => {
  const guide = new CropGuide(req.body);
  await guide.save();
  res.json(guide);
});

app.put('/api/cropguides/:id', verifyToken, async (req, res) => {
  const guide = await CropGuide.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(guide);
});

app.delete('/api/cropguides/:id', verifyToken, async (req, res) => {
  await CropGuide.findByIdAndDelete(req.params.id);
  res.json({ message: 'Crop guide deleted' });
});

// MarketData routes
const MarketData = require('./models/MarketData');
app.get('/api/marketdata', async (req, res) => {
  const data = await MarketData.find();
  res.json(data);
});

app.post('/api/marketdata', verifyToken, async (req, res) => {
  const data = new MarketData(req.body);
  await data.save();
  res.json(data);
});

// GovernmentScheme routes
const GovernmentScheme = require('./models/GovernmentScheme');
app.get('/api/schemes', async (req, res) => {
  const schemes = await GovernmentScheme.find({ isActive: true });
  res.json(schemes);
});

app.get('/api/schemes/:id', async (req, res) => {
  const scheme = await GovernmentScheme.findById(req.params.id);
  res.json(scheme);
});

app.post('/api/schemes', verifyToken, async (req, res) => {
  const scheme = new GovernmentScheme(req.body);
  await scheme.save();
  res.json(scheme);
});

app.put('/api/schemes/:id', verifyToken, async (req, res) => {
  const scheme = await GovernmentScheme.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(scheme);
});

app.delete('/api/schemes/:id', verifyToken, async (req, res) => {
  await GovernmentScheme.findByIdAndDelete(req.params.id);
  res.json({ message: 'Scheme deleted' });
});

// ResearchUpdate routes
const ResearchUpdate = require('./models/ResearchUpdate');
app.get('/api/research', async (req, res) => {
  const updates = await ResearchUpdate.find({ isPublished: true }).sort({ publishedDate: -1 });
  res.json(updates);
});

app.get('/api/research/:id', async (req, res) => {
  const update = await ResearchUpdate.findById(req.params.id);
  if (update) {
    update.views += 1;
    await update.save();
  }
  res.json(update);
});

app.post('/api/research', verifyToken, async (req, res) => {
  const update = new ResearchUpdate(req.body);
  await update.save();
  res.json(update);
});

app.put('/api/research/:id', verifyToken, async (req, res) => {
  const update = await ResearchUpdate.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(update);
});

app.delete('/api/research/:id', verifyToken, async (req, res) => {
  await ResearchUpdate.findByIdAndDelete(req.params.id);
  res.json({ message: 'Research update deleted' });
});

// PolicyInformation routes
const PolicyInformation = require('./models/PolicyInformation');
app.get('/api/policies', async (req, res) => {
  const policies = await PolicyInformation.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(policies);
});

app.get('/api/policies/:id', async (req, res) => {
  const policy = await PolicyInformation.findById(req.params.id);
  res.json(policy);
});

app.post('/api/policies', verifyToken, async (req, res) => {
  const policy = new PolicyInformation(req.body);
  await policy.save();
  res.json(policy);
});

app.put('/api/policies/:id', verifyToken, async (req, res) => {
  const policy = await PolicyInformation.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
  res.json(policy);
});

app.delete('/api/policies/:id', verifyToken, async (req, res) => {
  await PolicyInformation.findByIdAndDelete(req.params.id);
  res.json({ message: 'Policy deleted' });
});

// ForumPost routes
const ForumPost = require('./models/ForumPost');
app.get('/api/forumposts', async (req, res) => {
  const posts = await ForumPost.find().populate('userID', 'name role');
  res.json(posts);
});

app.get('/api/forumposts/:id', async (req, res) => {
  const post = await ForumPost.findById(req.params.id).populate('userID', 'name role');
  res.json(post);
});

app.post('/api/forumposts', verifyToken, async (req, res) => {
  const post = new ForumPost({ ...req.body, userID: req.user._id });
  await post.save();
  res.json(post);
});

app.put('/api/forumposts/:id', verifyToken, async (req, res) => {
  const post = await ForumPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
});

app.delete('/api/forumposts/:id', verifyToken, async (req, res) => {
  await ForumPost.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
});

// restart

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

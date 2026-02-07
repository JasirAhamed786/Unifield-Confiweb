# Admin Dashboard Fixes

## Issues Identified
- Failed to load statistics: fetchStats calls /api/users without Authorization header
- Cannot create crop: POST /api/cropguides doesn't handle multipart/form-data for image upload
- Images not visualizing properly in admin panel for crop guides
- Cannot do some operations: Likely auth issues in other routes

## Tasks
- [ ] Fix fetchStats in AdminDashboard.jsx to include Authorization header in all API calls
- [ ] Update POST /api/cropguides route in server.js to use multer for image upload and set imageUrl
- [ ] Test crop creation and image visualization
- [ ] Check and fix auth issues in other admin operations (edit, delete for crops and other entities)
- [ ] Verify all admin operations work correctly

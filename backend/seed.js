const mongoose = require('mongoose');
const User = require('./models/User');
const CropGuide = require('./models/CropGuide');
const MarketData = require('./models/MarketData');
const ForumPost = require('./models/ForumPost');
const GovernmentScheme = require('./models/GovernmentScheme');
const ResearchUpdate = require('./models/ResearchUpdate');
const PolicyInformation = require('./models/PolicyInformation');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/unifield');

    // Clear existing data
    await User.deleteMany({});
    await CropGuide.deleteMany({});
    await MarketData.deleteMany({});
    await ForumPost.deleteMany({});
    await GovernmentScheme.deleteMany({});
    await ResearchUpdate.deleteMany({});
    await PolicyInformation.deleteMany({});

    // Seed Users - commented out to prevent seeding users
    // const users = await User.insertMany([
    //   {
    //     name: 'John Farmer',
    //     email: 'john@example.com',
    //     password: '$2a$10$hashedpassword1', // password: farmer123
    //     role: 'Farmer',
    //     languagePref: 'EN',
    //     location: 'California, USA'
    //   },
    //   {
    //     name: 'Dr. Sarah Expert',
    //     email: 'sarah@example.com',
    //     password: '$2a$10$hashedpassword2', // password: expert123
    //     role: 'Expert',
    //     languagePref: 'EN',
    //     location: 'Iowa, USA'
    //   },
    //   {
    //     name: 'Admin User',
    //     email: 'admin@example.com',
    //     password: '$2a$10$hashedpassword3', // password: admin123
    //     role: 'Admin',
    //     languagePref: 'EN',
    //     location: 'Washington, DC'
    //   }
    // ]);

    // Seed Crop Guides
    const cropGuides = await CropGuide.insertMany([
      {
        name: 'Wheat',
        season: 'Winter',
        soil: 'Well-drained loamy soil',
        water: 'Regular irrigation, 500-600mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Wheat Rust',
            symptoms: 'Orange-brown pustules on leaves',
            treatment: 'Fungicide application and resistant varieties'
          },
          {
            name: 'Powdery Mildew',
            symptoms: 'White powdery coating on leaves',
            treatment: 'Sulfur-based fungicides and proper spacing'
          }
        ]
      },
      {
        name: 'Rice',
        season: 'Monsoon',
        soil: 'Clayey soil with good water retention',
        water: 'Flooded conditions, 1200-1500mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9aefacd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Rice Blast',
            symptoms: 'Diamond-shaped lesions on leaves',
            treatment: 'Systemic fungicides and field sanitation'
          },
          {
            name: 'Bacterial Blight',
            symptoms: 'Water-soaked lesions turning yellow-brown',
            treatment: 'Copper-based bactericides and resistant varieties'
          }
        ]
      },
      {
        name: 'Corn',
        season: 'Spring-Summer',
        soil: 'Fertile, well-drained soil',
        water: '600-800mm annually, drought-sensitive',
        imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Corn Borer',
            symptoms: 'Holes in leaves and stalks',
            treatment: 'Bt toxin crops and biological control'
          }
        ]
      },
      {
        name: 'Soybean',
        season: 'Spring-Summer',
        soil: 'Well-drained fertile soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1592982375567-7b3930a7f9a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Soybean Rust',
            symptoms: 'Rust-colored spots on leaves',
            treatment: 'Fungicide application'
          }
        ]
      },
      {
        name: 'Cotton',
        season: 'Spring-Summer',
        soil: 'Well-drained alluvial soil',
        water: '700-1000mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Cotton Bollworm',
            symptoms: 'Holes in bolls and leaves',
            treatment: 'Insecticide application'
          }
        ]
      },
      {
        name: 'Sugarcane',
        season: 'Year-round',
        soil: 'Deep, fertile, well-drained soil',
        water: '1500-2500mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Red Rot',
            symptoms: 'Red discoloration in stalks',
            treatment: 'Disease-resistant varieties'
          }
        ]
      },
      {
        name: 'Tomato',
        season: 'Spring-Summer',
        soil: 'Well-drained loamy soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Late Blight',
            symptoms: 'Dark spots on leaves and fruits',
            treatment: 'Copper fungicides'
          }
        ]
      },
      {
        name: 'Potato',
        season: 'Spring',
        soil: 'Sandy loam soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Late Blight',
            symptoms: 'Brown spots on leaves',
            treatment: 'Fungicide application'
          }
        ]
      },
      {
        name: 'Onion',
        season: 'Winter',
        soil: 'Fertile, well-drained soil',
        water: '300-500mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1618512496248-a01a9a7d3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Downy Mildew',
            symptoms: 'White fungal growth on leaves',
            treatment: 'Fungicide treatment'
          }
        ]
      },
      {
        name: 'Carrot',
        season: 'Fall-Winter',
        soil: 'Sandy loam soil',
        water: '300-500mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Carrot Fly',
            symptoms: 'Tunneling in roots',
            treatment: 'Insecticide and crop rotation'
          }
        ]
      },
      {
        name: 'Lettuce',
        season: 'Spring-Fall',
        soil: 'Rich, well-drained soil',
        water: 'Regular watering, 300-400mm',
        imageUrl: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Downy Mildew',
            symptoms: 'Yellow spots on leaves',
            treatment: 'Fungicide and good air circulation'
          }
        ]
      },
      {
        name: 'Spinach',
        season: 'Spring-Fall',
        soil: 'Fertile, moist soil',
        water: 'Consistent moisture, 250-350mm',
        imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Leaf Spot',
            symptoms: 'Dark spots on leaves',
            treatment: 'Remove affected leaves'
          }
        ]
      },
      {
        name: 'Cabbage',
        season: 'Spring-Fall',
        soil: 'Fertile, well-drained soil',
        water: '600-800mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1598030304671-5d3c89c6e1b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Clubroot',
            symptoms: 'Swollen roots',
            treatment: 'Soil sterilization'
          }
        ]
      },
      {
        name: 'Broccoli',
        season: 'Spring-Fall',
        soil: 'Rich, well-drained soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Head Rot',
            symptoms: 'Rotting heads',
            treatment: 'Proper spacing and fungicide'
          }
        ]
      },
      {
        name: 'Cauliflower',
        season: 'Spring-Fall',
        soil: 'Fertile, well-drained soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1598030304671-5d3c89c6e1b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Black Rot',
            symptoms: 'V-shaped lesions on leaves',
            treatment: 'Copper fungicide'
          }
        ]
      },
      {
        name: 'Cucumber',
        season: 'Spring-Summer',
        soil: 'Well-drained, fertile soil',
        water: '400-600mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Powdery Mildew',
            symptoms: 'White powdery coating',
            treatment: 'Sulfur fungicide'
          }
        ]
      },
      {
        name: 'Pepper',
        season: 'Spring-Summer',
        soil: 'Well-drained, fertile soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Bacterial Spot',
            symptoms: 'Dark spots on leaves',
            treatment: 'Copper bactericide'
          }
        ]
      },
      {
        name: 'Eggplant',
        season: 'Spring-Summer',
        soil: 'Well-drained, fertile soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Verticillium Wilt',
            symptoms: 'Wilting leaves',
            treatment: 'Fungicide and resistant varieties'
          }
        ]
      },
      {
        name: 'Garlic',
        season: 'Fall',
        soil: 'Well-drained, fertile soil',
        water: '300-500mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1618512496248-a01a9a7d3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'White Rot',
            symptoms: 'White fungal growth',
            treatment: 'Soil fumigation'
          }
        ]
      },
      {
        name: 'Ginger',
        season: 'Spring',
        soil: 'Rich, well-drained soil',
        water: '1500-2000mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1618375569909-3c8616d2e5b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Bacterial Wilt',
            symptoms: 'Wilting and yellowing',
            treatment: 'Antibiotic treatment'
          }
        ]
      },
      {
        name: 'Banana',
        season: 'Year-round',
        soil: 'Deep, fertile, well-drained soil',
        water: '1500-2000mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Panama Disease',
            symptoms: 'Wilting and death',
            treatment: 'Resistant varieties'
          }
        ]
      },
      {
        name: 'Mango',
        season: 'Spring',
        soil: 'Well-drained, fertile soil',
        water: '800-1200mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Anthracnose',
            symptoms: 'Dark spots on fruit',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Apple',
        season: 'Spring',
        soil: 'Well-drained, loamy soil',
        water: '600-800mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Apple Scab',
            symptoms: 'Dark spots on leaves',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Orange',
        season: 'Spring',
        soil: 'Well-drained, fertile soil',
        water: '800-1000mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Citrus Canker',
            symptoms: 'Raised lesions on fruit',
            treatment: 'Copper fungicide'
          }
        ]
      },
      {
        name: 'Grapes',
        season: 'Spring',
        soil: 'Well-drained, fertile soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Powdery Mildew',
            symptoms: 'White powdery coating',
            treatment: 'Sulfur fungicide'
          }
        ]
      },
      {
        name: 'Pineapple',
        season: 'Year-round',
        soil: 'Well-drained, sandy soil',
        water: '1000-1500mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Fusarium Wilt',
            symptoms: 'Wilting leaves',
            treatment: 'Resistant varieties'
          }
        ]
      },
      {
        name: 'Strawberry',
        season: 'Spring',
        soil: 'Well-drained, fertile soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Gray Mold',
            symptoms: 'Gray fuzzy mold on fruit',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Blueberry',
        season: 'Spring',
        soil: 'Acidic, well-drained soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Mummy Berry',
            symptoms: 'Shriveled berries',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Barley',
        season: 'Winter',
        soil: 'Well-drained loamy soil',
        water: '400-600mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Barley Yellow Dwarf',
            symptoms: 'Yellowing of leaves',
            treatment: 'Insecticide for aphids'
          }
        ]
      },
      {
        name: 'Oats',
        season: 'Spring',
        soil: 'Fertile, well-drained soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Crown Rust',
            symptoms: 'Orange pustules on leaves',
            treatment: 'Fungicide application'
          }
        ]
      },
      {
        name: 'Rye',
        season: 'Fall',
        soil: 'Well-drained loamy soil',
        water: '400-600mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Ergot',
            symptoms: 'Dark sclerotia in grain',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Millet',
        season: 'Summer',
        soil: 'Well-drained, sandy soil',
        water: '300-500mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9aefacd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Downy Mildew',
            symptoms: 'White fungal growth',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Sorghum',
        season: 'Summer',
        soil: 'Well-drained, fertile soil',
        water: '400-600mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Anthracnose',
            symptoms: 'Reddish-brown lesions',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Chickpea',
        season: 'Winter',
        soil: 'Well-drained, fertile soil',
        water: '300-500mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1592982375567-7b3930a7f9a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Ascochyta Blight',
            symptoms: 'Dark spots on leaves',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Lentil',
        season: 'Winter',
        soil: 'Well-drained, loamy soil',
        water: '300-500mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Rust',
            symptoms: 'Rust-colored spots',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Peas',
        season: 'Spring',
        soil: 'Well-drained, fertile soil',
        water: '400-600mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Powdery Mildew',
            symptoms: 'White powdery coating',
            treatment: 'Sulfur fungicide'
          }
        ]
      },
      {
        name: 'Beans',
        season: 'Spring-Summer',
        soil: 'Well-drained, fertile soil',
        water: '400-600mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Bean Rust',
            symptoms: 'Rust spots on leaves',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Groundnut',
        season: 'Spring-Summer',
        soil: 'Well-drained, sandy soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Leaf Spot',
            symptoms: 'Dark spots on leaves',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Sunflower',
        season: 'Spring-Summer',
        soil: 'Well-drained, fertile soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Downy Mildew',
            symptoms: 'Yellowing leaves',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Rapeseed',
        season: 'Fall',
        soil: 'Well-drained, fertile soil',
        water: '400-600mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Clubroot',
            symptoms: 'Swollen roots',
            treatment: 'Soil treatment'
          }
        ]
      },
      {
        name: 'Mustard',
        season: 'Winter',
        soil: 'Well-drained, fertile soil',
        water: '400-600mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Alternaria Leaf Spot',
            symptoms: 'Dark spots on leaves',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Safflower',
        season: 'Spring',
        soil: 'Well-drained, fertile soil',
        water: '300-500mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Rust',
            symptoms: 'Rust spots',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Flax',
        season: 'Spring',
        soil: 'Well-drained, fertile soil',
        water: '400-600mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9aefacd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Fusarium Wilt',
            symptoms: 'Wilting plants',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Jute',
        season: 'Summer',
        soil: 'Well-drained, fertile soil',
        water: '1500-2000mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Stem Rot',
            symptoms: 'Rotting stems',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Hemp',
        season: 'Spring-Summer',
        soil: 'Well-drained, fertile soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1592982375567-7b3930a7f9a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Botrytis',
            symptoms: 'Gray mold',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Tobacco',
        season: 'Spring',
        soil: 'Well-drained, fertile soil',
        water: '500-700mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Tobacco Mosaic',
            symptoms: 'Mosaic pattern on leaves',
            treatment: 'Virus-resistant varieties'
          }
        ]
      },
      {
        name: 'Coffee',
        season: 'Year-round',
        soil: 'Well-drained, acidic soil',
        water: '1500-2000mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Coffee Rust',
            symptoms: 'Orange spots on leaves',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Tea',
        season: 'Year-round',
        soil: 'Well-drained, acidic soil',
        water: '1500-2000mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Blister Blight',
            symptoms: 'Blisters on leaves',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Cocoa',
        season: 'Year-round',
        soil: 'Well-drained, fertile soil',
        water: '1500-2000mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Black Pod',
            symptoms: 'Black lesions on pods',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Rubber',
        season: 'Year-round',
        soil: 'Well-drained, fertile soil',
        water: '2000-2500mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9aefacd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Leaf Fall Disease',
            symptoms: 'Falling leaves',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Coconut',
        season: 'Year-round',
        soil: 'Well-drained, sandy soil',
        water: '1500-2000mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Bud Rot',
            symptoms: 'Rotting buds',
            treatment: 'Fungicide'
          }
        ]
      },
      {
        name: 'Palm Oil',
        season: 'Year-round',
        soil: 'Well-drained, fertile soil',
        water: '2000-2500mm annually',
        imageUrl: 'https://images.unsplash.com/photo-1592982375567-7b3930a7f9a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        diseases: [
          {
            name: 'Ganoderma',
            symptoms: 'Root rot',
            treatment: 'Fungicide'
          }
        ]
      }
    ]);

    // Seed Market Data
    await MarketData.insertMany([
      {
        cropName: 'Wheat',
        region: 'North America',
        price: 26560,
        trend: 'Up'
      },
      {
        cropName: 'Rice',
        region: 'Asia',
        price: 34030,
        trend: 'Down'
      },
      {
        cropName: 'Corn',
        region: 'Global',
        price: 20750,
        trend: 'Up'
      },
      {
        cropName: 'Soybean',
        region: 'South America',
        price: 31540,
        trend: 'Down'
      },
      {
        cropName: 'Cotton',
        region: 'India',
        price: 12450,
        trend: 'Up'
      }
    ]);

    // Seed Government Schemes
    await GovernmentScheme.insertMany([
      {
        title: 'Pradhan Mantri Kisan Samman Nidhi',
        description: 'Direct income support to farmers through DBT',
        category: 'Subsidy',
        eligibility: 'Small and marginal farmers with landholding up to 2 hectares',
        benefits: '₹6,000 per year in three equal installments',
        applicationProcess: 'Apply through CSC centers or online portal',
        deadline: new Date('2024-12-31'),
        contactInfo: 'PM-KISAN Helpline: 155261',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Farmers Producer Organization (FPO) Scheme',
        description: 'Support for forming and nurturing Farmer Producer Organizations',
        category: 'Training',
        eligibility: 'Groups of farmers, cooperatives',
        benefits: 'Up to ₹25 lakhs for business development',
        applicationProcess: 'Apply through SFAC or state agencies',
        contactInfo: 'SFAC: 011-23381385',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Agricultural Credit Subsidy',
        description: 'Interest subvention on agricultural loans',
        category: 'Loan',
        eligibility: 'All farmers for crop loans up to ₹3 lakhs',
        benefits: '3% interest subvention for timely repayment',
        applicationProcess: 'Through banks and NBFCs',
        contactInfo: 'Bank branches',
        region: 'Global',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'National Agriculture Market (eNAM)',
        description: 'Online trading platform for agricultural commodities',
        category: 'Other',
        eligibility: 'All farmers and traders registered with mandis',
        benefits: 'Better price discovery and reduced transaction costs',
        applicationProcess: 'Register through state agricultural marketing boards',
        deadline: new Date('2024-12-31'),
        contactInfo: 'eNAM Support: support@enam.gov.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Soil Health Card Scheme',
        description: 'Comprehensive soil testing and health management program',
        category: 'Other',
        eligibility: 'All farmers with cultivable land',
        benefits: 'Free soil testing and customized fertilizer recommendations',
        applicationProcess: 'Apply through local agriculture department offices',
        deadline: new Date('2024-06-30'),
        contactInfo: 'Soil Health Helpline: 1800-11-6666',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Pradhan Mantri Fasal Bima Yojana',
        description: 'Comprehensive crop insurance scheme',
        category: 'Insurance',
        eligibility: 'All farmers growing notified crops',
        benefits: 'Financial protection against crop loss due to natural calamities',
        applicationProcess: 'Through banks and CSC centers',
        deadline: new Date('2024-07-31'),
        contactInfo: 'PMFBY Helpline: 1800-11-5656',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'National Mission on Sustainable Agriculture',
        description: 'Promoting sustainable agricultural practices',
        category: 'Other',
        eligibility: 'Farmers interested in sustainable farming',
        benefits: 'Training, financial assistance for sustainable practices',
        applicationProcess: 'Apply through state agriculture departments',
        deadline: new Date('2024-12-31'),
        contactInfo: 'NMSA Support: nmsa@agricoop.nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Rashtriya Krishi Vikas Yojana',
        description: 'Strengthening agricultural infrastructure',
        category: 'Other',
        eligibility: 'State governments and farmer groups',
        benefits: 'Funding for irrigation, storage, and marketing infrastructure',
        applicationProcess: 'Through state agriculture plans',
        deadline: new Date('2024-12-31'),
        contactInfo: 'RKVY Support: rkvy@agricoop.nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Paramparagat Krishi Vikas Yojana',
        description: 'Promoting organic farming practices',
        category: 'Other',
        eligibility: 'Groups of 50 farmers for cluster formation',
        benefits: '₹50,000 per hectare for organic inputs and certification',
        applicationProcess: 'Apply through state agriculture departments',
        deadline: new Date('2024-08-31'),
        contactInfo: 'PKVY Helpline: 011-23381385',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'National Food Security Mission',
        description: 'Increasing production of rice, wheat, and pulses',
        category: 'Other',
        eligibility: 'Farmers in identified districts',
        benefits: 'Subsidies for seeds, fertilizers, and equipment',
        applicationProcess: 'Through state agriculture departments',
        deadline: new Date('2024-12-31'),
        contactInfo: 'NFSM Support: nfsm@agricoop.nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Dairy Entrepreneurship Development Scheme',
        description: 'Supporting dairy entrepreneurship',
        category: 'Other',
        eligibility: 'Individuals and groups interested in dairy business',
        benefits: 'Up to ₹30 lakhs for dairy infrastructure',
        applicationProcess: 'Apply through NABARD',
        deadline: new Date('2024-12-31'),
        contactInfo: 'NABARD: 022-26530000',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Mission for Integrated Development of Horticulture',
        description: 'Holistic development of horticulture sector',
        category: 'Other',
        eligibility: 'Farmers and farmer groups',
        benefits: 'Support for nursery, irrigation, and post-harvest infrastructure',
        applicationProcess: 'Through state horticulture missions',
        deadline: new Date('2024-12-31'),
        contactInfo: 'MIDH Support: midh@nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Natoional Bamboo Mission',
        description: 'Promoting bamboo cultivation and utilization',
        category: 'Other',
        eligibility: 'Farmers and entrepreneurs',
        benefits: 'Subsidies for bamboo plantation and processing',
        applicationProcess: 'Through state forest departments',
        deadline: new Date('2024-12-31'),
        contactInfo: 'NBM Support: nbm@nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Sub-Mission on Agricultural Mechanization',
        description: 'Promoting farm mechanization',
        category: 'Other',
        eligibility: 'Individual farmers and groups',
        benefits: 'Subsidies up to 50% for agricultural machinery',
        applicationProcess: 'Through state agriculture departments',
        deadline: new Date('2024-12-31'),
        contactInfo: 'SMAM Support: smam@agricoop.nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'National Mission on Oilseeds and Oil Palm',
        description: 'Increasing oilseed production',
        category: 'Other',
        eligibility: 'Farmers growing oilseed crops',
        benefits: 'Subsidies for seeds, fertilizers, and equipment',
        applicationProcess: 'Through state agriculture departments',
        deadline: new Date('2024-12-31'),
        contactInfo: 'NMOOP Support: nmoop@agricoop.nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Coconut Development Board Schemes',
        description: 'Supporting coconut cultivation and processing',
        category: 'Other',
        eligibility: 'Coconut farmers and processors',
        benefits: 'Subsidies for cultivation and processing equipment',
        applicationProcess: 'Through Coconut Development Board',
        deadline: new Date('2024-12-31'),
        contactInfo: 'CDB: 0471-2333171',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Integrated Scheme for Agricultural Marketing',
        description: 'Strengthening agricultural marketing infrastructure',
        category: 'Other',
        eligibility: 'State governments and marketing cooperatives',
        benefits: 'Funding for wholesale markets and cold storage',
        applicationProcess: 'Through Ministry of Agriculture',
        deadline: new Date('2024-12-31'),
        contactInfo: 'ISAM Support: isam@agricoop.nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Agricultural Technology Management Agency',
        description: 'Disseminating agricultural technologies',
        category: 'Technology',
        eligibility: 'Farmers and extension workers',
        benefits: 'Training and demonstration programs',
        applicationProcess: 'Through ATMA centers',
        deadline: new Date('2024-12-31'),
        contactInfo: 'ATMA Support: atma@agricoop.nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'National Livestock Mission',
        description: 'Sustainable development of livestock sector',
        category: 'Other',
        eligibility: 'Livestock farmers and entrepreneurs',
        benefits: 'Support for breed improvement and infrastructure',
        applicationProcess: 'Through state animal husbandry departments',
        deadline: new Date('2024-12-31'),
        contactInfo: 'NLM Support: nlm@nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Blue Revolution Scheme',
        description: 'Sustainable development of fisheries sector',
        category: 'Other',
        eligibility: 'Fish farmers and fishermen',
        benefits: 'Support for pond development and equipment',
        applicationProcess: 'Through Department of Fisheries',
        deadline: new Date('2024-12-31'),
        contactInfo: 'Blue Revolution: fisheries@nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'National Agroforestry Policy Implementation',
        description: 'Promoting agroforestry practices',
        category: 'Other',
        eligibility: 'Farmers interested in tree cultivation',
        benefits: 'Subsidies for tree plantation and maintenance',
        applicationProcess: 'Through state forest departments',
        deadline: new Date('2024-12-31'),
        contactInfo: 'NAP Support: agroforestry@nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Climate Smart Agriculture Mission',
        description: 'Adapting agriculture to climate change',
        category: 'Other',
        eligibility: 'Farmers in climate-vulnerable areas',
        benefits: 'Support for climate-resilient practices and equipment',
        applicationProcess: 'Through state agriculture departments',
        deadline: new Date('2024-12-31'),
        contactInfo: 'CSAM Support: climate@agricoop.nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Women in Agriculture Program',
        description: 'Empowering women in agricultural activities',
        category: 'Other',
        eligibility: 'Women farmers and entrepreneurs',
        benefits: 'Training, credit, and equipment support',
        applicationProcess: 'Through state women and child development departments',
        deadline: new Date('2024-12-31'),
        contactInfo: 'WIA Support: women@agricoop.nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Youth in Agriculture Program',
        description: 'Attracting youth to agricultural entrepreneurship',
        category: 'Other',
        eligibility: 'Young entrepreneurs aged 18-35',
        benefits: 'Training, mentorship, and financial support',
        applicationProcess: 'Through Ministry of Agriculture and Farmers Welfare',
        deadline: new Date('2024-12-31'),
        contactInfo: 'YIA Support: youth@agricoop.nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Digital Agriculture Mission',
        description: 'Implementing digital technologies in farming',
        category: 'Other',
        eligibility: 'Farmers and agri-tech startups',
        benefits: 'Support for IoT devices, apps, and digital platforms',
        applicationProcess: 'Through Ministry of Agriculture',
        deadline: new Date('2024-12-31'),
        contactInfo: 'DAM Support: digital@agricoop.nic.in',
        region: 'India',
        imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      }
    ]);

    // Seed Research Updates
    await ResearchUpdate.insertMany([
      {
        title: 'Breakthrough in Drought-Resistant Wheat Varieties',
        summary: 'New genetic modifications show 40% better water efficiency',
        content: 'Researchers at the International Maize and Wheat Improvement Center (CIMMYT) have developed new wheat varieties that can maintain yields with 40% less water. The breakthrough uses CRISPR technology to enhance root systems and drought tolerance genes.',
        author: 'Dr. Maria Rodriguez',
        category: 'Crop Science',
        tags: ['wheat', 'drought-resistance', 'genetics'],
        imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        publishedDate: new Date('2024-01-15'),
        isPublished: true,
        readTime: 5,
        views: 1250,
        likes: 89
      },
      {
        title: 'AI-Powered Pest Detection System',
        summary: 'Machine learning model achieves 95% accuracy in early pest identification',
        content: 'A new AI system developed by researchers at Stanford University can detect crop pests and diseases from smartphone images with 95% accuracy. The system uses deep learning algorithms trained on millions of crop images.',
        author: 'Prof. James Chen',
        category: 'Technology',
        tags: ['AI', 'pest-detection', 'machine-learning'],
        imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        publishedDate: new Date('2024-01-10'),
        isPublished: true,
        readTime: 7,
        views: 2100,
        likes: 156
      },
      {
        title: 'Sustainable Rice Farming Techniques',
        summary: 'New methods reduce water usage by 30% while maintaining yields',
        content: 'Researchers from the International Rice Research Institute (IRRI) have developed sustainable rice farming techniques that reduce water consumption by 30% through alternate wetting and drying methods combined with improved varieties.',
        author: 'Dr. Ahmed Hassan',
        category: 'Sustainability',
        tags: ['rice', 'water-conservation', 'sustainable-farming'],
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        publishedDate: new Date('2024-01-05'),
        isPublished: true,
        readTime: 6,
        views: 980,
        likes: 67
      }
    ]);

    // Seed Policy Information
    await PolicyInformation.insertMany([
      {
        title: 'National Agriculture Policy 2024',
        summary: 'Comprehensive policy framework for sustainable agricultural development',
        content: 'The National Agriculture Policy 2024 aims to double farmers\' income by 2027 through technological innovation, sustainable practices, and market linkages. Key focus areas include digital agriculture, climate-resilient crops, and farmer producer organizations.',
        category: 'Agricultural Policy',
        region: 'India',
        effectiveDate: new Date('2024-04-01'),
        implementingAuthority: 'Ministry of Agriculture & Farmers Welfare',
        contactInfo: 'policy@agriculture.gov.in',
        imageUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'EU Green Deal Agricultural Reforms',
        summary: 'Major reforms to make European agriculture climate-neutral by 2050',
        content: 'The European Green Deal introduces significant reforms to agricultural practices, including reduced pesticide use by 50%, increased organic farming, and carbon farming incentives. Member states must implement national strategic plans by 2027.',
        category: 'Environmental Policy',
        region: 'European Union',
        effectiveDate: new Date('2023-12-01'),
        implementingAuthority: 'European Commission DG AGRI',
        contactInfo: 'agri-green-deal@ec.europa.eu',
        imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      },
      {
        title: 'Digital Agriculture Initiative',
        summary: 'Framework for implementing digital technologies in farming',
        content: 'The Digital Agriculture Initiative provides guidelines for implementing IoT sensors, drone technology, AI-powered analytics, and blockchain-based traceability systems in agricultural operations.',
        category: 'Technology Policy',
        region: 'Global',
        effectiveDate: new Date('2024-01-01'),
        implementingAuthority: 'FAO Digital Agriculture Team',
        contactInfo: 'digital@agriculture.org',
        imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        isActive: true
      }
    ]);

    // Seed Forum Posts - commented out to prevent seeding since users are not seeded
    // await ForumPost.insertMany([
    //   {
    //     userID: users[0]._id,
    //     title: 'How to control aphids in tomato plants?',
    //     content: 'I\'m seeing a lot of aphids on my tomato plants. What are the best organic methods to control them without harming beneficial insects?',
    //     tags: ['pest-control', 'organic-farming', 'tomatoes'],
    //     upvotes: 15,
    //     expertReplies: true
    //   },
    //   {
    //     userID: users[1]._id,
    //     title: 'Best practices for soil health management',
    //     content: 'As an agricultural expert, I wanted to share some key practices for maintaining soil health: crop rotation, cover cropping, organic matter addition, and minimal tillage.',
    //     tags: ['soil-health', 'sustainable-farming', 'expert-advice'],
    //     upvotes: 28,
    //     expertReplies: false
    //   },
    //   {
    //     userID: users[0]._id,
    //     title: 'Water conservation techniques for drought-prone areas',
    //     content: 'Living in a drought-prone region, I\'m looking for effective water conservation methods. Any recommendations for drip irrigation or rainwater harvesting?',
    //     tags: ['water-conservation', 'drought', 'irrigation'],
    //     upvotes: 22,
    //     expertReplies: true
    //   }
    // ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();

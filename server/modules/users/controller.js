
import { router } from '../../router.js';

const mockLength = 70;
// Mock data generation
const generateMockData = (count) => {
  const nationalities = ['American', 'British', 'Canadian', 'French', 'German', 'Indian', 'Japanese', 'Australian'];
  const hobbies = ['Reading', 'Gaming', 'Cooking', 'Painting', 'Photography', 'Gardening', 'Music', 'Dancing', 'Hiking', 'Swimming'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
    first_name: `FirstName${index + 1}`,
    last_name: `LastName${index + 1}`,
    age: Math.floor(Math.random() * (70 - 18) + 18),
    nationality: nationalities[Math.floor(Math.random() * nationalities.length)],
    hobbies: Array.from(
      { length: Math.floor(Math.random() * 11) }, // 0 to 10 hobbies
      () => hobbies[Math.floor(Math.random() * hobbies.length)]
    )
  }));
};

const mockData = generateMockData(mockLength);

router.get('/api/users/list', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search?.toLowerCase() || '';
  const nationality = req.query.nationality;
  const hobby = req.query.hobby;

  let filteredData = [...mockData];

  if (nationality) {
    filteredData = filteredData.filter(user => user.nationality === nationality);
  }

  if (hobby) {
    filteredData = filteredData.filter(user => user.hobbies.includes(hobby));
  }

  if (search) {
    filteredData = filteredData.filter(user => 
      user.first_name.toLowerCase().includes(search) ||
      user.last_name.toLowerCase().includes(search)
    );
  }

  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = filteredData.length;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  res.json({
    data: paginatedData,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  });
});

// GET endpoint for aggregated hobby and nationality data
router.get('/api/users/options', (req, res) => {
  const hobbyCounts = {};
  const nationalityCounts = {};

  mockData.forEach(user => {
    user.hobbies.forEach(hobby => {
      hobbyCounts[hobby] = (hobbyCounts[hobby] || 0) + 1;
    });
    nationalityCounts[user.nationality] = (nationalityCounts[user.nationality] || 0) + 1;
  });

  // Get top 20 hobbies
  const topHobbies = Object.entries(hobbyCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20)
    .map(([hobby]) => hobby);

  res.json({
    topHobbies,
    nationalities: Object.keys(nationalityCounts)
  });
});

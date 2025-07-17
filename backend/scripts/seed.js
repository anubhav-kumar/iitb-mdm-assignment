import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Drone from '../src/models/Drone.js';
import Mission from '../src/models/Mission.js';
import connectDB from '../src/db/mongoose.js';
import DroneMission from '../src/models/DroneMission.js';

dotenv.config();

const sampleWaypoints = () => [
  { latitude: 28.6139, longitude: 77.2090, altitude: 100 },
  { latitude: 28.7041, longitude: 77.1025, altitude: 150 },
  { latitude: 28.5355, longitude: 77.3910, altitude: 200 },
];

const seed = async() => {
  await connectDB();

  console.log('🔥 Clearing existing data...');
  await Drone.deleteMany({});
  await Mission.deleteMany({});
  await DroneMission.deleteMany({});

  console.log('🚁 Creating drones...');
  await Drone.insertMany([
    { name: 'Alpha', status: 'idle', battery: 90, latitude: 28.61, longitude: 77.20, altitude: 0 },
    { name: 'Bravo', status: 'idle', battery: 50, latitude: 28.70, longitude: 77.10, altitude: 0 },
    { name: 'Charlie', status: 'idle', battery: 80, latitude: 28.55, longitude: 77.30, altitude: 0 },
    { name: 'Delta', status: 'idle', battery: 75, latitude: 28.40, longitude: 77.40, altitude: 0 },
    { name: 'Echo', status: 'idle', battery: 20, latitude: 28.60, longitude: 77.00, altitude: 0 },
  ]);

  console.log('🛰️ Creating missions...');
  const missions = [];
  for (let i = 1; i <= 10; i++) {
    missions.push({
      name: `Mission ${i}`,
      status: 'pending',
      waypoints: sampleWaypoints(),
      assignedDroneId: null,
    });
  }
  await Mission.insertMany(missions);

  console.log('✅ Seeding complete.');
  mongoose.connection.close();
};

seed();

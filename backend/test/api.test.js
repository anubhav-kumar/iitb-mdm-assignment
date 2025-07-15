// tests/api.test.js
/* global describe, test, beforeAll, afterAll, expect */
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../src/index.js';
import Drone from '../src/models/Drone.js';
import Mission from '../src/models/Mission.js';
import DroneMission from '../src/models/DroneMission.js';

dotenv.config();

let testDrone;
let testMission;
let testDroneMission;

beforeAll(async() => {
  await mongoose.connect(process.env.MONGO_URI);

  await Drone.deleteMany();
  await Mission.deleteMany();
  await DroneMission.deleteMany();

  testDrone = await Drone.create({
    name: 'TestDrone',
    status: 'idle',
    battery: 90,
    latitude: 0,
    longitude: 0,
    altitude: 0,
  });

  testMission = await Mission.create({
    name: 'TestMission',
    status: 'pending',
    waypoints: [
      { latitude: 10, longitude: 10, altitude: 100 },
      { latitude: 20, longitude: 20, altitude: 200 },
    ],
  });
});

afterAll(async() => {
  await mongoose.connection.close();
});

describe('Drone + Mission API Tests', () => {
  test('POST /start-mission should link drone and mission', async() => {
    const res = await request(app)
      .post('/start-mission')
      .send({ droneId: testDrone._id, missionId: testMission._id });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('droneMissionId');
    testDroneMission = await DroneMission.findById(res.body.droneMissionId);
    expect(testDroneMission).not.toBeNull();
  });

  test('GET /status should return updated drone status', async() => {
    const res = await request(app)
      .get(`/status?droneId=${testDrone._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body.drone).toHaveProperty('_id');
  });

  test('GET /drones should list all drones', async() => {
    const res = await request(app).get('/drones');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.drones)).toBe(true);
    expect(res.body.drones.length).toBeGreaterThan(0);
  });

  test('GET /missions should list all missions', async() => {
    const res = await request(app).get('/missions');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.missions)).toBe(true);
    expect(res.body.missions.length).toBeGreaterThan(0);
  });

  test('POST /complete-mission should mark mission as successful', async() => {
    const res = await request(app)
      .post('/complete-mission')
      .send({ droneMissionId: testDroneMission._id });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('droneMissionId');
  });
});

import express from 'express';
import Drone from '../models/Drone';
import Mission from '../models/Mission';
import DroneMission from '../models/DroneMission';

const router = express.Router();

// POST /start-mission
router.post('/start-mission', async(req, res) => {
  const { droneId, missionId } = req.body;

  if (!droneId || !missionId) {
    return res.status(400).json({ error: 'droneId and missionId are required' });
  }

  try {
    const drone = await Drone.findById(droneId);
    if (!drone) {
      return res.status(404).json({ error: `Drone could not be found with ID: ${droneId}` });
    }
    const mission = await Mission.findById(missionId);
    if (!mission) {
      return res.status(404).json({ error: `Mission could not be found with ID: ${droneId}` });
    }
    const droneMission = await DroneMission.create({
      droneId: droneId,
      missionId: missionId,
    });

    await Drone.findByIdAndUpdate(
      droneId,
      { currentMissionId: droneMission._id, status: 'flying' },
    );
    return res.status(201).json({ droneMissionId: droneMission._id });
  } catch (err) {
    console.error('Error starting mission:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /complete-mission
router.post('/complete-mission', async(req, res) => {
  const { droneMissionId } = req.body;

  if (!droneMissionId) {
    return res.status(400).json({ error: 'droneMissionId is required' });
  }

  try {
    const droneMission = await DroneMission.findById(droneMissionId);
    if (!droneMission) {
      return res.status(404).json({ error: `Drone Mission instance could not be found with ID: ${droneMissionId}` });
    }
    const currentTimestamp = Date.now();
    await DroneMission.findByIdAndUpdate(
      droneMissionId,
      { status: 'successful', completedAt: currentTimestamp },
    );
    await Drone.findByIdAndUpdate(
      droneMission.droneId,
      { status: 'idle', currentMissionId: null },
    );
    return res.status(200).json({ droneMissionId: droneMission._id });
  } catch (err) {
    console.error('Error starting mission:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /status?droneId=xyz
router.get('/status', async(req, res) => {
  const { droneId } = req.query;

  if (!droneId) {
    return res.status(400).json({ error: 'droneId is required' });
  }

  try {
    const drone = await Drone.findById(droneId);

    if (!drone) {
      return res.status(404).json({ error: 'Drone not found' });
    }

    return res.status(200).json({ status: drone.status, drone });
  } catch (err) {
    console.error('Error fetching drone status:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /drones — list all drones
router.get('/drones', async(_req, res) => {
  try {
    const drones = await Drone.find();
    return res.status(200).json({ drones });
  } catch (err) {
    console.error('Error fetching drones:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /missions — list all missions
router.get('/missions', async(_req, res) => {
  try {
    const missions = await Mission.find();
    return res.status(200).json({ missions });
  } catch (err) {
    console.error('Error fetching missions:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;

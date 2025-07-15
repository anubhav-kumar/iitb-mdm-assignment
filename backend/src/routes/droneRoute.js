import express from 'express';
import Drone from '../models/Drone';
import Mission from '../models/Mission';

const router = express.Router();

// POST /start-mission
router.post('/start-mission', async (req, res) => {
  const { droneId, missionId } = req.body;

  if (!droneId || !missionId) {
    return res.status(400).json({ error: 'droneId and missionId are required' });
  }

  try {
    const drone = await Drone.findById(droneId);
    const mission = await Mission.findById(missionId);

    if (!drone || !mission) {
      return res.status(404).json({ error: 'Drone or Mission not found' });
    }

    if (drone.status !== 'idle') {
      return res.status(400).json({ error: 'Drone is not idle' });
    }

    if (mission.status !== 'pending') {
      return res.status(400).json({ error: 'Mission is not pending' });
    }

    // Update drone
    drone.status = 'flying';
    drone.currentMissionId = missionId;
    await drone.save();

    // Update mission
    mission.status = 'in_progress';
    mission.assignedDroneId = droneId;
    await mission.save();

    return res.status(200).json({ message: 'Mission started', drone, mission });
  } catch (err) {
    console.error('Error starting mission:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /status?droneId=xyz
router.get('/status', async (req, res) => {
  const { droneId } = req.query;

  if (!droneId) {
    return res.status(400).json({ error: 'droneId is required' });
  }

  try {
    const drone = await Drone.findById(droneId).populate('currentMissionId');

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
router.get('/drones', async (_req, res) => {
    try {
        const drones = await Drone.find();
        return res.status(200).json({ drones });
    } catch (err) {
        console.error('Error fetching drones:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
  
// GET /missions — list all missions
router.get('/missions', async (_req, res) => {
    try {
        const missions = await Mission.find();
        return res.status(200).json({ missions });
    } catch (err) {
        console.error('Error fetching missions:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

  
export default router;

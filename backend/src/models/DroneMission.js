import mongoose from 'mongoose';

const droneMissionSchema = new mongoose.Schema({
  droneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drone', default: null },
  missionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Misson', default: null },
  completedAt: { type: Date, required: false },
  status: { type: String, enum: ['in-progress', 'successful', 'reverted', 'failed'], default: 'in-progress' },
}, { timestamps: true });

const DroneMission = mongoose.model('DroneMission', droneMissionSchema);
export default DroneMission;

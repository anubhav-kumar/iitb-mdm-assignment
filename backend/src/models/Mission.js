import mongoose from 'mongoose';

const waypointSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  altitude: Number,
});

const missionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in_progress', 'completed', 'failed'], default: 'pending' },
  waypoints: [waypointSchema],
  assignedDroneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drone', default: null },
}, { timestamps: true });

const Mission = mongoose.model('Mission', missionSchema);
export default Mission;


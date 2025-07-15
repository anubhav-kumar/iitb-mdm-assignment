import mongoose from 'mongoose';

const droneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['idle', 'flying', 'charging', 'error'], default: 'idle' },
  battery: { type: Number, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  altitude: { type: Number, required: true },
  currentMissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mission', default: null },
}, { timestamps: true });

const Drone = mongoose.model('Drone', droneSchema);
export default Drone;


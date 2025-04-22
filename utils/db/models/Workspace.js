// models/Workspace.js
import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
  messages: mongoose.Schema.Types.Mixed,
  fileData: mongoose.Schema.Types.Mixed,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.models.Workspace || mongoose.model('Workspace', workspaceSchema);

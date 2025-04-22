// api/workspace.js
import Workspace from '../models/Workspace.js';

export const createWorkspace = async ({ messages, userId }) => {
  const workspace = await Workspace.create({
    messages,
    user: userId,
  });
  return workspace._id;
};
export const updateWorkspace = async ({ id, newMessages }) => {
    const workspace = await Workspace.findByIdAndUpdate(id, {
      messages: newMessages,
    }, { new: true });
    return workspace;
  };
  export const getWorkspace = async (workspaceId) => {
    const workspace = await Workspace.findById(workspaceId).populate('user');
    return workspace;
  };
  
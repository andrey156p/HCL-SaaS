const prisma = require('../prismaClient');

// Get all tasks for the current Tenant
exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { tenantId: req.user.tenantId },
      include: {
        department: true,
        area: true,
        system: true,
        team: true,
        worker: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a single task (e.g. from QR Report)
exports.createTask = async (req, res) => {
  try {
    const { departmentId, room, systemId, actionType, notes, photoUrl, teamId, inspectorName } = req.body;
    
    const task = await prisma.task.create({
      data: {
        tenantId: req.user.tenantId,
        departmentId,
        room,
        systemId,
        actionType,
        notes,
        photoUrl,
        teamId,
        inspectorName
      }
    });

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Bulk create tasks (from Inspector App)
exports.createBulkTasks = async (req, res) => {
  try {
    const { tasks } = req.body; // Array of task objects
    if (!tasks || !Array.isArray(tasks)) {
      return res.status(400).json({ error: 'Tasks array is required' });
    }

    const tasksToCreate = tasks.map(t => ({
      tenantId: req.user.tenantId,
      departmentId: t.departmentId,
      room: t.room,
      areaId: t.areaId,
      systemId: t.systemId,
      actionType: t.actionType,
      notes: t.notes,
      photoUrl: t.photoUrl,
      teamId: t.teamId,
      inspectorName: t.inspectorName,
    }));

    const result = await prisma.task.createMany({
      data: tasksToCreate
    });

    res.status(201).json({ message: 'Tasks created successfully', count: result.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update task status / assign worker / transfer team
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, workerId, teamId, afterPhotoUrl, notes } = req.body;

    const existingTask = await prisma.task.findUnique({ where: { id } });
    if (!existingTask || existingTask.tenantId !== req.user.tenantId) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        status: status !== undefined ? status : existingTask.status,
        workerId: workerId !== undefined ? workerId : existingTask.workerId,
        teamId: teamId !== undefined ? teamId : existingTask.teamId,
        afterPhotoUrl: afterPhotoUrl !== undefined ? afterPhotoUrl : existingTask.afterPhotoUrl,
        notes: notes !== undefined ? notes : existingTask.notes
      }
    });

    res.json({ message: 'Task updated', task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

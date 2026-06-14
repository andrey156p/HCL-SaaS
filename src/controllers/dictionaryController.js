const prisma = require('../prismaClient');

// Teams (Команды)
exports.getTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany({ where: { tenantId: req.user.tenantId } });
    res.json(teams);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createTeam = async (req, res) => {
  try {
    const team = await prisma.team.create({
      data: { ...req.body, tenantId: req.user.tenantId }
    });
    res.status(201).json(team);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteTeam = async (req, res) => {
  try {
    await prisma.team.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
};


// Departments (Отделения)
exports.getDepartments = async (req, res) => {
  try {
    const deps = await prisma.department.findMany({ where: { tenantId: req.user.tenantId } });
    res.json(deps);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createDepartment = async (req, res) => {
  try {
    const dep = await prisma.department.create({
      data: { ...req.body, tenantId: req.user.tenantId }
    });
    res.status(201).json(dep);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteDepartment = async (req, res) => {
  try {
    await prisma.department.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
};


// Areas (Зоны)
exports.getAreas = async (req, res) => {
  try {
    const areas = await prisma.area.findMany({ where: { tenantId: req.user.tenantId } });
    res.json(areas);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createArea = async (req, res) => {
  try {
    const area = await prisma.area.create({
      data: { ...req.body, tenantId: req.user.tenantId }
    });
    res.status(201).json(area);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteArea = async (req, res) => {
  try {
    await prisma.area.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
};


// Systems (Системы / Дефекты)
exports.getSystems = async (req, res) => {
  try {
    const systems = await prisma.system.findMany({
      where: { tenantId: req.user.tenantId },
      include: { autoAssignTeam: true }
    });
    res.json(systems);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createSystem = async (req, res) => {
  try {
    const system = await prisma.system.create({
      data: { ...req.body, tenantId: req.user.tenantId }
    });
    res.status(201).json(system);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteSystem = async (req, res) => {
  try {
    await prisma.system.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

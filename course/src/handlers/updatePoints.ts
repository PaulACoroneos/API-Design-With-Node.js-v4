import prisma from '../db';

export const getOneUpdatePoint = async (req, res) => {
  const updatePoints = await prisma.updatePoint.findFirst({
    where: {
      id: req.body.updateId
    }
  })

  res.json({ data: updatePoints })
};
export const getUpdatePoints = async (req, res) => {
  const updatePoints = await prisma.update.findUnique({
    where: {
      id: req.body.updateId
    },
    include: {
      updatePoints: true
    }
  })
  res.json({ data: updatePoints });
};

export const createUpdatePoint = async (req, res) => {
  const updatedUpdatePoint = await prisma.updatePoint.create({
    data: {
      update: req.body.update,
      updatedAt: new Date(),
      name: req.body.name,
      description: req.body.description,
    }
  })

  res.json({ data: updatedUpdatePoint });
};
export const deleteUpdatePoint = async (req, res) => {
  const deletedUpdatePoint = await prisma.updatePoint.delete({
    where: {
      id: req.body.updatePointId
    }
  })

  res.json({ data: deletedUpdatePoint });
};
export const updateUpdatePoint = async (req, res) => {
  const updatedUpdatePoint = await prisma.updatePoint.update({
    where: {
      id: req.body.id
    },
    data: {
      update: req.body.update,
      updatedAt: new Date(),
      name: req.body.name,
      description: req.body.description,
    }
  })
};
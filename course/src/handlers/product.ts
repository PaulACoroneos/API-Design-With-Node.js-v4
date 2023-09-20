import prisma from '../db';

/**
 * 
 * @param req 
 * @param res 
 * @returns Product[]
 * Get all products for a given user
 */
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    include: {
      products: true
    }
  });

  res.json({ data: user.products });
}

/**
 * 
 * @param req 
 * @param res 
 * @returns
 * Return a single product for a given user
 */
export const getOneProduct = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id
    }
  })

  return res.json({ data: product });
}

/**
 * 
 * @param req 
 * @param res 
 * Creates a product for a given user
 */
export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id
    }
  })

  res.json({ data: product });
}

/**
 * 
 * @param req 
 * @param res 
 * Update and return a product 
 */
export const updateProduct = async (req, res) => {
  const update = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id
      }
    },
    data: {
      name: req.body.name,
    }
  })

  return res.json({ data: update });
}

/**
 * 
 * @param req 
 * @param res 
 * 
 * Delete a single product for a given id and product
 */
export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id
      }
    }
  })

  res.json({ data: deleted });
}


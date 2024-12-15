import Brand from '../models/Brand.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort('name');
    res.json(brands);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch brands',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.json(brand);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch brand',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const createBrand = async (req, res) => {
  try {
    const { name, description, featured } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ message: 'Brand image is required' });
    }

    const imageUrl = await uploadToCloudinary(imageFile.path);

    const brand = await Brand.create({
      name,
      description,
      image: imageUrl,
      featured: featured === 'true'
    });

    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to create brand',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { name, description, featured } = req.body;
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    let imageUrl = brand.image;
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.path);
    }

    brand.name = name || brand.name;
    brand.description = description || brand.description;
    brand.image = imageUrl;
    brand.featured = featured === 'true';

    await brand.save();
    res.json(brand);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to update brand',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    await brand.remove();
    res.json({ message: 'Brand removed' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to delete brand',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
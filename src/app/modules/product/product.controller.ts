/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
// import { productSchemaValidation } from './product.validation';
import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.createProductIntoDB(req.body);
    res.status(StatusCodes.OK).json({
      message: 'Bike created successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    const errorResponse = {
      message: 'Something went wrong',
      success: false,
      error: err.errors || 'Error',
      stack: err.stack,
    };

    if (err.name === 'ValidationError') {
      errorResponse.message = 'Validation failed';
    }

    if (err.name === 'NotFoundError') {
      errorResponse.message = 'Resource not found';
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    const result = await ProductServices.getAllProductFromDB();
    if (req.query.searchTerm) {
      const filteredProducts = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm as string),
      );
      res.status(StatusCodes.OK).json({
        message: 'Bikes retrieved successfully',
        status: true,
        data: filteredProducts,
      });
    } else {
      res.status(StatusCodes.OK).json({
        message: 'Bikes retrieved successfully',
        status: true,
        data: result,
      });
    }
  } catch (err: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await ProductServices.getSingleProductFromDB(id);
    res.status(StatusCodes.OK).json({
      message: '"Bike retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const productData = req.body;
    const result = await ProductServices.updateSignleProductFromDB(
      id,
      productData,
    );
    if (result.modifiedCount) {
      const result2 = await ProductServices.getSingleProductFromDB(id);
      res.status(StatusCodes.OK).json({
        message: 'Bike updated successfully',
        status: true,
        data: result2,
      });
    }
  } catch (err: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    await ProductServices.deleteSingleProductFromDB(id);
    res.status(StatusCodes.OK).json({
      message: 'Bike deleted successfully',
      status: true,
      data: null,
    });
  } catch (err: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};

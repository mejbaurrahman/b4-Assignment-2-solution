/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';

import { Request, Response } from 'express';

import { OrderServices } from './order.service';

import { ProductServices } from '../product/product.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { product, quantity } = req.body;

    const bikeProduct = await ProductServices.getSingleProductFromDB(product);
    if ((bikeProduct?.quantity as number) - quantity < 0) {
      res.status(StatusCodes.OK).json({
        success: false,
        message: 'Insufficient stock quantity available ',
      });
    } else {
      if ((bikeProduct?.quantity as number) - quantity > 0) {
        await ProductServices.updateSignleProductFromDB(product, {
          quantity: (bikeProduct?.quantity as number) - quantity,
          inStock: true,
        });
      }
      if ((bikeProduct?.quantity as number) - quantity == 0) {
        await ProductServices.updateSignleProductFromDB(product, {
          quantity: 0,
          inStock: false,
        });
      }
      const result = await OrderServices.createOrderIntoDB(req.body);
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Order created successfully',
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

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result2 = await OrderServices.getAllOrderFromDB();

    res.status(StatusCodes.OK).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: result2,
    });
  } catch (err: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};

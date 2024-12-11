"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const order_service_1 = require("./order.service");
const product_service_1 = require("../product/product.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product, quantity } = req.body;
        const bikeProduct = yield product_service_1.ProductServices.getSingleProductFromDB(product);
        if ((bikeProduct === null || bikeProduct === void 0 ? void 0 : bikeProduct.quantity) - quantity < 0) {
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: false,
                message: 'Insufficient stock quantity available ',
            });
        }
        else {
            if ((bikeProduct === null || bikeProduct === void 0 ? void 0 : bikeProduct.quantity) - quantity > 0) {
                yield product_service_1.ProductServices.updateSignleProductFromDB(product, {
                    quantity: (bikeProduct === null || bikeProduct === void 0 ? void 0 : bikeProduct.quantity) - quantity,
                    inStock: true,
                });
            }
            if ((bikeProduct === null || bikeProduct === void 0 ? void 0 : bikeProduct.quantity) - quantity == 0) {
                yield product_service_1.ProductServices.updateSignleProductFromDB(product, {
                    quantity: 0,
                    inStock: false,
                });
            }
            const result = yield order_service_1.OrderServices.createOrderIntoDB(req.body);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: 'Order created successfully',
                data: result,
            });
        }
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result2 = yield order_service_1.OrderServices.getAllOrderFromDB();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: result2,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};

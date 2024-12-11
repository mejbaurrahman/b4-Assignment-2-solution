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
exports.ProductControllers = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductServices.createProductIntoDB(req.body);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Bike created successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
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
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductServices.getAllProductFromDB();
        if (req.query.searchTerm) {
            const filteredProducts = result.filter((product) => product.name.toLowerCase().includes(searchTerm));
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: 'Bikes retrieved successfully',
                status: true,
                data: filteredProducts,
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: 'Bikes retrieved successfully',
                status: true,
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
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(id);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: '"Bike retrieved successfully',
            status: true,
            data: result,
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
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const productData = req.body;
        const result = yield product_service_1.ProductServices.updateSignleProductFromDB(id, productData);
        if (result.modifiedCount) {
            const result2 = yield product_service_1.ProductServices.getSingleProductFromDB(id);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: 'Bike updated successfully',
                status: true,
                data: result2,
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
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        yield product_service_1.ProductServices.deleteSingleProductFromDB(id);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'Bike deleted successfully',
            status: true,
            data: null,
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
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};

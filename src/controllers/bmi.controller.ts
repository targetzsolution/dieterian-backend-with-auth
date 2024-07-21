import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { bmiService } from "../services/index.service";
import httpStatus from "http-status";
import pick from "../utils/pick";
import ApiError from "../utils/ApiError";

const createBMI = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const bmi = await bmiService.createBMI({ ...req.body, user: req.user });
    res.status(httpStatus.CREATED).send('BMI created successfully.');
});

const getBMIs = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const filter = pick(req.query, ['name']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await bmiService.queryBMI(filter, options);
    res.send(result);
});

const getBMI = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const bmi = await bmiService.getBMIById(req.params.bmiId as any);
    if (!bmi) {
        throw new ApiError(httpStatus.NOT_FOUND, 'BMI not found.');
    }
    res.send(bmi);
});

const updateBMI = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const bmi = await bmiService.updateBMIById(req.params.bmiId as any, req.body);
    res.send(bmi);
});

const deleteBMI = catchAsync(async (req: Request, res: Response): Promise<void> => {
    await bmiService.deleteBMIById(req.params.bmiId as any);
    res.status(httpStatus.NO_CONTENT).send();
});

export { createBMI, getBMIs, getBMI, updateBMI, deleteBMI };
import { Request, Response } from 'express';
import catchAsync from "../utils/catchAsync";
import { contactService } from '../services/index.service';
import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';


const createContact = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const contact = await contactService.createContact({ ...req.body });
    res.status(httpStatus.CREATED).send(contact);
});

const getContacts = catchAsync(async (req: Request, res: Response): Promise<void> =>{
    const filter = pick(req.query, ['name']);
    const options  = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await contactService.queryContact(filter, options);
    res.send(result);
});

const getContact = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const contact = await contactService.getContactById(req.params.conatactId as any);
    if (!contact) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
    }
    res.send(contact);
});

const updateContact = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const contact = await contactService.updateContactById(req.params.contactId as any, req.body);
    res.send(contact);
});

const deleteContact = catchAsync(async (req: Request, res: Response): Promise<void> => {
    await contactService.deleteContactById(req.params.conatactId as any);
    res.status(httpStatus.NO_CONTENT).send();
});

export { createContact, getContacts, getContact, updateContact, deleteContact };
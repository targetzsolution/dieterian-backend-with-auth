import { ObjectId } from "mongoose";
import { ContactDocument } from "../interfaces/contact.interface";
import { Contact, User } from "../models/index.model";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";


// Post a message
export const createContact = async (contactBody: { [k: string]: any }): Promise<ContactDocument> => {
    const ourMember = await User.findOne({ email: contactBody.email });
    if (ourMember) {
        contactBody.isMember = true;
    }
    return Contact.create(contactBody);
};

/**
 * Query for contact
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

export const queryContact = async (filter: object, option: object): Promise<ContactDocument[]> => {
    const contact = await Contact.paginate(filter, option);
    return contact;
};

// Get contact message by id
export const getContactById = async (id: ObjectId): Promise<ContactDocument | null> => {
    return Contact.findById(id);
};

// Update contact message by id 
export const updateContactById = async (conatctId: ObjectId, updateBody: { [k: string]: any }): Promise<ContactDocument | null> => {
    const contact = await getContactById(conatctId);
    if (!contact) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
    }
    
    const updateContact = await Contact.findByIdAndUpdate(
        { _id: conatctId },
        {
            $set: {
                status: 'closed'
            }
        },
        { new: true }
    );
    return updateContact;
};

// Delete contact by id
export const deleteContactById = async (contactId: ObjectId): Promise<ContactDocument> => {
    const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
    }

    return contact;
}
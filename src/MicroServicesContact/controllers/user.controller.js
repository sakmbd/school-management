import Contact from '../models/Contact.js';
import httpStatus from 'http-status-codes';
import ApiError from '../../utils/ApiError.js';

// GET /contacts - List all contacts
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(httpStatus.OK).json(contacts);
  } catch (error) {
    next(
      new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to fetch contacts',
      ),
    );
  }
};

// POST /contacts - Create a new contact
const saveContacts = async (req, res, next) => {
  try {
    const { name, phone, address, type } = req.body;

    // Optional validation
    if (!name || !phone || !type) {
      return next(
        new ApiError(
          httpStatus.BAD_REQUEST,
          'Name, phone, and type are required.',
        ),
      );
    }

    const newContact = new Contact({ name, phone, address, type });
    await newContact.save();

    res.status(httpStatus.CREATED).json(newContact);
  } catch (error) {
    next(
      new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create contact',
      ),
    );
  }
};

// PUT /contacts/:id - Update contact by ID
const updateContacts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phone, address, type } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, phone, address, type },
      { new: true, runValidators: true },
    );

    if (!updatedContact) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Contact not found'));
    }

    res.status(httpStatus.OK).json(updatedContact);
  } catch (error) {
    next(
      new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update contact',
      ),
    );
  }
};

// DELETE /contacts/:id - Delete contact by ID
const deleteContacts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Contact not found'));
    }

    res.status(httpStatus.OK).send({
      message: 'Deleted successfully!',
    }); // 204 No Content
  } catch (error) {
    next(
      new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to delete contact',
      ),
    );
  }
};

export default {
  getContacts,
  saveContacts,
  updateContacts,
  deleteContacts,
};

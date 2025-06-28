import Contact from '../models/Contact.js';
import httpStatus from 'http-status-codes';
import ApiError from '../../utils/ApiError.js';

// GET /contacts - List all contacts
const getContacts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      type, // optional: home or work
    } = req.query;

    const filters = [];

    // Free text search across name, phone, address
    if (search) {
      filters.push({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { address: { $regex: search, $options: 'i' } },
        ],
      });
    }

    // Filter by contact type if provided
    if (type) {
      filters.push({ type });
    }

    const query = filters.length > 0 ? { $and: filters } : {};

    const contacts = await Contact.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Contact.countDocuments(query);

    res.status(httpStatus.OK).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: contacts,
    });
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

    // Check if phone number already exists
    const existing = await Contact.findOne({ phone });
    if (existing) {
      return next(
        new ApiError(
          httpStatus.CONFLICT,
          'Contact with this phone number already exists.',
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

    // Check if another contact already uses this phone
    const duplicate = await Contact.findOne({ phone, _id: { $ne: id } });
    if (duplicate) {
      return next(
        new ApiError(
          httpStatus.CONFLICT,
          'Another contact with this phone number already exists.',
        ),
      );
    }

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

import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    rollNumber: { type: String, required: true },
    class: { type: String, required: true },
    section: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    address: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    admissionDate: { type: Date, default: Date.now },
    emergencyContact: { type: String },
  },
  {
    timestamps: true,
  },
);

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

export default StudentProfile;

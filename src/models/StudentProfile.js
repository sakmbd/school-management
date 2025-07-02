import mongoose from 'mongoose';

const additionalInfoSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true, // 'transferCertificate', 'promoted', 'previousSchool', 'lastExamPassed', 'other'
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    class: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    admissionDate: {
      type: Date,
      default: Date.now,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
    academicStatus: {
      type: String,
      enum: ['active', 'suspended', 'reinstated', 'withdrawn'],
      default: 'active',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    currentAcademicYear: {
      type: String,
      required: true,
    },
    additionalInfo: [additionalInfoSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Include virtuals when converting to JSON
    toObject: { virtuals: true }, // Include virtuals when converting to objects
  },
);

// Add virtual population
studentProfileSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

// Pre-save hook to set current academic year if not provided
studentProfileSchema.pre('save', function (next) {
  if (!this.currentAcademicYear) {
    const now = new Date();
    const year = now.getFullYear();
    this.currentAcademicYear =
      now.getMonth() >= 4 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
  }
  next();
});

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

export default StudentProfile;

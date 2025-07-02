import User from '../models/User.js';
import StudentProfile from '../models/StudentProfile.js';

// Helper function
export function getCurrentAcademicYear() {
  const now = new Date();
  const year = now.getFullYear();
  return now.getMonth() >= 4 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
}

// User Operations
export const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

// Student Profile Operations
export const createStudentProfile = async (userId, studentData) => {
  const profileData = {
    ...studentData,
    userId,
    currentAcademicYear:
      studentData.currentAcademicYear || getCurrentAcademicYear(),
    academicStatus: 'active',
  };
  const profile = new StudentProfile(profileData);
  await profile.save();
  return profile;
};

export const registerStudent = async (userData, studentProfileData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) throw new Error('Email already registered');

  const existingRollNo = await StudentProfile.findOne({
    rollNumber: studentProfileData.rollNumber,
  });
  if (existingRollNo) throw new Error('Roll number already exists');

  const user = await createUser(userData);
  const studentProfile = await createStudentProfile(
    user._id,
    studentProfileData,
  );
  return { user, studentProfile };
};

export const getUserWithProfile = async (userId) => {
  const user = await User.findById(userId).lean();
  if (!user) return null;

  const studentProfile = await StudentProfile.findOne({ userId }).lean();
  return { ...user, studentProfile };
};

export const getAllStudents = async (filters = {}) => {
  const query = {};
  if (filters.class) query.class = filters.class;
  if (filters.section) query.section = filters.section;
  if (filters.academicStatus) query.academicStatus = filters.academicStatus;

  return await StudentProfile.find(query)
    .populate('user', 'firstName lastName email role address')
    .lean();
};

export const promoteStudent = async (studentId, promotionData) => {
  const student = await StudentProfile.findById(studentId);
  if (!student) throw new Error('Student not found');

  // Create promotion record with type
  const promotionRecord = {
    type: 'promotion',
    data: {
      fromClass: student.class,
      fromSection: student.section,
      toSection: promotionData.data.toSection || student.section,
      toClass: promotionData.data.toClass,
      year: promotionData.data.year || getCurrentAcademicYear(),
      remarks: promotionData.data.remarks || '',
      approvedBy: promotionData.data.approvedBy || null,
      effectiveDate: promotionData.data.effectiveDate || new Date(),
    },
    createdAt: new Date(),
  };

  // Update current class and section
  student.class = promotionData.data.toClass;
  if (promotionData.data.toSection) {
    student.section = promotionData.data.toSection;
  }

  // Add to additionalInfo array
  student.additionalInfo.push(promotionRecord);
  await student.save();

  return student;
};

export const updateStudentStatus = async (studentId, status) => {
  const validStatuses = ['active', 'suspended', 'reinstated', 'withdrawn'];
  if (!validStatuses.includes(status)) throw new Error('Invalid status value');

  const student = await StudentProfile.findByIdAndUpdate(
    studentId,
    { academicStatus: status },
    { new: true },
  );
  if (!student) throw new Error('Student not found');
  return student;
};

export const updateStudentProfile = async (studentId, updateData) => {
  const allowedUpdates = {
    section: true,
    fatherName: true,
    motherName: true,
    emergencyContact: true,
    previousSchool: true,
    lastExamPassed: true,
  };

  const updates = Object.keys(updateData).reduce((acc, key) => {
    if (allowedUpdates[key]) acc[key] = updateData[key];
    return acc;
  }, {});

  if (Object.keys(updates).length === 0) {
    throw new Error('No valid fields to update');
  }

  const student = await StudentProfile.findByIdAndUpdate(studentId, updates, {
    new: true,
  });
  if (!student) throw new Error('Student not found');
  return student;
};

export const transferStudent = async (studentId, transferData) => {
  const student = await StudentProfile.findById(studentId);
  if (!student) throw new Error('Student not found');

  const transferRecord = {
    fromClass: student.class,
    fromSection: student.section,
    toClass: transferData.toClass,
    toSection: transferData.toSection,
    transferredOn: new Date(),
    reason: transferData.reason || '',
  };

  student.class = transferData.toClass;
  student.section = transferData.toSection;
  student.transferHistory = student.transferHistory || [];
  student.transferHistory.push(transferRecord);
  await student.save();
  return student;
};

export const archiveStudent = async (studentId) => {
  const student = await StudentProfile.findByIdAndUpdate(
    studentId,
    {
      academicStatus: 'archived',
      isActive: false,
    },
    { new: true },
  );
  if (!student) throw new Error('Student not found');
  return student;
};

export const getStudentAcademicHistory = async (studentId) => {
  const student = await StudentProfile.findById(studentId)
    .select(
      'promotionHistory transferHistory class section academicStatus currentAcademicYear',
    )
    .lean();
  if (!student) throw new Error('Student not found');
  return student;
};

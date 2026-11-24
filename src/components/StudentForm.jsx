import React, { useState, useEffect } from 'react';

/**
 * StudentForm Component
 * Handles adding new students and editing existing student records.
 * Performs client-side validation for Full Name, Email, Phone Number, and Department.
 */
function StudentForm({ onAddStudent, onUpdateStudent, editingStudent, onCancelEdit }) {
  // Local state for the input fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
  });

  // State to hold field validation errors
  const [errors, setErrors] = useState({});

  // When editingStudent changes (user clicks Edit in table), populate the form
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        fullName: editingStudent.fullName,
        email: editingStudent.email,
        phone: editingStudent.phone,
        department: editingStudent.department,
      });
      setErrors({});
    } else {
      // Reset form if editing is cancelled or finished
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        department: '',
      });
      setErrors({});
    }
  }, [editingStudent]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field as the user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Form validation logic
  const validateForm = () => {
    const newErrors = {};

    // 1. Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters';
    }

    // 2. Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., student@example.com)';
    }

    // 3. Phone Number validation (digits only, 7 to 15 digits)
    const phoneDigits = formData.phone.replace(/[\s-]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{7,15}$/.test(phoneDigits)) {
      newErrors.phone = 'Please enter a valid phone number (7-15 digits)';
    }

    // 4. Department validation
    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }

    setErrors(newErrors);
    // Returns true if there are no error keys
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before proceeding
    if (!validateForm()) {
      return;
    }

    if (editingStudent) {
      // Update existing student
      onUpdateStudent({
        ...editingStudent,
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        department: formData.department,
      });
    } else {
      // Register new student
      onAddStudent({
        id: Date.now().toString(), // simple unique identifier
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        department: formData.department,
        registeredAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      });

      // Clear the form after successful registration
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        department: '',
      });
    }
  };

  return (
    <div id="register-section" className="card form-card">
      <div className="card-header">
        <div className="card-header-icon">
          {editingStudent ? '✏️' : '📝'}
        </div>
        <div>
          <h2 className="card-title">
            {editingStudent ? 'Edit Student Details' : 'Student Registration'}
          </h2>
          <p className="card-subtitle">
            {editingStudent
              ? 'Update the student profile information below'
              : 'Enter student information to enroll them into the system'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="student-form">
        <div className="form-grid">
          {/* Full Name Field */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={`form-input ${errors.fullName ? 'input-error' : ''}`}
              placeholder="e.g. John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
          </div>

          {/* Email Address Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="e.g. john.doe@university.edu"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          {/* Phone Number Field */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`form-input ${errors.phone ? 'input-error' : ''}`}
              placeholder="e.g. +1 555-019-2834"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          {/* Department Field */}
          <div className="form-group">
            <label htmlFor="department" className="form-label">
              Department <span className="required">*</span>
            </label>
            <select
              id="department"
              name="department"
              className={`form-input select-input ${errors.department ? 'input-error' : ''}`}
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department...</option>
              <option value="Computer Science">💻 Computer Science</option>
              <option value="Information Technology">🌐 Information Technology</option>
              <option value="Electrical Engineering">⚡ Electrical Engineering</option>
              <option value="Mechanical Engineering">⚙️ Mechanical Engineering</option>
              <option value="Business Administration">📊 Business Administration</option>
              <option value="Data Science & AI">🤖 Data Science & AI</option>
              <option value="Graphic Design">🎨 Graphic Design</option>
            </select>
            {errors.department && <p className="error-message">{errors.department}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingStudent ? '💾 Update Student' : '➕ Register Student'}
          </button>

          {editingStudent && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              ✖ Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;

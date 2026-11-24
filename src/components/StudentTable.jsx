import React, { useState } from 'react';

/**
 * StudentTable Component
 * Renders the responsive table of enrolled students with Search, Edit, and Delete features.
 */
function StudentTable({ students, onEditStudent, onDeleteStudent }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');

  // Filter students based on search query and department dropdown
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm);

    const matchesDept =
      filterDepartment === 'All' || student.department === filterDepartment;

    return matchesSearch && matchesDept;
  });

  return (
    <div id="students-section" className="card table-card">
      <div className="card-header table-header-flex">
        <div className="header-text">
          <h2 className="card-title">Registered Students Directory</h2>
          <p className="card-subtitle">
            Showing {filteredStudents.length} of {students.length} students enrolled
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="table-controls">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Data Science & AI">Data Science & AI</option>
            <option value="Graphic Design">Graphic Design</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="table-wrapper">
        {filteredStudents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <h3>No students found</h3>
            <p>
              {students.length === 0
                ? 'No students have been registered yet. Fill out the form above to add one!'
                : 'No student matches your current search or filter criteria.'}
            </p>
          </div>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Contact Details</th>
                <th>Department</th>
                <th>Enrolled Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                // Generate initials for the avatar
                const initials = student.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase();

                return (
                  <tr key={student.id}>
                    {/* Student Avatar + Name */}
                    <td>
                      <div className="student-profile">
                        <div className="avatar">{initials}</div>
                        <div>
                          <div className="student-name">{student.fullName}</div>
                          <div className="student-id">ID: #{student.id.slice(-5)}</div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Details */}
                    <td>
                      <div className="contact-details">
                        <div className="email-link">
                          <span>✉️</span> {student.email}
                        </div>
                        <div className="phone-text">
                          <span>📞</span> {student.phone}
                        </div>
                      </div>
                    </td>

                    {/* Department Badge */}
                    <td>
                      <span className="department-tag">
                        {student.department}
                      </span>
                    </td>

                    {/* Registration Date */}
                    <td>
                      <span className="date-text">
                        {student.registeredAt || 'Recently'}
                      </span>
                    </td>

                    {/* Action Buttons: Edit and Delete */}
                    <td className="text-right">
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="btn-action btn-edit"
                          onClick={() => onEditStudent(student)}
                          title="Edit Student"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          type="button"
                          className="btn-action btn-delete"
                          onClick={() => onDeleteStudent(student.id, student.fullName)}
                          title="Delete Student"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentTable;

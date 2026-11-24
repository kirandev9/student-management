import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import ToastNotification from './components/ToastNotification';
import './App.css';

/**
 * Main App Component
 * Holds the top-level state for students, active edits, and notifications.
 */
function App() {
  // 1. Initial sample student data for beginner preview
  const [students, setStudents] = useState([
    {
      id: '1700000000001',
      fullName: 'Sophia Martinez',
      email: 'sophia.m@university.edu',
      phone: '+1 555-012-3456',
      department: 'Computer Science',
      registeredAt: 'Nov 12, 2026',
    },
    {
      id: '1700000000002',
      fullName: 'Alex Johnson',
      email: 'alex.j@university.edu',
      phone: '+1 555-987-6543',
      department: 'Data Science & AI',
      registeredAt: 'Nov 14, 2026',
    },
    {
      id: '1700000000003',
      fullName: 'Emma Watson',
      email: 'emma.w@university.edu',
      phone: '+1 555-246-8101',
      department: 'Business Administration',
      registeredAt: 'Nov 19, 2026',
    },
  ]);

  // 2. State for the student currently being edited (null when adding a new student)
  const [editingStudent, setEditingStudent] = useState(null);

  // 3. State for transient toast notification feedback
  const [notification, setNotification] = useState(null);

  // Helper function to trigger notifications that auto-dismiss after 4 seconds
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  // Handler: Add a new student record
  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
    showNotification(`Student "${newStudent.fullName}" was registered successfully!`, 'success');
  };

  // Handler: Select a student to edit
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    // Smoothly scroll to the form section
    const formElement = document.getElementById('register-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler: Save updated student details
  const handleUpdateStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setEditingStudent(null);
    showNotification(`Student "${updatedStudent.fullName}" was updated successfully!`, 'info');
  };

  // Handler: Cancel edit mode
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Handler: Delete a student record
  const handleDeleteStudent = (id, studentName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove "${studentName}" from the student registry?`
    );

    if (confirmDelete) {
      setStudents((prev) => prev.filter((student) => student.id !== id));
      // If the deleted student was currently loaded in the edit form, cancel edit
      if (editingStudent?.id === id) {
        setEditingStudent(null);
      }
      showNotification(`Student "${studentName}" was removed.`, 'danger');
    }
  };

  return (
    <div className="app-layout">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Floating Alert / Toast Notification */}
      <ToastNotification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Welcome Hero Banner */}
        <div className="welcome-banner">
          <div className="banner-text">
            <h2>Welcome to Student Administration Hub 👋</h2>
            <p>
              Manage student enrollment, monitor academic departments, and maintain accurate records seamlessly.
            </p>
          </div>
          <div className="banner-action">
            <a href="#register-section" className="banner-btn">
              + New Registration
            </a>
          </div>
        </div>

        {/* Dashboard Overview Cards */}
        <DashboardStats students={students} />

        {/* Two-Column or Stacked Workspace: Form & Directory */}
        <div className="content-grid">
          {/* Registration / Edit Form */}
          <StudentForm
            onAddStudent={handleAddStudent}
            onUpdateStudent={handleUpdateStudent}
            editingStudent={editingStudent}
            onCancelEdit={handleCancelEdit}
          />

          {/* Enrolled Students Table */}
          <StudentTable
            students={students}
            onEditStudent={handleEditStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 EduManage Portal — Built with React & Vite for beginner developers</p>
      </footer>
    </div>
  );
}

export default App;

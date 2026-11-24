import React from 'react';

/**
 * DashboardStats Component
 * Displays summary metric cards with soft-yellow and blue accent badges.
 */
function DashboardStats({ students }) {
  const totalStudents = students.length;

  // Calculate distinct departments count
  const uniqueDepartments = new Set(students.map((s) => s.department)).size;

  // Most recent registered student
  const latestStudent = students.length > 0 ? students[students.length - 1].fullName : 'None yet';

  return (
    <section id="dashboard" className="stats-grid">
      {/* Metric Card 1: Total Students */}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-title">Total Enrolled</span>
          <span className="stat-badge blue-badge">Active</span>
        </div>
        <div className="stat-body">
          <span className="stat-value">{totalStudents}</span>
          <div className="stat-icon blue-icon">👥</div>
        </div>
        <p className="stat-footer">Total registered students in database</p>
      </div>

      {/* Metric Card 2: Departments */}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-title">Departments</span>
          <span className="stat-badge yellow-badge">Academic</span>
        </div>
        <div className="stat-body">
          <span className="stat-value">{uniqueDepartments}</span>
          <div className="stat-icon yellow-icon">🏛️</div>
        </div>
        <p className="stat-footer">Covering engineering, arts & science</p>
      </div>

      {/* Metric Card 3: Latest Registration */}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-title">Latest Member</span>
          <span className="stat-badge green-badge">New</span>
        </div>
        <div className="stat-body">
          <span className="stat-value student-name-highlight" title={latestStudent}>
            {latestStudent}
          </span>
          <div className="stat-icon green-icon">✨</div>
        </div>
        <p className="stat-footer">Most recently enrolled student</p>
      </div>
    </section>
  );
}

export default DashboardStats;

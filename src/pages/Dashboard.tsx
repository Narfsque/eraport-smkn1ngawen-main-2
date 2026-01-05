import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import TeacherDashboard from '@/components/dashboard/TeacherDashboard';
import StudentDashboard from '@/components/dashboard/StudentDashboard';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'guru':
      return <TeacherDashboard />;
    case 'siswa':
      return <StudentDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default Dashboard;

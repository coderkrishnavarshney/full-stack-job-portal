import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { SnackbarProvider } from './contexts/SnackbarContext';
import theme from './styles/theme';
import ProtectedRoute from './components/routing/ProtectedRoute';
import HomePage from './pages/Home';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import JobListPage from './pages/jobs/JobList';
import JobDetailPage from './pages/jobs/JobDetail';
import DashboardPage from './pages/user/Dashboard';
import EmployerDashboardPage from './pages/employer/Dashboard';
import AdminDashboardPage from './pages/admin/Dashboard';
import NotFoundPage from './pages/NotFound';
import Layout from './components/layout/Layout';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AuthProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/jobs" element={<JobListPage />} />
                <Route path="/jobs/:id" element={<JobDetailPage />} />
                
                {/* Protected routes */}
                <Route element={<ProtectedRoute allowedRoles={['candidate']} />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                </Route>
                
                <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
                  <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />
                </Route>
                
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                </Route>
                
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </Router>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
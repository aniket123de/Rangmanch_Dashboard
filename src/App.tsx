import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import theme from './theme';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './components/DashboardLayout';
import ContentLibrary from './pages/ContentLibrary';
// @ts-ignore
import Analytics from './pages/Analytics';
import AudienceInsights from './pages/AudienceInsights';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Settings from './pages/Settings';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Protected Route component
const ProtectedRoute: React.FC<{ path: string; children: React.ReactNode }> = ({ children, ...rest }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/login">
            {currentUser ? <Redirect to="/" /> : <SignIn />}
          </Route>
          
          <Route path="/signup">
            {currentUser ? <Redirect to="/" /> : <SignUp />}
          </Route>
          
          <Route path="/home">
            <Redirect to="/" />
          </Route>
          
          <ProtectedRoute path="/content-library">
            <DashboardLayout>
              <ContentLibrary />
            </DashboardLayout>
          </ProtectedRoute>
          
          <ProtectedRoute path="/analytics">
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          </ProtectedRoute>
          
          <ProtectedRoute path="/audience-insights">
            <DashboardLayout>
              <AudienceInsights />
            </DashboardLayout>
          </ProtectedRoute>
          
          <ProtectedRoute path="/profile">
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </ProtectedRoute>
          
          <ProtectedRoute path="/settings">
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
          
          <ProtectedRoute path="/" exact>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
          
          {/* Redirect any unknown routes to Dashboard */}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App; 
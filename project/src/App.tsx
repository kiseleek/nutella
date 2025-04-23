import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ConsumablesPage from './pages/ConsumablesPage';
import DiagnosticsPage from './pages/DiagnosticsPage';
import ServiceHistoryPage from './pages/ServiceHistoryPage';
import ServiceCentersPage from './pages/ServiceCentersPage';
import VehicleInsightsPage from './pages/VehicleInsightsPage';
import DriverAssistancePage from './pages/DriverAssistancePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/consumables" element={<ConsumablesPage />} />
          <Route path="/diagnostics" element={<DiagnosticsPage />} />
          <Route path="/service-history" element={<ServiceHistoryPage />} />
          <Route path="/service-centers" element={<ServiceCentersPage />} />
          <Route path="/vehicle-insights" element={<VehicleInsightsPage />} />
          <Route path="/driver-assistance" element={<DriverAssistancePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
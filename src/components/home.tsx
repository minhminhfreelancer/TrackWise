import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import WebsiteOverview from "./dashboard/WebsiteOverview";
import AddWebsiteModal from "./website/AddWebsiteModal";
import AuthForms from "./auth/AuthForms";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For demo purposes, set to true
  const [showAddWebsiteModal, setShowAddWebsiteModal] = useState(false);
  const [hasWebsites, setHasWebsites] = useState(true); // For demo purposes, set to true
  const navigate = useNavigate();

  // Handle login success
  const handleLoginSuccess = (data: any) => {
    console.log("Login successful:", data);
    setIsAuthenticated(true);
  };

  // Handle registration success
  const handleRegisterSuccess = (data: any) => {
    console.log("Registration successful:", data);
    setIsAuthenticated(true);
  };

  // Handle adding a new website
  const handleAddWebsite = () => {
    setShowAddWebsiteModal(true);
  };

  // Handle website form submission
  const handleWebsiteSubmit = (data: any) => {
    console.log("Website added:", data);
    setHasWebsites(true);
    // In a real app, this would send data to the backend
  };

  // If not authenticated, show auth forms
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <AuthForms
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
        />
      </div>
    );
  }

  // If authenticated, show dashboard
  return (
    <DashboardLayout>
      <WebsiteOverview
        hasWebsites={hasWebsites}
        onAddWebsite={handleAddWebsite}
      />

      {/* Add Website Modal */}
      <AddWebsiteModal
        open={showAddWebsiteModal}
        onOpenChange={setShowAddWebsiteModal}
        onSubmit={handleWebsiteSubmit}
      />
    </DashboardLayout>
  );
};

export default Home;

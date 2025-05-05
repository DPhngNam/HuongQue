'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('personal');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <nav className="flex flex-col gap-2">
            <Button
              variant={activeSection === 'personal' ? 'default' : 'outline'}
              onClick={() => setActiveSection('personal')}
            >
              Personal Info
            </Button>
            <Button
              variant={activeSection === 'address' ? 'default' : 'outline'}
              onClick={() => setActiveSection('address')}
            >
              Delivery Address
            </Button>
            <Button
              variant={activeSection === 'orders' ? 'default' : 'outline'}
              onClick={() => setActiveSection('orders')}
            >
              Order History
            </Button>
          </nav>
        </div>
        <div className="w-full md:w-3/4">
          {activeSection === 'personal' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Personal Info</h2>
              <p>Display your personal information here.</p>
            </div>
          )}
          {activeSection === 'address' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>
              <p>Manage your delivery address here.</p>
            </div>
          )}
          {activeSection === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Order History</h2>
              <p>View your past orders here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav className="bg-white shadow-md">
      <div className=" px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-3xl font-bold text-black">
            Product Management
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-green-600">
              Products
            </Link>
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link to="/products/create" className="text-gray-700 hover:text-green-600">
                    Add Product
                  </Link>
                )}
                <div className="flex flex-col items-end">
                  <span className="text-gray-700">{user?.email}</span>
                  <span className="text-xs text-gray-500 capitalize">{user?.role || 'user'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-green-600">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-700 hover:text-green-600">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

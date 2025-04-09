import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    try {
      await signup(email, password);
      navigate('/login');
    } catch (err: any) {
      setFormError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 gap-56">
      {/* Left side image */}
      <div className="hidden md:block w-2/10 bg-cover bg-center items-center justify-center relative left-60 top-40">
        <img 
          src="/register.png" 
          alt="Sign Up" 
          className="object-cover h-[500px]"
        />
      </div>
      
      {/* Right side form */}
      <div className="w-full md:w-3/4 px-8 py-12 relative top-40 flex flex-col">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Sign Up</h1>
          
          {(formError || error) && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {formError || error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="form-input"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="form-input"
              />
            </div>
            
            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
              
              <div className="text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

'use client';

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthDiagnostic() {
  const [diagnosis, setDiagnosis] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const { diagnoseAuthIssue, handleAuthError, getAuthToken, logout } = useAuth();

  const runDiagnosis = async () => {
    setIsRunning(true);
    try {
      const result = await diagnoseAuthIssue();
      setDiagnosis(result);
    } catch (error) {
      setDiagnosis({ issue: 'ERROR', error: error.message });
    } finally {
      setIsRunning(false);
    }
  };

  const forceLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const token = getAuthToken();

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md z-50">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">🔍 Auth Diagnostic</h3>
        
        <div className="space-y-2 text-sm">
          <div>
            <strong>Token Status:</strong> {token ? '✅ Present' : '❌ Missing'}
          </div>
          {token && (
            <div className="text-xs font-mono bg-gray-100 p-2 rounded">
              {token.substring(0, 30)}...
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={runDiagnosis}
          disabled={isRunning}
          className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? 'Running...' : 'Run Diagnosis'}
        </button>

        <button
          onClick={forceLogout}
          className="w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Force Logout & Redirect to Login
        </button>
      </div>

      {diagnosis && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <div className="font-semibold mb-2">
            Issue: <span className={`${diagnosis.issue === 'NONE' ? 'text-green-600' : 'text-red-600'}`}>
              {diagnosis.issue}
            </span>
          </div>
          
          {diagnosis.recommendation && (
            <div className="text-sm text-gray-700 mb-2">
              <strong>Recommendation:</strong> {diagnosis.recommendation}
            </div>
          )}
          
          {diagnosis.error && (
            <div className="text-sm">
              <strong>Error:</strong>
              <pre className="text-xs bg-red-100 p-2 rounded mt-1 overflow-auto">
                {JSON.stringify(diagnosis.error, null, 2)}
              </pre>
            </div>
          )}
          
          {diagnosis.data && (
            <div className="text-sm">
              <strong>User Data:</strong>
              <pre className="text-xs bg-green-100 p-2 rounded mt-1 overflow-auto max-h-32">
                {JSON.stringify(diagnosis.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

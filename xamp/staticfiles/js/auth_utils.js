const AuthUtils = function () {
    // Session management helper for client-side
    return {
        refreshJwtToken: async function(refreshToken) {
            try {
                const response = await fetch('/api/auth/token/refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                });
                
                if (!response.ok) {
                    throw new Error('Token refresh failed');
                }
                
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error refreshing token:', error);
                return null;
            }
        },
        
        verifyToken: async function(token) {
            try {
                const response = await fetch('/api/auth/token/verify/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });
                
                return response.ok;
            } catch (error) {
                console.error('Error verifying token:', error);
                return false;
            }
        },
        
        getAuthHeader: function(token) {
            return {
                'Authorization': `Bearer ${token}`
            };
        },
        
        storeTokens: function(tokens) {
            localStorage.setItem('access_token', tokens.access);
            localStorage.setItem('refresh_token', tokens.refresh);
            localStorage.setItem('token_expiry', Date.now() + (55 * 60 * 1000)); // 55 minutes
        },
        
        clearTokens: function() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('token_expiry');
        },
        
        isTokenExpired: function() {
            const expiry = localStorage.getItem('token_expiry');
            return !expiry || Date.now() > parseInt(expiry);
        },
        
        setupTokenRefresh: function() {
            // Check token every minute
            setInterval(async () => {
                if (this.isTokenExpired()) {
                    const refreshToken = localStorage.getItem('refresh_token');
                    if (refreshToken) {
                        const newTokens = await this.refreshJwtToken(refreshToken);
                        if (newTokens) {
                            this.storeTokens(newTokens);
                        } else {
                            // Refresh failed, redirect to login
                            this.clearTokens();
                            window.location.href = '/login';
                        }
                    }
                }
            }, 60000);
        }
    };
}

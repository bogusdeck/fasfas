# Authentication Security Update - Remaining Component Fixes

## Components Updated So Far:
✅ ReviewSubmitStep.jsx - Updated to use secure authentication
✅ GSTVerificationStep.jsx - Updated imports and token handling  
✅ BasicInformationStep.jsx - Updated imports and API calls
✅ SignatureUploadStep.jsx - Updated imports and token handling
✅ BusinessPreferencesStep.jsx - Updated imports and token handling
✅ BankingDetailsStep.jsx - Updated imports (partial)

## Remaining Components That Need Updates:

### Pattern for Updates:

1. **Import Change:**
```javascript
// OLD:
import { useAuth } from '../../hooks/useAuth';

// NEW:
import { useAuth } from '../../contexts/AuthContext';
```

2. **Hook Usage Update:**
```javascript
// OLD:
const { saveFormData } = useAuth();

// NEW:
const { saveFormData, getAuthToken, authenticatedFetch } = useAuth();
```

3. **Token Retrieval:**
```javascript
// OLD:
const token = localStorage.getItem('authToken');

// NEW:
const token = getAuthToken();
```

4. **API Calls:**
```javascript
// OLD:
const response = await fetch('http://api-url/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': authHeader,
  },
  body: JSON.stringify(data)
});

// NEW:
const response = await authenticatedFetch('http://api-url/', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

## Components Still Needing Updates:

### 1. WarehouseDetailsStep.jsx
- Line ~3: Update import from hooks to contexts
- Line ~10: Add getAuthToken, authenticatedFetch to useAuth destructuring
- Line ~57: Replace localStorage.getItem('authToken') with getAuthToken()
- Update fetch call to use authenticatedFetch

### 2. BrandProductDetailsStep.jsx  
- Line ~3: Update import from hooks to contexts
- Line ~10: Add getAuthToken, authenticatedFetch to useAuth destructuring
- Line ~171: Replace localStorage.getItem('authToken') with getAuthToken()
- Update fetch call to use authenticatedFetch

### 3. BankingDetailsStep.jsx (Complete)
- Lines 129 & 240: Replace localStorage.getItem('authToken') with getAuthToken()
- Update both fetch calls to use authenticatedFetch

### 4. RegistrationForm.jsx
- Line ~77: Replace localStorage.getItem('authToken') with getAuthToken() from useAuth
- Line ~196: Remove commented localStorage line

### 5. PasswordStep.jsx
- Line ~80: Replace localStorage.getItem('authToken') with getAuthToken()

### 6. AuthStatus.jsx & AuthDebugger.jsx
- These are debugging components, update imports and token access

## Quick Fix Commands:

Since all components follow the same pattern, here are the systematic replacements needed:

1. Import Updates:
   - Find: `import { useAuth } from '../../hooks/useAuth';`
   - Replace: `import { useAuth } from '../../contexts/AuthContext';`

2. Hook Destructuring:
   - Add `getAuthToken, authenticatedFetch` to existing useAuth destructuring

3. Token Access:
   - Find: `localStorage.getItem('authToken')`
   - Replace: `getAuthToken()`

4. Remove Token Formatting:
   - Remove lines like: `const authHeader = token.startsWith('Bearer ') ? token : \`Bearer \${token}\`;`

5. API Calls:
   - Replace fetch calls with authenticatedFetch (removes need for manual Authorization header)

## Testing After Updates:

1. Clear browser localStorage and sessionStorage
2. Log in fresh 
3. Navigate through onboarding steps
4. Verify no authentication errors
5. Check browser dev tools for proper token storage in sessionStorage

## Security Benefits After Update:

- ✅ Tokens stored in sessionStorage (cleared on browser close)
- ✅ Automatic token refresh on expiration  
- ✅ Centralized authentication handling
- ✅ Protection against XSS token theft
- ✅ Automatic cleanup of legacy localStorage tokens
- ✅ Consistent error handling across all components

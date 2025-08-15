TODO
- brand onboarding detials
    - authentication for brands
    
- verification logic for brands 
- brand profile to manage ads and products
- brand settings page 






can do but not doing now
- OTP setup twilio or email (firebase)

will do in future
- system like sentry and datadog
- logz.io type shit




```bash
export PROJECT_PATH="$HOME/xamp"
export BACKEND_PATH="$PROJECT_PATH/xamp"
alias dev="cd $PROJECT_PATH; source .venv/bin/activate; cd xamp"
alias manage="dev; python manage.py"
alias run="manage runserver"
alias shell="manage shell_plus --quiet-load"
```
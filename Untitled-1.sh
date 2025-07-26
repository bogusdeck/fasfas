#!/bin/bash

# --------------------------- CONFIG SECTION --------------------------- #
REPO_URL="https://github.com/yourusername/your-django-repo.git"
PROJECT_DIR="your-django-repo"
PROJECT_NAME="yourproject"  # Django folder that contains settings.py
DJANGO_SETTINGS_MODULE="$PROJECT_NAME.settings"
PYTHON_VERSION="3.11.8"
ENV_NAME="myenv"
GUNICORN_SOCK="/home/ubuntu/$PROJECT_DIR/gunicorn.sock"
GIT_USERNAME="yourgithubusername"
GIT_EMAIL="your@email.com"
# ---------------------------------------------------------------------- #

echo "================= SYSTEM DEPENDENCIES ================="
sudo apt update && sudo apt install -y \
  make build-essential libssl-dev zlib1g-dev \
  libbz2-dev libreadline-dev libsqlite3-dev curl \
  libncursesw5-dev xz-utils tk-dev libxml2-dev \
  libxmlsec1-dev libffi-dev liblzma-dev git \
  postgresql postgresql-contrib libpq-dev ca-certificates \
  gnupg lsb-release openssh-client

# -------------------- GIT SETUP -------------------- #
echo "================= CONFIGURING GIT ================="
git config --global user.name "$GIT_USERNAME"
git config --global user.email "$GIT_EMAIL"
echo "✅ Git global username and email set."

# SSH key setup
if [ ! -f "$HOME/.ssh/id_rsa.pub" ]; then
  echo "================= GENERATING SSH KEY ================="
  ssh-keygen -t rsa -b 4096 -C "$GIT_EMAIL" -N "" -f "$HOME/.ssh/id_rsa"
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_rsa
  echo "✅ SSH key generated."

  echo "================= COPY THIS TO GITHUB SSH KEYS ================="
  echo "👉 Public Key:"
  cat ~/.ssh/id_rsa.pub
  echo
  echo "📌 Visit: https://github.com/settings/ssh/new to add this key."
else
  echo "✅ SSH key already exists."
fi

# -------------------- PYENV SETUP -------------------- #
echo "================= INSTALLING PYENV ================="
if [ ! -d "$HOME/.pyenv" ]; then
  curl https://pyenv.run | bash
else
  echo "pyenv already installed."
fi

SHELL_CONFIG="$HOME/.bashrc"
if [[ "$SHELL" == *"zsh" ]]; then
  SHELL_CONFIG="$HOME/.zshrc"
fi

PYENV_INIT='
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
'

if ! grep -q 'pyenv init' "$SHELL_CONFIG"; then
  echo "$PYENV_INIT" >> "$SHELL_CONFIG"
  echo "pyenv config added to $SHELL_CONFIG"
fi

export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"

echo "================= INSTALLING PYTHON $PYTHON_VERSION ================="
pyenv install -s $PYTHON_VERSION

echo "================= CREATING VIRTUALENV $ENV_NAME ================="
pyenv virtualenv $PYTHON_VERSION $ENV_NAME
pyenv local $ENV_NAME

# -------------------- CLONE PROJECT -------------------- #
echo "================= CLONING PROJECT ================="
cd ~
git clone $REPO_URL
cd $PROJECT_DIR

# -------------------- DJANGO SETUP -------------------- #
echo "================= INSTALLING PYTHON DEPENDENCIES ================="
pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn

echo "================= SETTING UP POSTGRES ================="
sudo -u postgres psql <<EOF
CREATE DATABASE mydb;
CREATE USER myuser WITH PASSWORD 'mypassword';
ALTER ROLE myuser SET client_encoding TO 'utf8';
ALTER ROLE myuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE myuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
EOF

echo "================= APPLYING DJANGO MIGRATIONS ================="
python manage.py migrate
python manage.py collectstatic --noinput

echo ">>> Creating Django superuser manually..."
python manage.py createsuperuser

# -------------------- GUNICORN SETUP -------------------- #
echo "================= CREATING GUNICORN SYSTEMD SERVICE ================="
sudo bash -c "cat > /etc/systemd/system/gunicorn.service" <<EOL
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/$PROJECT_DIR
ExecStart=/home/ubuntu/.pyenv/versions/$ENV_NAME/bin/gunicorn --access-logfile - --workers 3 --bind unix:$GUNICORN_SOCK $DJANGO_SETTINGS_MODULE:wsgi

[Install]
WantedBy=multi-user.target
EOL

echo "================= STARTING GUNICORN ================="
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl start gunicorn
sudo systemctl enable gunicorn

# -------------------- DOCKER + COMPOSE SETUP -------------------- #
echo "================= INSTALLING DOCKER ================="
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "================= ADDING USER TO DOCKER GROUP ================="
sudo usermod -aG docker $USER

echo "================= INSTALLING DOCKER COMPOSE v2 ALIAS ================="
sudo ln -s /usr/libexec/docker/cli-plugins/docker-compose /usr/local/bin/docker-compose 2>/dev/null || true

echo "✅ Docker & Docker Compose installation complete."

# -------------------- DONE -------------------- #
echo "✅ Full setup complete!"
echo "💡 Run 'newgrp docker' or re-login to use Docker without sudo."
echo "🔑 If using SSH, add the public key above to GitHub."

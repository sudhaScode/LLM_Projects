# settings.py

INSTALLED_APPS = [
    # ...
    'corsheaders',
    # ...
]

MIDDLEWARE = [
    # ...
    'corsheaders.middleware.CorsMiddleware',
    # ...
]
# settings.py

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    # Add other origins as needed
]

# Allow all headers for simplicity, you can customize this based on your needs
CORS_ALLOW_HEADERS = [
    'access-control-allow-origin',
    'content-type',
]

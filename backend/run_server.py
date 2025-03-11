from waitress import serve
from app import app

if __name__ == '__main__':
    print("Starting server with waitress on port 5001")
    serve(app, host='0.0.0.0', port=5001) 
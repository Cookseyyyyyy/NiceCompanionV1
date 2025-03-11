from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Flask backend is running!"})

# Example endpoint that could be used by one of your panels
@app.route('/api/assets', methods=['GET'])
def get_assets():
    # This would eventually connect to your real data source
    mock_assets = [
        {"id": 1, "name": "Asset 1", "type": "image", "lastModified": "2023-04-01"},
        {"id": 2, "name": "Asset 2", "type": "video", "lastModified": "2023-04-02"},
        {"id": 3, "name": "Asset 3", "type": "document", "lastModified": "2023-04-03"}
    ]
    return jsonify(mock_assets)

if __name__ == '__main__':
    app.run(debug=True, port=5000) 
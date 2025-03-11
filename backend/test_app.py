from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/test', methods=['GET'])
def test_endpoint():
    return jsonify({"message": "Test successful!"})

if __name__ == '__main__':
    print("Starting minimal test server on port 5001")
    app.run(port=5001, debug=False)  # Turned off debug mode to prevent watchdog restart 
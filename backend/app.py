from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime
import os
import sys
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize DaVinci Resolve API
try:
    from davinciapi.davinciapi import get_resolve_connection
    davinci_api = get_resolve_connection()
    if not davinci_api:
        print("Warning: Could not connect to DaVinci Resolve")
except Exception as e:
    print(f"Error initializing DaVinci Resolve API: {str(e)}")
    davinci_api = None

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Flask backend is running!"})

@app.route('/api/davinci/status', methods=['GET'])
def get_davinci_status():
    """Check if DaVinci Resolve is running and can be connected to."""
    if not davinci_api:
        return jsonify({"status": False, "error": "DaVinci Resolve API not initialized"})
    
    status = davinci_api.is_resolve_running()
    return jsonify(status)

@app.route('/api/davinci/project', methods=['GET'])
def get_davinci_project():
    """Get basic information about the current DaVinci Resolve project."""
    if not davinci_api:
        return jsonify({"error": "DaVinci Resolve API not initialized"})
    
    project_info = davinci_api.get_basic_project_info()
    return jsonify(project_info)

@app.route('/api/test', methods=['GET'])
def test_endpoint():
    return jsonify({
        "message": "Backend connection successful!",
        "timestamp": str(datetime.datetime.now())
    })

@app.route('/api/diagnostics', methods=['GET'])
def get_diagnostics():
    """Get diagnostic information about the environment and DaVinci Resolve connection."""
    diagnostics = {
        "system": {
            "platform": sys.platform,
            "python_version": sys.version,
            "python_path": sys.path,
            "environment_variables": {
                "RESOLVE_SCRIPT_API": os.environ.get("RESOLVE_SCRIPT_API", "Not set"),
                "RESOLVE_SCRIPT_LIB": os.environ.get("RESOLVE_SCRIPT_LIB", "Not set"),
                "PYTHONPATH": os.environ.get("PYTHONPATH", "Not set")
            }
        },
        "backend": {
            "status": "running",
            "api_initialized": davinci_api is not None
        }
    }
    
    # Add DaVinci Resolve connection info if initialized
    if davinci_api:
        resolve_status = davinci_api.is_resolve_running()
        diagnostics["davinci_resolve"] = resolve_status
        
        if resolve_status.get("status", False):
            try:
                project_info = davinci_api.get_basic_project_info()
                diagnostics["project_info"] = project_info
            except Exception as e:
                diagnostics["project_info"] = {"error": str(e)}
    else:
        diagnostics["davinci_resolve"] = {"status": False, "error": "DaVinci Resolve API not initialized"}
    
    return jsonify(diagnostics)

@app.route('/api/davinci/timeline', methods=['GET'])
def get_timeline_info():
    """Get information about the current timeline"""
    try:
        if davinci_api is None:
            initialize_davinci_api()
            
        if davinci_api:
            timeline_info = davinci_api.get_timeline_info()
            return jsonify(timeline_info)
        else:
            return jsonify({"error": "DaVinci Resolve API not initialized"}), 500
    except Exception as e:
        app.logger.error(f"Error getting timeline info: {str(e)}")
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route('/api/davinci/mediapool', methods=['GET'])
def get_media_pool_info():
    """Get information about the current media pool"""
    try:
        if davinci_api is None:
            initialize_davinci_api()
            
        if davinci_api:
            media_pool_info = davinci_api.get_media_pool_info()
            return jsonify(media_pool_info)
        else:
            return jsonify({"error": "DaVinci Resolve API not initialized"}), 500
    except Exception as e:
        app.logger.error(f"Error getting media pool info: {str(e)}")
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route('/api/davinci/renderjobs', methods=['GET'])
def get_render_jobs():
    """Get information about render jobs"""
    try:
        if davinci_api is None:
            initialize_davinci_api()
            
        if davinci_api:
            render_jobs = davinci_api.get_render_jobs()
            return jsonify(render_jobs)
        else:
            return jsonify({"error": "DaVinci Resolve API not initialized"}), 500
    except Exception as e:
        app.logger.error(f"Error getting render jobs: {str(e)}")
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.before_request
def log_request_info():
    print(f"Request: {request.method} {request.path} from {request.remote_addr}")

@app.after_request
def log_response_info(response):
    print(f"Response: {response.status}")
    return response

if __name__ == '__main__':
    print("Starting Flask server on 0.0.0.0:5001")
    app.run(port=5001, host='0.0.0.0', debug=False) 
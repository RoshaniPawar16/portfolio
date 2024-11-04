from flask import Flask, render_template, send_from_directory, abort
import logging
import os

# Set up logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

# Serve the main index page
@app.route('/')
def home():
    app.logger.info("Accessed the home route")
    return render_template('index.html')

# Serve images from the 'public/images/' directory
@app.route('/images/<path:filename>')
def serve_image(filename):
    app.logger.info(f"Serving image request for: {filename}")
    image_directory = 'public/images'
    
    if os.path.exists(os.path.join(image_directory, filename)):
        return send_from_directory(image_directory, filename)
    else:
        app.logger.error(f"Image not found: {filename}")
        abort(404, description="Image not found")

if __name__ == '__main__':
    app.logger.debug("Starting the Flask application")
    app.run(debug=True)

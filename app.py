from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

# Serve the main index page
@app.route('/')
def home():
    return render_template('index.html')

# Serve images from the 'public/images/' directory
@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('public/images', filename)

if __name__ == '__main__':
    app.run(debug=True)

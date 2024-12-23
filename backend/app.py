# -*- coding: utf-8 -*-
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from datetime import datetime
import json

app = Flask(__name__, 
    static_folder='../frontend/static',
    template_folder='../frontend/templates'
)
CORS(app)

# 用文件存储留言
MESSAGES_FILE = 'messages.json'

def load_messages():
    try:
        with open(MESSAGES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return []

def save_messages(messages):
    with open(MESSAGES_FILE, 'w', encoding='utf-8') as f:
        json.dump(messages, f, ensure_ascii=False, indent=2)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/messages', methods=['GET'])
def get_messages():
    messages = load_messages()
    return jsonify(messages)

@app.route('/api/messages', methods=['POST'])
def add_message():
    data = request.json
    message = {
        'content': data.get('message', ''),
        'name': data.get('name', '匿名'),
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    messages = load_messages()
    messages.append(message)
    save_messages(messages)
    return jsonify({'status': 'success', 'message': message})

if __name__ == '__main__':
    app.run(debug=True) 
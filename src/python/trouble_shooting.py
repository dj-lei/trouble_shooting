import warnings
from file_operate import FileOperate
from utils import *
from flask import Flask, jsonify, request, Response, make_response
app = Flask(__name__)

@app.after_request
def apply_caching(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,*')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:8080')
    return response

files = {}
@app.route("/open_file", methods=['GET'])
def open_file():
    if request.method == 'GET':
        path = request.args.get('path')
        files[path] = FileOperate(path)
        return jsonify({'lines': files[path].lines, 'inverted_index_table':list(files[path].inverted_index_table.keys())})
    return jsonify({'content': 'error'})

@app.route("/search", methods=['GET'])
def search():
    if request.method == 'GET':
        path = request.args.get('path')
        search_atom = request.args.get('search_atom')
        return jsonify({'content': files[path].search(search_atom)})
    return jsonify({'content': 'error'})

@app.route("/extract", methods=['GET'])
def extract():
    pass

@app.route("/delete_search", methods=['GET'])
def delete_search():
    pass

@app.route("/upload_template", methods=['GET'])
def upload_template():
    pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
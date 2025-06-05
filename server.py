from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)
CAMINHO_ARQUIVO = os.path.join(os.path.dirname(__file__), 'usuarios.json')

# Função auxiliar para carregar usuários
def carregar_usuarios():
    if os.path.exists(CAMINHO_ARQUIVO):
        with open(CAMINHO_ARQUIVO, 'r', encoding='utf-8') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []

# Função auxiliar para salvar usuários
def salvar_usuarios(usuarios):
    with open(CAMINHO_ARQUIVO, 'w', encoding='utf-8') as f:
        json.dump(usuarios, f, indent=2, ensure_ascii=False)

@app.route('/usuarios', methods=['POST'])
def cadastrar_usuario():
    try:
        dados = request.get_json()
        if not dados or 'nome' not in dados or 'email' not in dados:
            return jsonify({'erro': 'Dados inválidos'}), 400

        usuarios = carregar_usuarios()

        # Verifica se e-mail já existe
        if any(u['email'] == dados['email'] for u in usuarios):
            return jsonify({'erro': 'Usuário já cadastrado'}), 409

        usuarios.append(dados)
        salvar_usuarios(usuarios)
        return jsonify(dados), 201

    except Exception as e:
        return jsonify({'erro': f'Erro interno: {str(e)}'}), 500

# Permitir CORS (requisitado pelo navegador)
from flask_cors import CORS
CORS(app)

if __name__ == '__main__':
    app.run(port=3001, debug=True)

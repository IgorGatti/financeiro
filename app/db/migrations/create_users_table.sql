-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nome_completo VARCHAR(100),
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ultimo_login TIMESTAMP WITH TIME ZONE,
    ativo BOOLEAN DEFAULT true,
    CONSTRAINT tamanho_username CHECK (char_length(username) >= 3),
    CONSTRAINT formato_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Função para atualizar automaticamente a data de atualização
CREATE OR REPLACE FUNCTION atualizar_data_atualizacao()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar a data de atualização automaticamente
CREATE TRIGGER atualizar_data_atualizacao_usuarios
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_data_atualizacao(); 
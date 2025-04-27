CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

INSERT INTO users (name, email) VALUES
('João Silva', 'joao@example.com'),
('Maria Oliveira', 'maria@example.com'),
('Carlos Souza', 'carlos@example.com');
<<<<<<< Updated upstream
-- Create tables for the honey production management system

-- Table for municipalities
CREATE TABLE municipalities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on municipality name for faster lookups
CREATE INDEX idx_municipality_name ON municipalities(name);

-- Table for honey color classification
CREATE TABLE colors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  hex_color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on color code for faster lookups
CREATE INDEX idx_color_code ON colors(code);

-- Table for producers
CREATE TABLE producers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cod_na_comapi TEXT NOT NULL UNIQUE,
  nome_completo TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  rg TEXT,
  nascimento DATE,
  sexo TEXT,
  apelido TEXT,
  escolaridade TEXT,
  estado_civil TEXT,
  endereco TEXT,
  cod_municipio TEXT,
  municipality TEXT,
  uf TEXT,
  q_colmeia TEXT,
  cooperativa_vinculado TEXT,
  data_de_vinculo DATE,
  situacao TEXT,
  prod_de_mel TEXT,
  dap_validade DATE,
  numero_dap TEXT,
  tam_propriedade TEXT,
  cod_cert TEXT,
  organico TEXT,
  fair_trade TEXT,
  community TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster lookups
CREATE INDEX idx_producer_name ON producers(nome_completo);
CREATE INDEX idx_producer_municipality ON producers(municipality);
CREATE INDEX idx_producer_community ON producers(community);

-- Table for entry records
CREATE TABLE entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  producer_id UUID NOT NULL REFERENCES producers(id) ON DELETE CASCADE,
  municipality TEXT NOT NULL,
  community TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  gross_weight DECIMAL(10, 2) NOT NULL,
  net_weight DECIMAL(10, 2) NOT NULL,
  tare DECIMAL(10, 2) NOT NULL,
  total_tare DECIMAL(10, 2) NOT NULL,
  unit_value DECIMAL(10, 2) NOT NULL,
  total_value DECIMAL(10, 2) NOT NULL,
  color_code TEXT NOT NULL REFERENCES colors(code) ON DELETE RESTRICT,
  humidity DECIMAL(5, 2) NOT NULL,
  apiary TEXT,
  lot TEXT,
  contract TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster lookups and reporting
CREATE INDEX idx_entry_date ON entries(date);
CREATE INDEX idx_entry_producer ON entries(producer_id);
CREATE INDEX idx_entry_municipality ON entries(municipality);
CREATE INDEX idx_entry_color ON entries(color_code);

-- Create trigger function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_producer_modtime
    BEFORE UPDATE ON producers
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_entry_modtime
    BEFORE UPDATE ON entries
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();

-- Insert initial color data
INSERT INTO colors (code, name, hex_color) VALUES
('1', 'Branco Água', '#F5F5F5'),
('2', 'Extra Branco', '#FFFFFF'),
('3', 'Branco', '#FFFAFA'),
('4', 'Âmbar Extra Claro', '#FFEBCD'),
('5', 'Âmbar Claro', '#FFD700'),
('6', 'Âmbar', '#FFA500'),
('7', 'Âmbar Escuro', '#B8860B');

-- Insert initial region/municipality data
INSERT INTO municipalities (name, region) VALUES
('São Paulo', 'Sudeste'),
('Rio de Janeiro', 'Sudeste'),
('Belo Horizonte', 'Sudeste'),
('Salvador', 'Nordeste'),
('Recife', 'Nordeste'),
('Fortaleza', 'Nordeste'),
('Porto Alegre', 'Sul'),
('Curitiba', 'Sul'),
('Manaus', 'Norte'),
('Belém', 'Norte');
=======
-- Criação da tabela de Produtores
CREATE TABLE producers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    cod_na_comapi TEXT UNIQUE,
    municipality TEXT,
    community TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criação da tabela de Cores
CREATE TABLE colors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    hex_color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criação da tabela de Municípios
CREATE TABLE municipalities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    region TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criação da tabela de Entradas
CREATE TABLE entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    producer_id UUID REFERENCES producers(id),
    municipality_id INTEGER REFERENCES municipalities(id),
    color_code TEXT REFERENCES colors(code),
    quantity INTEGER NOT NULL,
    gross_weight DECIMAL(10, 2) NOT NULL,
    tare DECIMAL(10, 2) NOT NULL,
    net_weight DECIMAL(10, 2) NOT NULL,
    unit_value DECIMAL(10, 2) NOT NULL,
    total_value DECIMAL(10, 2) NOT NULL,
    humidity DECIMAL(5, 2),
    apiary TEXT,
    lot TEXT,
    contract TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

>>>>>>> Stashed changes

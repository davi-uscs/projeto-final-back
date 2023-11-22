# Projeto Final
- Davi Elias Teixeira
- Paula Maria
- Ruth Kikuko Kakazu
- William Shoji Kudaka
 
## Iniciando

- Clone o repositório

- Instale os pacotes

```bash
npm i
# ou
yarn
```
- Inicie o servidor

```bash
node index.js
```

- Crie um arquivo `.env` utilizando o arquivo `.env.example` como base e insira as credenciais.

## Script para criação do banco de dados MySQL

```
CREATE TABLE `funcionario` (
  `idFuncionario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `email` varchar(255) NOT NULL,
  `comissao` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`idFuncionario`),
  UNIQUE KEY `cpf_UNIQUE` (`cpf`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

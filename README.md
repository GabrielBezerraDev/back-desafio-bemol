# Backend - Chatbot Bemol Digital

## Tecnologias Necessárias
Para rodar o backend do Chatbot Bemol Digital, você precisará das seguintes tecnologias instaladas:

- **Docker** e **Docker Compose**: Para gerenciar os containers da aplicação.
- **NestJS**: Framework backend utilizado para desenvolver a API.
- **Banco de Dados PostgreSQL (docker image: postgres:latest)**: Utilizado para armazenar os dados.
- **Redis (docker image: redis:latest)**: Utilizado para caching e gerenciamento de sessões.
- **NGINX (docker image: nginx:latest)**: Utilizado como balanceador de carga para distribuir as requisições entre as instâncias do Ollama.
- **Ollama (docker image)**: Utilizado para rodar o modelo de IA Deepseek R1 14B.
- **Modelo de IA Deepseek R1 14B**: Necessário para a IA do chatbot. Deve ser baixado no site oficial da Ollama:
  - [Download do modelo Deepseek R1 14B](https://ollama.com/library/deepseek-r1:14b)

## Subindo os Containers com Docker Compose
Para iniciar os containers, siga os seguintes passos:

1. Certifique-se de ter o Docker e Docker Compose instalados.
2. Caso esteja utilizando Windows, será necessário modificar os volumes dos serviços do Ollama no arquivo `docker-compose.yml` para apontar para o caminho correto onde o modelo foi baixado na sua máquina.
3. Execute o seguinte comando para subir os containers:
   ```sh
   docker-compose up --build
   ```

Os serviços que serão iniciados incluem:
- **PostgreSQL** (`postgres:latest`): Porta **5432**
- **Redis** (`redis:latest`): Porta **6379**
- **NGINX** (`nginx:latest`): Porta **80**
- **Ollama** (`ollama` - 3 instâncias): Portas **11433, 11435, 11436**

## Rodando o NestJS
Após iniciar os containers, siga os passos para rodar a API NestJS:

1. Instale as dependências do projeto:
   ```sh
   npm install
   ```
2. Configure as variáveis de ambiente caso necessário.
3. Inicie a aplicação:
   ```sh
   npm run start
   ```

A API NestJS rodará na porta **3000** por padrão. Certifique-se de que essa porta está disponível no seu sistema.


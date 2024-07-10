# users-manager

Aplicação para gerenciamento de usuários.

Essa aplicação envolve o Frontend e backend para gerenciamento de usuários.

Depende das seguintes aplicações estejam rodando:
 - https://github.com/Joaoasbittencourt/user-service
 - https://github.com/Joaoasbittencourt/fake-store-service


## Rodando aplicação com suas dependências
Veja https://github.com/Joaoasbittencourt/microservices-user-manager


## Como rodar aplicação sem dependências
 1. Certifique-se de que todas as aplicações dependências estão rodando
 2. Certifique-se de ter docker instalado
 3. docker build . -t users-manager
 4. docker run -p 3000:3000 users-manager

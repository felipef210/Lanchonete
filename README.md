# 🍔 Lanchonete — Sistema de Pedidos Online

Um sistema completo de pedidos para lanchonetes, desenvolvido com .NET + Angular, cujo objetivo é reduzir o tempo de espera por atendimento, permitindo que o próprio cliente realize seus pedidos online, enquanto administradores gerenciam cardápio, pedidos e status do fluxo interno da cozinha.

## 🚀 Tecnologias Utilizadas

### Backend

- .NET 9;

- Entity Framework Core (ORM);

- ASP.NET Web API;

- AutoMapper;

- JWT (autenticação).

### Frontend

- Angular 19;

- Angular Material 19;

- RxJS (Observables);

- Services;

- Interceptors;

- Guards.

### Banco de Dados

- PostgreSQL

## 📌 Funcionalidades do Sistema

### 👤 Usuário Comum

- Criar conta e realizar login;

- Navegar pelo cardápio;

- Criar pedidos diretamente pelo aplicativo, sem depender de um garçom;

- Visualizar o status do pedido em tempo real:

- Aberto → Preparo → Finalizado;

- Acompanhar histórico dos próprios pedidos.


### 👑 Usuário Administrador

- Acesso completo ao gerenciamento do sistema;

- Criar novos produtos no cardápio;

- Editar produtos existentes;

- Excluir produtos;

- Acesso a todos os pedidos realizados.

- Alterar o status do pedido:

- Aberto → Preparo → Finalizado;

- Modificar pedidos em andamento;

- Deletar pedidos;

- Adicionar novos itens ao pedido;

- Restrição: pedidos finalizados não podem mais receber alterações.


### 🎁 Funcionalidade Extra

Desconto automático de 10% no primeiro pedido de cada usuário.
O sistema identifica quem está realizando o primeiro pedido e aplica o desconto no cálculo final.

## 🏗 Estrutura do Projeto

### Backend
O backend foi estruturado em **repository pattern**, tendo assim a camada de ***repository*** (onde as consultas ao banco de dados são feitas), camada de ***services*** (onde ficam todas as regras de negócio da aplicação) e finalmente a ***controller*** (endpoints que se comunicam com o frontend).

```
LachoneteApi/
│
├─ Data             # Contexto do banco de dados e migrações
├─ Models/          # Entidades (Pedido, Produto, Usuario)
├─ DTOs/            # Objetos de transferência (PedidoDTO, UsuarioDTO, etc...)
├─ Profiles         # Configurações de mapeamento das models com os DTOs
├─ Repositories/    # Acesso ao banco (PedidoRepository, ProdutoRepository, etc...)
├─ Services/        # Regras de negócio (PedidoService, ProdutoService, etc...)
├─ Controllers/     # Endpoints REST
└─ Exceptions/      # Exceções customizadas
```

### Frontend
Já o frontend foi construído seguindo o padrão standalone, bastante comum nas novas versões do Angular.

```
LanchoneteApp/
│
├─ pages/
│   ├─ home/                    # Página de início da aplicação
│   ├─ cadastro/                # Cadastro de usuário
│   ├─ login/                   # Login
│   ├─ cardapio/                # Listagem e gerenciamento
|   ├─ carrinho/
|   ├─ detalhes-pedido/         # Administrador pode ver detalhes de um pedido
|   ├─ editar-pedido/           # Página que o administrador edita o pedido
|   ├─ meus-pedidos/            # Onde o usuário pode visualizar os próprios pedidos
|   ├─ painel-administrativo/   # Onde o adm acessa as funções de administrador
│   └─ editar-perfil/           # Edição de perfil
|
├─ layout
|   ├─ container                # Reaproveitação de layout com header e footer
|   └─ pagina-sem-footer        # Reaproveitação de layout com header
|
├─ shared/
│   ├─ components/              # Dumb components
│   ├─ enums/                   # Enum de status do pedido        
│   ├─ models/                  # Models utilizadas para se comunicar com backend    
│   └─ validators/              # Validadores personalizados            
│
└─ core/
    ├─ guards                   # Proteções de rotas da aplicação
    ├─ interceptors             # Interceptadores de requisições HTTP
    └─ services                 # Comunicação com os endpoints do backend
```

## 🛠 Como Rodar o Projeto

### Frontend

Tenha instalada uma das seguintes versões do node instaladas em sua máquina `^18.19.1`, `^20.11.1` ou `^22.0.0`, tenha também qualquer versão do **Angular 19** instalada em sua máquina. Após providenciar esses requisitos entre no repositório **LanchoneteApp** e digite os seguintes comandos:

```
npm install     # Instala dependências
ng serve -o     # Roda frontend e abre no seu navegador padrão
```

### Backend

Tenha a versão do **.NET 9** instalada na sua máquina e dentro do repositório **LachoneteApi** rode os seguintes comandos:

```
dotnet ef database update   # Cria banco e aplica migrations
dotnet run                  # Roda backend
```

## ☁️ Deploy
- Frontend -> Netlify (url: https://delicias-express.netlify.app)
- Backend -> Render
- Banco de dados -> Supabase

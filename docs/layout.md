```
src/
├── pages/
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── AdminDashboardPage.jsx  // O componente que define o layout do dashboard admin
│
├── features/                 // Pasta para agrupar funcionalidades/módulos
│   ├── properties/           // Módulo de imóveis
│   │   ├── components/
│   │   │   ├── PropertiesTable.jsx
│   │   │   └── PropertyForm.jsx
│   │   ├── pages/            // Páginas específicas do módulo de imóveis (se houver)
│   │   │   ├── PropertiesListPage.jsx
│   │   │   └── PropertyEditPage.jsx
│   │   └── index.js          // Exporta componentes/páginas do módulo
│   │
│   ├── articles/             // Módulo de artigos
│   │   ├── components/
│   │   │   ├── ArticleTable.jsx
│   │   │   └── ArticleEditor.jsx
│   │   └── pages/
│   │       ├── ArticlesListPage.jsx
│   │       └── ArticleEditPage.jsx
│   │   └── index.js
│   │
│   └── users/                // Módulo de gerenciamento de usuários
│       ├── components/
│       │   └── UsersTable.jsx
│       └── pages/
│           └── UsersListPage.jsx
│
├── layouts/                  // Layouts da aplicação
│   ├── MainLayout.jsx
│   └── AdminLayout.jsx       // O layout do dashboard admin (com sidebar, header)
│
└── components/               // Componentes genéricos e reutilizáveis
    ├── Button.jsx
    ├── Divisor.jsx
    └── AuthButton.jsx
```

## Visão Geral / Estatísticas Chave (Cards de Resumo):

- **Número Total de Imóveis Cadastrados**: Um card grande mostrando "X Imóveis Ativos".

- **Imóveis Pendentes de Aprovação**: Se houver um fluxo de aprovação, quantos imóveis estão aguardando.

- **Novos Usuários Cadastrados (Últimos 7 dias)**: Quantas pessoas se registraram recentemente.

- **Artigos Publicados**: Total de artigos no blog.

- **Imóveis Mais Visualizados**: Quais imóveis estão gerando mais interesse (se você tiver métricas).

## Atividade Recente / Últimas Ações:

- Uma lista ou feed mostrando as últimas ações importantes: "Imóvel 'Casa na Praia' foi atualizado por [Admin Name]", "Novo usuário [Nome do Usuário] cadastrado", "Novo artigo 'Dicas de Financiamento' publicado".

## Ações Rápidas / Atalhos:

Botões grandes e claros para as tarefas mais frequentes:

- `+ Cadastrar Novo Imóvel`

- `+ Escrever Novo Artigo`

- `Ver Mensagens de Contato`

- `Gerenciar Usuários`

## Gráficos Simples (Opcional, mas agrega muito):

- Um gráfico de linha mostrando o crescimento de usuários ao longo do tempo.

- Um gráfico de barras mostrando a quantidade de imóveis por tipo (casa, apartamento, terreno).

```
firebase deploy --only hosting

npm run build
gs://wilson-corretor-imoveis.firebasestorage.app
```

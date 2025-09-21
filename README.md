# Projeto Mosaico App (Protótipo Funcional)

![Capa do App Mosaico](https://imgur.com/a/Dy4BIIP) 

## 🧩 Sobre o Projeto

O Mosaico é um protótipo funcional de um aplicativo móvel, desenvolvido em React Native, projetado para ser uma ponte de comunicação e acompanhamento entre pais, professores e gestores no contexto do desenvolvimento infantil. A plataforma permite o registro de atividades, a observação de progressos e a visualização de relatórios de desempenho de forma clara e intuitiva.

Este projeto foi desenvolvido como parte de um trabalho acadêmico, focando na criação de uma experiência de usuário fluida e na implementação de uma arquitetura de componentes reutilizáveis.

## ✨ Funcionalidades Principais

- **Sistema Multi-Perfil:** Três fluxos de usuário distintos (Responsáveis, Professor e Gestor), cada um com seu próprio painel e funcionalidades.
- **Login Simulado:** Mecanismo de login que direciona para o perfil correto com base na entrada do usuário.
- **Painéis (Dashboards):** Telas iniciais personalizadas para cada perfil, com indicadores de performance (KPIs) e resumos visuais.
- **Navegação Completa:** Navegação por abas (`BottomTabNavigator`) e em pilha (`StackNavigator`) para uma experiência de usuário nativa.
- **Registro de Atividades:** Telas de formulário para pais e professores registrarem observações e progressos.
- **Relatórios Visuais:** Telas com gráficos e listas para acompanhamento de metas e desempenho.
- **Componentes de UX Modernos:**
    - Animação de carregamento (`loading`) personalizada baseada na logo.
    - Notificações "Toast" para feedback de ações.
    - Menus em formato de "card" (modal) para ações como logout.
    - Estados vazios para listas sem dados.

## 🚀 Tecnologias Utilizadas

- **React Native (com Expo)**: Framework principal para o desenvolvimento multiplataforma.
- **React Navigation**: Para o gerenciamento de todas as rotas e navegação do aplicativo.
- **React Context API**: Para gerenciamento do estado de autenticação (login/logout).
- **react-native-vector-icons**: Para a utilização de uma biblioteca de ícones consistente.
- **react-native-toast-message**: Para a exibição de notificações (toasts) de feedback.

## ⚙️ Como Executar o Projeto

### Pré-requisitos

Antes de começar, você precisará ter o seguinte ambiente configurado:
- [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
- [Android Studio](https://developer.android.com/studio) para executar o emulador Android
- [Git](https://git-scm.com/)

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/mosaico-app.git](https://github.com/seu-usuario/mosaico-app.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd mosaico-app
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o emulador Android** através do Android Studio.

5.  **Execute o aplicativo:**
    ```bash
    npm run android
    ```

O servidor Metro Bundler será iniciado e o aplicativo será instalado e aberto no seu emulador.

## 👤 Autor

**[Aloana Neto Silva]**

- Github: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [seu-linkedin](https://linkedin.com/in/seu-linkedin/)
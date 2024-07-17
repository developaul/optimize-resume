## Quick Apply

## 🚀 Getting Started

You will need:

- [Node.js 20+ (recommended 20.14 LTS)](https://nodejs.org/en/).
- [Git](https://git-scm.com/).

1. [Clone](https://github.com/developaul/quick-apply.git) this repository locally:

```bash
git clone git@github.com:developaul/quick-apply.git
```

2. Install dependencies:

```bash
# Install bun globally if you don't have it:
npm install -g bun

# and install dependencies:
bun install
```

3. Create a **.env.local** file with the following content:

> 🚧 The environment variables must match the following schema

```bash
# OpenAI Provider
OPENAI_API_KEY=
```

**OpenAI API Key**

- [Get your OpenAI API key](https://platform.openai.com/account/api-keys).

4. Run the development server:

```bash
bun run dev
```

## Roadmap

- [ ] Define Prompt to validate job content - Paul
- [ ] Define Prompt to validate resume content
- [ ] Define Prompt to generate percentage of afinity between the resume and the job
- [ ] Define Prompt to get technical skills from the resume and the job
- [ ] Define Prompt to get soft skills from the resume and the job
- [ ] Define Prompt to get keywords from the resume and the job
- [ ] Define Prompt to get general recommendations from the job


---

Se muestra un chat basico de ejemplo:

Escribir: "Cual es el estado del BTC durante los ultimos 3 meses"
-> Respondera con el componente Stocks

Escribir: "Cual es el estado del vuelo 10"
-> Respondera con el componente Flight
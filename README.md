# EngageFlow — Landing Page

Landing page desenvolvida como teste tecnico para a Ellos Design.

O projeto simula a pagina de captacao de um CRM conversacional chamado EngageFlow. Tem formulario funcional com backend em PHP e banco MySQL, animacoes com GSAP e carrossel com Swiper.

## Tecnologias

- HTML5
- SASS/SCSS
- JavaScript
- PHP
- MySQL
- GSAP + ScrollTrigger + Flip
- Swiper.js
- AOS
- Remixicon

## Como rodar

### Frontend

Pode abrir o `index.html` direto no navegador. Se quiser compilar o SASS:

```bash
npm install
npm run build:css
```

Modo watch (compila automatico ao salvar):

```bash
npm run sass:watch
```

### Backend (formulario + banco)

O formulario envia os dados pra `backend/form.php`, que grava no MySQL. Pra funcionar voce precisa de um servidor PHP com MySQL. Recomendo o XAMPP ou Laragon.

**Passo a passo (XAMPP como exemplo):**

1. Baixe e instale o [XAMPP](https://www.apachefriends.org/)
2. Copie a pasta do projeto pra dentro de `C:\xampp\htdocs\`
3. Abra o XAMPP e inicie o Apache e o MySQL
4. Abra o phpMyAdmin em `http://localhost/phpmyadmin`
5. Clique em **Importar**, selecione o arquivo `database/leads.sql` e execute
6. Acesse `http://localhost/landing-ellos` no navegador
7. Preencha o formulario e envie
8. Volte no phpMyAdmin, abra o banco `engageflow`, tabela `leads` e confira o registro

Se precisar mudar usuario, senha ou porta do MySQL, edite o arquivo `backend/connection.php`.

**Alternativa rapida (servidor embutido do PHP):**

```bash
php -S localhost:8000
```

Acesse `http://localhost:8000` e teste o formulario.

## Testando o banco

Depois de importar o `leads.sql` e enviar um lead pelo formulario, voce pode conferir os dados de duas formas:

**Pelo phpMyAdmin:**

- Acesse `http://localhost/phpmyadmin`
- Selecione o banco `engageflow`
- Clique na tabela `leads`
- Os registros vao aparecer ali

**Pelo terminal MySQL:**

```sql
USE engageflow;
SELECT * FROM leads;
```

## Estrutura do projeto

```
├── index.html              (pagina principal)
├── package.json
├── assets/
│   ├── css/style.css       (compilado do SASS)
│   ├── js/script.js        (logica e animacoes)
│   └── sass/style.scss     (estilos fonte)
├── backend/
│   ├── connection.php      (conexao com o banco)
│   └── form.php            (processa o formulario)
└── database/
    └── leads.sql           (script de criacao do banco)
```

## Sobre as animacoes

- O card "Lead Solar" no CRM percorre o pipeline automaticamente: Novos > Qualificando > Fechados
- O carrossel de depoimentos roda sozinho e pausa quando passa o mouse
- O background tem um efeito aurora que transiciona entre as cores da marca
- Os contadores de metricas animam quando entram na tela
- O chat simula uma conversa real quando a secao fica visivel

## Deploy

O frontend esta publicado na Vercel. O formulario nao funciona no deploy (precisa de PHP rodando no servidor), mas toda a interface e animacoes funcionam normalmente.

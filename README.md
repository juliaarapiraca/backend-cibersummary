## API REST CiberSummary (por Júlia Menezes Arapiraca)

### LINK DO DEPLOY: [https://meu-controle-de-gastos.herokuapp.com](https://backend-cibersummary.onrender.com]

Back End do projeto feito principalmente para as alunas do Mulher Digital, para consulta de termos, siglas e significados dos cursos. Foi usado JavaScript e NodeJS, assim como as bibliotecas dotenv, express, knex, pg e nodemon. Ela possui as seguintes funcionalidades:

### Listagem de termos (`GET` `/glossario`):
#### Essa é a rota que será chamada quando o usuário acessar a página do Glossário, carregando os termos automaticamente.

### Cadastro de novos termos (`POST` `/novotermo`):
#### Essa é a rota que será utilizada para cadastrar um novo termo no sistema.
- Para cadastrar um termo, é obrigatório informar o termo e o significado; 
- Dois termos não podem ser iguais;
- Os dados acima deverão ser informados no body da aplicação através de um objeto com a seguinte estrutura:
```javascript
{
	"termo": "nome do termo", 
	"sigla": "sigla, se houver",
	"significado": "significado do termo em português",
	"curso": "curso onde é mencionado"
}
```

### Atualização de termo (`PUT` `/editartermo/:id`):
#### Essa é a rota que será chamada quando o usuário quiser atualizar um dos termos já cadastrados.
- Para atualizar um termo, deve ser enviado o ID do mesmo no parâmetro de rota do endpoint;
- Os dados a serem atualizados deverão ser informados no body da aplicação através de um objeto com a seguinte estrutura:
```javascript
{
	"termo": "nome do termo", 
	"sigla": "sigla, se houver",
	"significado": "significado do termo em português",
	"curso": "curso onde é mencionado"
}
```

### Exclusão da movimentação (`DELETE` `/excluirtermo/:id`):
#### Essa é a rota que será chamada quando o usuario quiser excluir um dos termos já cadastrados.
- Deverá ser enviado o ID do termo no parâmetro de rota do endpoint.

*OBS (10/09): No momento, apenas a funcionalidade de listagem de termos está implementada no front-end. As demais serão adicionadas aos poucos, assim como novas funcionalidades.


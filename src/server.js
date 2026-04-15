const restify = require("restify");
const UsuariosController = require("./controllers/usuarios.controller");

const server = restify.createServer({
  name: "api-usuarios-restify",
});

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get("/usuarios", UsuariosController.listar);
server.post("/usuarios/criar", UsuariosController.criar);
server.get("/usuarios/:id", UsuariosController.getById);
server.get("/usuarios/email/:email", UsuariosController.getByEmail);
server.put("/usuarios/update/:id", UsuariosController.update);
server.del("/usuarios/delete/:id", UsuariosController.delete)

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`${server.name} rodando em ${server.url}`);
});

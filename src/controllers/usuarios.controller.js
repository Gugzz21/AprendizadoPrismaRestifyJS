const prisma = require("../config/prisma");

class UsuariosController {

  // Método para listar todos os usuários. 
  static async listar(req, res) {
    try {
      const usuarios = await prisma.usuario.findMany({
        orderBy: { id: "asc" },
      });
      res.send(200, usuarios);
    } catch (error) {
      res.send(500, { message: "Erro ao listar usuários." });
    }
  }

  // Método para criar um usuário. 
  static async criar(req, res) {
    try {
      const { nome, email } = req.body;
      if (!nome || !email) {
        res.send(400, {
          message: "Nome e email são obrigatórios.",
        });
      }

      const novoUsuario = await prisma.usuario.create({
        data: { nome, email },
      });
      res.send(201, novoUsuario);
    } catch (error) {
      if (error.code === "P2002") {
        res.send(409, { message: "Já existe usuário com esse email." });
      }
      res.send(500, { message: "Erro ao cadastrar usuário." });
    }
  }

  // Método para listar usuários por ID. 
    static async getById(req, res){ 
    try{ 
      const { id } = req.params; 
      const usuario = await prisma.usuario.findUnique({ where: {id: Number(id)}}); 

      if (!usuario) {
        res.send(404, { message: "Usuário não encontrado"}); 
      }
      res.send(200, usuario);
    } catch (error) { 
      res.send(500, { message: "Erro ao buscar usuário"}); 
    }
  }

  // Método para listar usuários por email. 
    static async getByEmail(req, res){ 
    try{ 
      const { email } = req.params; 
      const usuario = await prisma.usuario.findUnique({ where: {email: String(email)}}); 

      if (!usuario) {
        res.send(404, { message: "Usuário não encontrado."}); 
      }
      res.send(200, usuario);
    } catch (error) { 
      res.send(500, { message: "Erro ao buscar usuário."}); 
    }
  }

  // Método para atualizar usuário. 
    static async update(req, res){ 
    try{ 

      const { id } = req.params; 
      const {nome, email} = req.body; 

      const usuarioAtualizado = await prisma.usuario.update({ 
        where: { id: Number(id)},
        data: { nome, email}
      }); 
      res.send(200, usuarioAtualizado);

    } catch (error) { 
      res.send(404, { message: "Usuário não encontrado para atualização."}); 
    }
  }

  // Método para remover usuário. 
    static async delete(req, res){ 
    try{ 
      const { id } = req.params; 
      await prisma.usuario.delete({
         where: { id: Number(id)}
      });

      res.send(204); 

    } catch (error) { 
      res.send(404, { message: "Usuário não encontrado para remoção."}); 
    }
  }

}


module.exports = UsuariosController;

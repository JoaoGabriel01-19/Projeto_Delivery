import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// 1. CREATE - Criar Usuário no Banco
export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, telefone, cpf } = req.body;

    // Garante que campos obrigatórios não sejam enviados em branco
    if (!nome || !email || !telefone || !cpf) {
      return res.status(400).json({ erro: "Nome, email, telefone e CPF são obrigatórios." });
    }

    // Impede cadastro duplicado de e-mail (validação de banco)
    const emailExistente = await prisma.clientes.findFirst({ where: { email } });
    if (emailExistente) {
      return res.status(400).json({ erro: "E-mail já cadastrado." });
    }
    
    const telefoneExistente = await prisma.clientes.findUnique({ where: { telefone } });
    if (telefoneExistente) {
      return res.status(400).json({ erro: "Telefone já cadastrado." });
    }
    
    const cpfExistente = await prisma.clientes.findUnique({ where: { cpf } });
    if (cpfExistente) {
      return res.status(400).json({ erro: "CPF já cadastrado." });
    }

    // Grava o registro e protege a senha ocultando-a da resposta
    const novoUsuario = await prisma.clientes.create({
      data: { nome, email, telefone, cpf },
      select: { id: true, nome: true, email: true, telefone: true, cpf: true}
    });

    return res.status(201).json(novoUsuario);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar usuário no servidor." });
  }
};

// 2. READ ALL - Listar Todos os Usuários
export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.clientes.findMany({
      select: { id: true, nome: true, email: true, telefone: true, cpf: true}
    });
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar usuários." });
  }
};

// 3. READ ONE - Buscar Usuário específico por ID
export const obterUsuario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    // Valida se o ID recebido na URL é realmente um número
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido." });
    }

    const usuario = await prisma.clientes.findUnique({
      where: { id },
      select: { id: true, nome: true, email: true, telefone: true, cpf: true}
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar usuário." });
  }
};

// 4. UPDATE - Atualizar dados por ID
export const atualizarUsuario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, email, telefone, cpf} = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido." });
    }

    const usuarioExistente = await prisma.clientes.findUnique({ where: { id } });
    if (!usuarioExistente) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    // Se o cliente deseja alterar o e-mail, valida se o novo e-mail não pertence a outro usuário
    if (email && email !== usuarioExistente.email) {
      const emailEmUso = await prisma.clientes.findFirst({ where: { email } });
      if (emailEmUso) {
        return res.status(400).json({ erro: "E-mail já em uso por outro usuário." });
      }
    }

    const usuarioAtualizado = await prisma.clientes.update({
      where: { id },
      data: { nome, email, telefone, cpf },
      select: { id: true, nome: true, email: true, telefone: true, cpf: true }
    });

    return res.status(200).json(usuarioAtualizado);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao atualizar dados do usuário." });
  }
};

// 5. DELETE - Excluir Usuário por ID
export const deletarUsuario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido." });
    }

    const usuarioExistente = await prisma.clientes.findUnique({ where: { id } });
    if (!usuarioExistente) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    await prisma.clientes.delete({ where: { id } });

    // Status 204 indica sucesso, mas sem conteúdo de corpo no retorno
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao excluir usuário." });
  }
};

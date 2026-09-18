import { Router } from 'express';
import {
  criarUsuario,
  listarUsuarios,
  obterUsuario,
  atualizarUsuario,
  deletarUsuario
} from '../controllers/userController';

const router = Router();

// Mapeia os caminhos HTTP das URLs aos métodos do controlador correspondentes
router.post('/users', criarUsuario);
router.get('/users', listarUsuarios);
router.get('/users/:id', obterUsuario);
router.put('/users/:id', atualizarUsuario);
router.delete('/users/:id', deletarUsuario);

export default router;
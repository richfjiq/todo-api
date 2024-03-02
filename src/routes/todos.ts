import { Router } from 'express';
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from '../controllers';

const router = Router();

router.get('/', getTodos);
router.get('/:todoId', getTodoById);
router.post('/', createTodo);
router.delete('/:todoId', deleteTodo);
router.put('/:todoId', updateTodo);

export default router;

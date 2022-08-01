import {Router} from 'express';
import NotesController from './notes.controller';

 

const NotesRouter = Router();


// CREATE ONE
NotesRouter.post('/', NotesController.createNote);
// GET ALL
NotesRouter.get('/', NotesController.getAllNotes);
// GET ONE
NotesRouter.get('/:id', NotesController.getOneNote);
// UPDATE ONE 
NotesRouter.patch('/:id', NotesController.updateNote);
// DELETE ONE 
NotesRouter.delete('/:id', NotesController.deleteOneNote);




export default NotesRouter;
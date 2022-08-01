import Logger, { LogLevel } from '../utils/Logger.class';
import { Response, Request } from 'express';

import Note from '../models/note/Note.schema';
import INote from '../models/note/INote.interface';
import ResponseModel from '../models/ResponseModel.class'



class NotesController {


    /**
     * createNote
     * 
     * @param note 
     * @param status 
     * @returns Promise<note:INote> || ResponseModel 404
     */
    public async createNote(req:Request, res:Response): Promise<Response> {
        const {note, status} = req.body;

        try {
            if (!note || typeof note !== 'string') throw new Error('Invalid note');

            const newNote:INote = await Note.create({note, status});
            
            if (!newNote) {
                return res.status(400).json(new ResponseModel(false, 'Could not create new note.'));
            } 
            
            return res.status(201).json(new ResponseModel(true, 'Note created.', newNote) );

        } catch (error) {
            Logger.Log(LogLevel.Info ,`Error @ POST /notes/createNote, Error: ${error.message} `, new Date().toJSON());
            return res.status(400).json(new ResponseModel(false, error.message));    
        }
    }


    /**
     * getAllNotes
     * 
     * @returns Promise<notes:INote[]> || ResponseModel 404
     */
    public async getAllNotes(_req:Request, res:Response): Promise<Response> {
        try {
            const notes:INote[] | null = await Note.find({});

            if (!notes) {
                return res.status(400).json(new ResponseModel(false, 'Could not get notes.'));
            } 

            return res.status(200).json(new ResponseModel(true, 'All notes', notes));

        } catch (error) {
            Logger.Log(LogLevel.Info ,`Error @ POST /notes/getAllNotes, Error: ${error.message} `, new Date().toJSON());
            return res.status(400).json(new ResponseModel(false, error.message));  
        }
    }


    /**
     * getOneNote
     * 
     * @urlparam id: string
     * @returns Promise<note:INote> || ResponseModel 404
     */
    public async getOneNote(req:Request, res:Response): Promise<Response> {
        const id = req.params.id;

        try {
            if (!id || typeof id !== 'string') throw new Error('Invalid id'); 

            const note:INote | null = await Note.findById(req.params.id);

            if (!note) {
                return res.status(404).json(new ResponseModel(false, `Could not find note id ${id}.`));
            } 

            return res.status(200).json(new ResponseModel(true, `Found note id ${id}.`, note));

        } catch (error) {
            Logger.Log(LogLevel.Info ,`Error @ POST /notes/getOneNote, Error: ${error.message} `, new Date().toJSON());
            return res.status(400).json(new ResponseModel(false, error.message)); 
        }
    }

    
    /**
     * updateNote
     * 
     * @urlparam id: string
     * @param note: string
     * @param status: string
     * @returns Promise<note:INote> || ResponseModel 404
     */
    public async updateNote(req:Request, res:Response): Promise<Response> {
        const id = req.params.id;

        try {
            if (!id || typeof id !== 'string') throw new Error('Invalid id');

            const note: INote | null = await Note.findByIdAndUpdate(id, req.body, {new: true}); 

            if (!note) {
                return res.status(404).json(new ResponseModel(false, `Could not update note id ${id}.`));
            } 

            return res.status(200).json(new ResponseModel(true, `Note id ${id} updated.`, note));
            
        } catch (error) {
            Logger.Log(LogLevel.Info ,`Error @ POST /notes/updateNote, Error: ${error.message} `, new Date().toJSON());
            return res.status(400).json(new ResponseModel(false, error.message)); 
        }
    }


    /**
     * deleteOneNote
     * 
     * @urlparam id: string
     * @returns Promise<note:INote> || Error 404
     */
    public async deleteOneNote(req:Request, res:Response): Promise<Response> {
        const id = req.params.id;

        try {
            if (!id || typeof id !== 'string') throw new Error('Invalid id');

            const deletedNote: INote | null = await Note.findByIdAndDelete(id); 

            if (!deletedNote) {
                return res.status(404).json(new ResponseModel(false, `Could not delete note id ${id}.`));
            } 
            
            return res.status(200).json(new ResponseModel(true, `Note id ${id} deleted.`, deletedNote));
            
        } catch (error) {
            Logger.Log(LogLevel.Info ,`Error @ POST /notes/deleteOneNote, Error: ${error.message} `, new Date().toJSON());
            return res.status(400).json(new ResponseModel(false, error.message)); 
        }
    }




}


export default new NotesController();
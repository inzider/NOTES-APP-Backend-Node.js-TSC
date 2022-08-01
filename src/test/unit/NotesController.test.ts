import httpsMocks from 'node-mocks-http';
import NotesController from "../../controllers/notes.controller";
import Note from "../../models/note/Note.schema";
import {oneNote, allNotes, allNotesResponse, createNoteResponse, 
    getOneNoteResponse, updateNoteResponse, deleteOneNoteResponse
} from '../mock-data/NotesControllerRes.mock';



// Global
let req:any;
let res:any; 
let next:any; 
const noteId = '62e41fc1f29e9907a81fe5d8';


// Run before each test
beforeEach(() => {
    req = httpsMocks.createRequest();
    res = httpsMocks.createResponse();
    next = jest.fn();
});


// Mock Schema functions
Note.create = jest.fn();
Note.find = jest.fn();
Note.findById = jest.fn();
Note.findByIdAndUpdate = jest.fn();
Note.findByIdAndDelete = jest.fn();


// Test
describe('NotesController.createNote', () => {

    // Post body
    beforeEach(() => {req.body = oneNote});

    test('it should call Note.create', async () => {        
        await NotesController.createNote(req, res);
        expect(Note.create).toBeCalledWith(oneNote);
    });

    test('it should return json body with 201 on success', async () => {
        (<jest.Mock>Note.create).mockReturnValue(oneNote);
        await NotesController.createNote(req, res);
        // Verify status code
        expect(res.statusCode).toBe(201);
        // verify if the response is JSON of oneNote
        expect(res._getJSONData()).toStrictEqual(createNoteResponse);
        // Verify if the call is send
        expect(res._isEndCalled()).toBeTruthy();
    });
    
    test('it should return 400 on error', async () => {
        (<jest.Mock>Note.create).mockReturnValue(null);
        await NotesController.createNote(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled).toBeTruthy();
    });

});


describe('NotesController.getAllNotes', () => {
    test ('it should call Note.find()', async () => {
        await NotesController.getAllNotes(req, res);
        expect(Note.find).toHaveBeenCalledWith({});
    });

    test('it should return json body with 200 on success', async () => {
        (<jest.Mock>Note.find).mockReturnValue(allNotes);
        await NotesController.getAllNotes(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(allNotesResponse);
        expect(res._isEndCalled()).toBeTruthy();
    });

    test('it should return 400 on error', async () => {
        (<jest.Mock>Note.find).mockReturnValue(null);
        await NotesController.getAllNotes(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled).toBeTruthy();
    });

});


describe('NotesController.getOneNote', () => {

    // Get param
    beforeEach(() => {req.params.id = noteId});

    test ('it should call Note.findById() with url parameter', async () => {
        await NotesController.getOneNote(req, res);
        expect(Note.findById).toHaveBeenCalledWith(noteId);
    });

    test('it should return json body with 200 on success', async () => {
        (<jest.Mock>Note.findById).mockReturnValue(oneNote);
        await NotesController.getOneNote(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(getOneNoteResponse);
        expect(res._isEndCalled()).toBeTruthy();
    });

    test('it should return 404 on error', async () => {
        (<jest.Mock>Note.findById).mockReturnValue(null);
        await NotesController.getOneNote(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();
    });

});


describe('NotesController.updateNote', () => {

    // Post params
    beforeEach(() => {
        req.params.id = noteId;
        req.body = oneNote;
    });

    test ('it should call Note.findByIdAndUpdate() with url parameter', async () => {
        await NotesController.updateNote(req, res);
        expect(Note.findByIdAndUpdate).toHaveBeenCalledWith(noteId, oneNote, {new:true});
    });

    test('it should return json body with 200 on success', async () => {
        (<jest.Mock>Note.findByIdAndUpdate).mockReturnValue(oneNote);
        await NotesController.updateNote(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(updateNoteResponse);
        expect(res._isEndCalled()).toBeTruthy();
    });

    test('it should return 400 on error', async () => {
        (<jest.Mock>Note.findByIdAndUpdate).mockReturnValue(null);
        await NotesController.updateNote(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();
    });

});


describe('NotesController.deleteOneNote', () => {

    // Get param
    beforeEach(() => {
        req.params.id = noteId;
    });

    test ('it should call Note.findByIdAndDelete() with url parameter', async () => {
        await NotesController.deleteOneNote(req, res);
        expect(Note.findByIdAndDelete).toHaveBeenCalledWith(noteId);
    });

    test('it should return json body with 200 on success', async () => {
        (<jest.Mock>Note.findByIdAndDelete).mockReturnValue(oneNote);
        await NotesController.deleteOneNote(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(deleteOneNoteResponse);
        expect(res._isEndCalled()).toBeTruthy();
    });

    test('it should return 404 on error', async () => {
        (<jest.Mock>Note.findByIdAndDelete).mockReturnValue(null);
        await NotesController.deleteOneNote(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();
    });

});
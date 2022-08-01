import request from 'supertest';
import {app} from '../../main';
import INote from '../../models/note/INote.interface';
import {oneNote} from '../mock-data/NotesControllerRes.mock';



// Global 
const endpointUrl = '/notes/'; // endpoint are we testing 
let newNoteId:string;
let firstNote:INote;
const nonExistingNoteId = "6257020efbcb9442db7958c1";
const testData = {note: `Integration test for PUT ${endpointUrl}` , status: 'Pending'};


describe(endpointUrl, () => {

    // CREATE
    test(`POST ${endpointUrl}`, async () => {
        const response = await request(app)
          .post(endpointUrl)
          .send(oneNote);
        expect(response.statusCode).toBe(201);
        expect(response.body.data.note).toBe(oneNote.note);
        expect(response.body.data.status).toBe(oneNote.status);
        newNoteId = response.body.data._id;
      });


      test(`POST ${endpointUrl} should return 400 on malformed data`, async () => {
        const response =  await request(app)
            .post(endpointUrl)
            .send({note: 456789});
        expect(response.statusCode).toBe(400);
        expect(response.body).toStrictEqual( { success: false, message: 'Invalid note' });
    });


    // GET ALL NOTES
    test(`GET ${endpointUrl}`, async () => {
        const response = await request(app)
            .get(endpointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.data)).toBeTruthy;
        expect(response.body.data[0]).toMatchObject(oneNote);
        expect(response.body.data[0].note).toBeDefined();
        expect(response.body.data[0].status).toBeDefined();
        firstNote = response.body.data[0];
    });


    // GET ONE NOTE 
    test(`GET ${endpointUrl}:id`, async () => {
        const response = await request(app)
            .get(endpointUrl + firstNote._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.note).toBe(firstNote.note);
        expect(response.body.data.status).toBe(firstNote.status);
    });


    test(`GET ${endpointUrl}:id, if id doesnt exist - return 400`, async () => {
        const response = await request(app)
            .get(endpointUrl + nonExistingNoteId);
        expect(response.statusCode).toBe(404);
    });


    // UPDATE
    test(`PATCH ${endpointUrl}:id`, async () => {
        const response = await request(app).patch(endpointUrl + newNoteId).send(testData);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.note).toBe(testData.note);
        expect(response.body.data.status).toBe(testData.status);
    });


    test(`PATCH ${endpointUrl}:id - doesnt exist - return 404`, async () => {
        const response = await request(app).patch(endpointUrl + nonExistingNoteId);
        expect(response.statusCode).toBe(404);
    });


    // DELETE
    test(`DELETE ${endpointUrl}:id`, async () => {
        const response = await request(app).delete(endpointUrl + newNoteId).send();
        expect(response.statusCode).toBe(200);
        expect(response.body.data.note).toBe(testData.note);
        expect(response.body.data.status).toBe(testData.status);
    });


    test(`DELETE ${endpointUrl}:id doesnt exist - return 404`, async () => {
        const response = await request(app).delete(endpointUrl + nonExistingNoteId).send();
        expect(response.statusCode).toBe(404);
    });




});
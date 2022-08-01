import mongoose from 'mongoose';
import INote from './INote.interface';



const NoteSchema = new mongoose.Schema({

    note: {
        type: String,
        maxLength: 1500,
    },

    status: {
        type: String, 
        default: 'Pending',
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    }

}, {collection: 'notes'});




const Note:mongoose.Model<INote> = mongoose.model<INote>('Note', NoteSchema);
export default Note;
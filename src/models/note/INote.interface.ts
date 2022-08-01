import mongoose from 'mongoose';



interface INote extends mongoose.Document {

    note: string;
    status: string;
    updatedAt: Date,
};




export default INote;
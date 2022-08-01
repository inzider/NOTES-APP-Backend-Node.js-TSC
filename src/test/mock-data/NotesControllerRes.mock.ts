export const oneNote = {
    note: "This is a test note",
    status: "Pending"
};


export const allNotes = [
    oneNote, oneNote, oneNote,
];


export const allNotesResponse = {
    data: [
        ...allNotes
    ], 
    message: "All notes", 
    success: true
};


const response = {
    data: {
        ...oneNote
    },
    success: true
}; 



export const createNoteResponse = {
    ...response,
    message: "Note created.", 
};


export const getOneNoteResponse = {
    ...response,
    message: "Found note id 62e41fc1f29e9907a81fe5d8.",
};


export const updateNoteResponse = {
    ...response,
    message: "Note id 62e41fc1f29e9907a81fe5d8 updated.", 
};


export const deleteOneNoteResponse = { 
    ...response,
    message: "Note id 62e41fc1f29e9907a81fe5d8 deleted.", 
};
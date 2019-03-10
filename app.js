// Imports the express framework/middleware
import express from 'express';
// Imports the cors middleware
import cors from 'cors';
// Initializes the variable app as the invocation of the express framework
const app = express()
// Binds invocation of the json method to the instance of app (the epxress framework)
app.use(express.json())
// Binds the invocation of the cors middleware to the instance of app (the express freamework)
app.use(cors());

// Initializes the notes property in the local server storage as an empty array
app.locals.notes = [];

// Invokes the get method on the instance of app to request data from the /notes endpoint
app.get('/notes', (req, res) => {
  // Sets the response to reply with the status code 200 and the response body to be the json version of the notes array
  // (the array from above server storage)
  res.status(200).json(app.locals.notes);
});

// Invokes the delete method on the instance of app to request the removal of the note with the specific id in the endpoint
app.delete('/notes/:id', (req, res) => {
  // Declares the variable noteIndex to equal the result of the findIndex array prototype which has been invoked upon the notes array. 
  //The result will be the index of the note in the notes array which matches the id parameter in the endpoint or -1 if it does not match any notes.
  const noteIndex = app.locals.notes.findIndex(note => note.id == req.params.id);
  // Checks if the noteIndex is -1 (the id parameter did not match any notes in the notes array).  
  // If truthy, it will set and return the response with status code 404 and body to be a message 'Note not found'
  if (noteIndex === -1) return res.status(404).json('Note not found');
  // Splices the note out of the notes array if the id parameter did match a note
  app.locals.notes.splice(noteIndex, 1);
  // Sets and returns the response to reply with status code 204
  return res.sendStatus(204);
});

// Invokes the post method on the instance of app to add a note to the notes array
app.post('/notes', (req, res) => {
  // Deconstructs the id, title and noteItems properties from the request body
  const { id, title, noteItems } = req.body;
  // Declares a variable that is equal to the result of the some array prototype which is being invoked on the notes array (results in a boolean). 
  // If the id is a duplicate of a note in the notes array, isduplicate will be true.
  const isduplicate = app.locals.notes.some(note => note.id == id)
  // Checks if there is no id included in the request and sets and returns the response to reply with a status code 422 and a json message 'Error posting note'
  if (!id) return res.status(422).json('Error posting note');
  // Checks if isduplicate is true and sets and returns the response to reply with a status code 409 and a json message 'Please try adding your note again'
  if (isduplicate) return res.status(409).json('Please try adding your note again')
  // Delcares a varialbe newNote and assigns it to be an object with a title, id and noteItems from the request body
  const newNote = {
    title,
    id,
    noteItems
  }
  // Pushes the newNote into the notes array
  app.locals.notes.push(newNote);
  // Sets and returns the response to reply with a status code 200 and a json verson of newNote
  res.status(200).json(newNote);
});

// Invokes the put method on the instance of app to replace a note in the notes array with a new note
app.put('/notes/:id', (req, res) => {
  // Deconstructs the id from the request parameters
  const {id} = req.params
  // Declares the variable note to be equal to the request body
  const note = req.body
  // Declares the variable noteIndex to be the result of the invocation of the findIndex array prototype invoked on the notes array. 
  // The result will be the index of the note in the notes array which matches the id parameter in the endpoint or -1 if it does not match.
  const noteIndex = app.locals.notes.findIndex(note => note.id == id)
  // Checks if the noteIndex is -1 (the id parameter did not match any notes in the notes array).  
  // If truthy, it will set and return the response to reply with status code 404 and the response body to be a message 'Note not found'
  if(noteIndex === -1) return res.status(404).json('Note not found')
  // Splices the note out of the notes array and replaces it with the new version in the request body
  app.locals.notes.splice(noteIndex, 1, note)
  // Sets and returns the response to reply with the status code 200 and the response body as the new note.
  return res.status(200).json(app.locals.notes[noteIndex])
})

// Exports app as a default
export default app;
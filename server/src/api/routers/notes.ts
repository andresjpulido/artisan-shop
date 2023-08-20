import { Router } from "express";

import NoteCtrl from "../controllers/noteCtrl";
import { Container } from "typedi"; 
import auth from "../middlewares/auth"; 

export default (app: Router) => {
   
  app.get("/notes/:id", NoteCtrl.getNoteById); 
  app.get("/notes", NoteCtrl.getNotes); 
  app.delete("/notes/:id", NoteCtrl.delete); 
  app.put("/notes",  NoteCtrl.update); 
  app.post("/notes", NoteCtrl.create);
    
};

import { Injectable } from '@angular/core';
import { Note } from './note.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Note[] = [];
  private noteSubject = new Subject<Note[]>();

  constructor(
    private http: HttpClient
  ) { }

  getNotes() {
    this.http.get<{ message: string, notes: any}>(
      'http://localhost:3000/api/notes'
    ).pipe(map( (noteData) => {
      return noteData.notes.map( note => {
        return {
          id: note._id,
          title: note.title,
          content: note.content,
          color: note.color,
          fontStyle: note.fontStyle
        };
      });
    }))
    .subscribe( allNotes => {
      this.notes = allNotes;
      this.noteSubject.next([...this.notes]);
    });
  }

  getNoteUpdateListener() {
    return this.noteSubject.asObservable();
  }

  addNote(note: Note) {

    this.http.post<{ message: string, postId: string }>(
      'http://localhost:3000/api/notes', note
    ).subscribe( responseData => {
      const id = responseData.postId;
      note.id = id;
      this.notes.push(note);
      this.noteSubject.next([...this.notes]);
    });

  }

  deleteNote(id: string) {

    this.http.delete('http://localhost:3000/api/notes/' + id).subscribe( () => {
      const updatedNotes = this.notes.filter( note => note.id !== id);
      this.notes = updatedNotes;
      this.noteSubject.next([...this.notes]);
    });

  }

  editNote(note: Note) {
    this.http.put(
      'http://localhost:3000/api/notes/' + note.id, note
    ).subscribe( response => {
      const updatedNotes = [...this.notes];
      const oldNoteIndex = updatedNotes.findIndex(n => n.id === note.id);
      updatedNotes[oldNoteIndex] = note;
      this.notes = updatedNotes;
      this.noteSubject.next([...this.notes]);
    });
  }

}

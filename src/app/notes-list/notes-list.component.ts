import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

import { Note } from '../note.model';
import { NotesService } from '../notes.service';
import { Colors } from '../classes/color/colors';
import { Fonts } from '../classes/fonts/fonts';
import { User } from '../user.model';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit, OnDestroy {

  notes: Note[] = [];
  notesList: Note[][] = [];
  private noteSubscribe: Subscription;
  noteToEdit: Subject<Note> = new Subject();

  colors: Colors = new Colors();
  fonts: Fonts = new Fonts();

  visible: boolean;

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }

  showNoteEditor(noteId: string) {
    this.noteToEdit.next(
      this.notes.filter( n => {
        if (n.id === noteId) { return n; }
      }).shift()
    );
  }

  constructor(
    public noteService: NotesService,
    private loginService: LoginService
    ) { }

  ngOnInit() {

    const user: User = {
      id: null, email: this.loginService.getCookie('email'), password: null
    }
    this.noteService.getNotes(user);

    this.noteSubscribe = this.noteService.getNoteUpdateListener().subscribe(
      (note: Note[]) => {
        this.notesList = [];
        const col1: Note[] = [];
        const col2: Note[] = [];
        const col3: Note[] = [];
        const col4: Note[] = [];
        const col5: Note[] = [];
        note.forEach((el, i) => {
          if (i % 5 === 0) {
            col1.push(el);
          } else if (i % 5 === 1) {
            col2.push(el);
          } else if (i % 5 === 2) {
            col3.push(el);
          } else if (i % 5 === 3) {
            col4.push(el);
          } else if (i % 5 === 4) {
            col5.push(el);
          }
        });
        this.notesList.push(col1);
        this.notesList.push(col2);
        this.notesList.push(col3);
        this.notesList.push(col4);
        this.notesList.push(col5);
        this.notes = note;
      }
    );
  }

  addStyle(note: Note) {

    if (note.color && note.fontStyle) {
      return {
        color: this.colors.get(note.color),
        fontFamily: this.fonts.get(note.fontStyle)
      };
    } else if (note.color) {
      return { color: this.colors.get(note.color) };
    } else if (note.fontStyle) {
      return { fontFamily: this.fonts.get(note.fontStyle) };
    } else {
      return;
    }
  }

  onDelete(noteId: string) {
    this.noteService.deleteNote(noteId);
  }

  ngOnDestroy() {
    this.noteSubscribe.unsubscribe();
  }

}

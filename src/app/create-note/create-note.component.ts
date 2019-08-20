import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from '../notes.service';
import { Note } from '../note.model';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  constructor(public noteService: NotesService) { }

  ngOnInit() {
  }

  addNote(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const note: Note = {
      id: null,
      title: form.value.title,
      content: form.value.note,
      color: null,
      fontStyle: null
    };

    this.noteService.addNote(note);
    form.resetForm();
  }

}

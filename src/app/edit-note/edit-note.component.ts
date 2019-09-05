import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from '../note.model';
import { NotesService } from '../notes.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Colors } from '../classes/color/colors';
import { Color } from '../classes/color/color.model';
import { Fonts } from '../classes/fonts/fonts';
import { Font } from '../classes/fonts/font.model';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  @Input() noteToEdit: Subject<Note>;
  isVisible = false;
  note: Note; // the note that will display everything

  // class variables for styling
  colors: Colors = new Colors();
  fonts: Fonts = new Fonts();

  // class lists
  colorList: Color[];
  fontList: Font[];

  // UI control variables
  tplModal: NzModalRef;
  colorActive: boolean;
  fontActive: boolean;

  constructor(
    public noteService: NotesService,
    private modalService: NzModalService
    ) { }

  ngOnInit() {
    this.noteToEdit.subscribe( editNote => {
      this.note = editNote;
      this.isVisible = true;
      this.colorList = this.colors.getColors();
      this.fontList = this.fonts.getFonts();
      this.colorActive = false;
      this.fontActive = false;
      document.getElementById('toggleModel').click();
    });
  }

  // UI activation functions
  activateColor() {
    this.colorActive = !this.colorActive;
  }

  activateFont() {
    this.fontActive = !this.fontActive;
  }

  // build the UI's main components
  buildEditor(content: TemplateRef<{}>, footer: TemplateRef<{}>): void {
    this.tplModal = this.modalService.create({
      nzContent: content, // the form
      nzFooter: footer, // feature buttons and save
      nzMaskClosable: false,
      nzClosable: false
    });
  }

  // on save send to server and close editing UI
  onEditNote() {
    const updatedNote: Note = {
      id: this.note.id,
      title: this.note.title,
      content: this.note.content,
      color: this.note.color,
      fontStyle: this.note.fontStyle,
      email: this.note.email
    };
    this.noteService.editNote(updatedNote);

    // close the UI
    this.isVisible = false;
    this.tplModal.destroy();
  }

  // hide the drop down panels
  colorPanelStyle() {
    return {
      background: '#fff',
      border: 'none',
      cursor: 'default'
    };
  }

  // color picker icon color
  applyIconColor(c: string) {
    return { color : this.colors.get(c)};
  }

  // font picker give font names their style
  applyFont(font: string) {
    return { fontFamily: this.fonts.get(font) };
  }

  // apply notes styles to the form
  addStyle() {
    if (this.note.color && this.note.fontStyle) {
      console.log(this.note.color);
      return {
        color: this.colors.get(this.note.color),
        fontFamily: this.fonts.get(this.note.fontStyle)
      };
    } else if (this.note.color) {
      return { color: this.colors.get(this.note.color) };
    } else if (this.note.fontStyle) {
      return { fontFamily: this.fonts.get(this.note.fontStyle) };
    } else {
      return;
    }
  }

  // apply features when user selects changes
  changeColor(color: string) {
    this.note.color = color;
  }

  changeFont(font: string) {
    this.note.fontStyle = font;
  }

}

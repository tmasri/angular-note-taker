import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { NotesService } from '../notes.service';
import { User } from '../user.model';

@Component({
  selector: 'app-building-account',
  templateUrl: './building-account.component.html',
  styleUrls: ['./building-account.component.css']
})
export class BuildingAccountComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private noteService: NotesService
  ) { }

  ngOnInit() {

    const user: User = {
      id: null, email: this.loginService.getUser(), password: null
    }
    this.noteService.buildInitialNotes(user);

  }

}

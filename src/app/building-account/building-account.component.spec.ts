import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingAccountComponent } from './building-account.component';

describe('BuildingAccountComponent', () => {
  let component: BuildingAccountComponent;
  let fixture: ComponentFixture<BuildingAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

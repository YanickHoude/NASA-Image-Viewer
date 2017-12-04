import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakedownpolicyComponent } from './takedownpolicy.component';

describe('TakedownpolicyComponent', () => {
  let component: TakedownpolicyComponent;
  let fixture: ComponentFixture<TakedownpolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakedownpolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakedownpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

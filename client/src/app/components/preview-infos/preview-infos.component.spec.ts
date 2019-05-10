import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewInfosComponent } from './preview-infos.component';

describe('PreviewInfosComponent', () => {
  let component: PreviewInfosComponent;
  let fixture: ComponentFixture<PreviewInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

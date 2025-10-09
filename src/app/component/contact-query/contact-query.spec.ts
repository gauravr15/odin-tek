import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactQuery } from './contact-query';

describe('ContactQuery', () => {
  let component: ContactQuery;
  let fixture: ComponentFixture<ContactQuery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactQuery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactQuery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

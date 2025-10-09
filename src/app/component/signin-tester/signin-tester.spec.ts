import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninTester } from './signin-tester';

describe('SigninTester', () => {
  let component: SigninTester;
  let fixture: ComponentFixture<SigninTester>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninTester]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninTester);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

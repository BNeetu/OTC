import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAssistanceComponent } from './member-assistance.component';

describe('MemberAssistanceComponent', () => {
  let component: MemberAssistanceComponent;
  let fixture: ComponentFixture<MemberAssistanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberAssistanceComponent]
    });
    fixture = TestBed.createComponent(MemberAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

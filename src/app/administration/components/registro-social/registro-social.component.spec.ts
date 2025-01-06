import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSocialComponent } from './registro-social.component';

describe('RegistroSocialComponent', () => {
  let component: RegistroSocialComponent;
  let fixture: ComponentFixture<RegistroSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroSocialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

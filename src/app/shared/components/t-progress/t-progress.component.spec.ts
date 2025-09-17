import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TProgressComponent } from './t-progress.component';
import { ComponentRef } from '@angular/core';

describe('TProgressComponent', () => {
  let component: TProgressComponent;
  let fixture: ComponentFixture<TProgressComponent>;
  let componentRef: ComponentRef<TProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TProgressComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('radius', 40);
    componentRef.setInput('progress', 56);
    componentRef.setInput('color', 'blue');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasTwoD } from './canvas-two-d';

describe('CanvasTwoD', () => {
  let component: CanvasTwoD;
  let fixture: ComponentFixture<CanvasTwoD>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvasTwoD],
    }).compileComponents();

    fixture = TestBed.createComponent(CanvasTwoD);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

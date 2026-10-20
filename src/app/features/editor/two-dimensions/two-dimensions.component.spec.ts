import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TwoDimensionsComponent } from './two-dimensions.component';

describe('TwoDimensionsComponent', () => {
  let component: TwoDimensionsComponent;
  let fixture: ComponentFixture<TwoDimensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoDimensionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TwoDimensionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

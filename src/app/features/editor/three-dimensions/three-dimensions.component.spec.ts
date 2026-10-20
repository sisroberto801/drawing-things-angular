import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreeDimensionsComponent } from './three-dimensions.component';

describe('ThreeDimensionsComponent', () => {
  let component: ThreeDimensionsComponent;
  let fixture: ComponentFixture<ThreeDimensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeDimensionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreeDimensionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

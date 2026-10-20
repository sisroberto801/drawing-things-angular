import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewportThreeD } from './viewport-three-d';

describe('ViewportThreeD', () => {
  let component: ViewportThreeD;
  let fixture: ComponentFixture<ViewportThreeD>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewportThreeD],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewportThreeD);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

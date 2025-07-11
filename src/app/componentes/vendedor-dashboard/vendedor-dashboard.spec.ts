import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorDashboard } from './vendedor-dashboard';

describe('VendedorDashboard', () => {
  let component: VendedorDashboard;
  let fixture: ComponentFixture<VendedorDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendedorDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

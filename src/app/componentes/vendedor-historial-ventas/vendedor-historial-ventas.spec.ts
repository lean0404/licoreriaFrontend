import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorHistorialVentas } from './vendedor-historial-ventas';

describe('VendedorHistorialVentas', () => {
  let component: VendedorHistorialVentas;
  let fixture: ComponentFixture<VendedorHistorialVentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendedorHistorialVentas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorHistorialVentas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

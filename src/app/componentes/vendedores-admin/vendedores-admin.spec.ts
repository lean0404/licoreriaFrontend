import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedoresAdmin } from './vendedores-admin';

describe('VendedoresAdmin', () => {
  let component: VendedoresAdmin;
  let fixture: ComponentFixture<VendedoresAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendedoresAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedoresAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

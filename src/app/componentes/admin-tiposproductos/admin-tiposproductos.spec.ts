import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTiposproductos } from './admin-tiposproductos';

describe('AdminTiposproductos', () => {
  let component: AdminTiposproductos;
  let fixture: ComponentFixture<AdminTiposproductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTiposproductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTiposproductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

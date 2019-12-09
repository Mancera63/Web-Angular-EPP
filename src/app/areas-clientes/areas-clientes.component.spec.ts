import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasClientesComponent } from './areas-clientes.component';

describe('AreasClientesComponent', () => {
  let component: AreasClientesComponent;
  let fixture: ComponentFixture<AreasClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

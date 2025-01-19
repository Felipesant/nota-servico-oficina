import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacaModalComponent } from './placa-modal.component';

describe('PlacaModalComponent', () => {
  let component: PlacaModalComponent;
  let fixture: ComponentFixture<PlacaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacaModalComponent]
    });
    fixture = TestBed.createComponent(PlacaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

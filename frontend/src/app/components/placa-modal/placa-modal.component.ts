import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-placa-modal',
  templateUrl: './placa-modal.component.html',
  styleUrls: ['./placa-modal.component.scss']
})
export class PlacaModalComponent {
  placa: string = '';
  private _isLoading = false;

  @Input() set isLoading(val: boolean) {
    console.log('ENTROU');
    
    this._isLoading = val;
  };

  get isLoading(): boolean {
    return this._isLoading;
  }
  @Input() close: boolean = false;
  @Output() closeEmmiter: EventEmitter<any> = new EventEmitter();
  @Output() placaEmmiter: EventEmitter<any> = new EventEmitter();

  formatToUppercase() {
    this.placa = this.placa.toUpperCase();
  }

  onSubmit() {
    console.log('Placa consultada:', this.placa);
    this.placaEmmiter.emit(this.placa);
  }

  closeModal() {
    this.closeEmmiter.emit();
    // Adicione a lógica para fechar o modal aqui
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConsultaPlacaService } from './service/sinesp.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  placa: string = '';
  dadosVeiculo: any;
  showLoading: boolean = false;
  showModalPlaca: boolean = true;
  total = 0;

  numeros: number[] = Array.from({ length: 100 }, (_, i) => i + 1);

  itens: { quantidade: number, descricao: string, valor: number }[] = [{ quantidade: 1, descricao: '', valor: 0 }];

  constructor(private consultaPlacaService: ConsultaPlacaService) { }

  consultarPlaca(placaReceiver: string) {
    this.showLoading = true;
    this.consultaPlacaService.getPlaca(placaReceiver).subscribe(data => {
      this.dadosVeiculo = data.dados;
      this.placa = `${placaReceiver.slice(0, 3)}-${placaReceiver.slice(3)}`;
      this.showLoading = false;
      console.log('OIIIII');
      this.showModalPlaca = false;

    }, error => console.error('Erro ao consultar a placa:', error)
    );
  }

  addItem() {
    this.itens.push({ quantidade: 1, descricao: '', valor: 0 });
  }
  removeItem(index: number) {
    this.itens.splice(index, 1);

  }
  onSubmit() {
    console.log('Itens:', this.itens);
  }

  formatCurrency(index: number) {
    this.itens[index].valor = parseFloat(this.itens[index].valor.toString().replace(/[^0-9.]/g, '')) || 0;
  }

  updateTotal() {
    this.total = this.itens.reduce((sum, item) => sum + item.valor, 0);
  }

  generatePDF() {
    const pdfContentElement = this.pdfContent.nativeElement;
    html2canvas(pdfContentElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const anchor = document.createElement('a');
      anchor.href = pdfUrl; anchor.download = 'relatorio-itens.pdf';
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([pdfBlob], 'relatorio-itens.pdf', { type: 'application/pdf' })] })) {
        const pdfFile = new File([pdfBlob], 'relatorio-itens.pdf', { type: 'application/pdf' });
        navigator.share({ title: 'Relatório de Itens', text: 'Veja o relatório dos itens.', files: [pdfFile] })
          .then(() => {
            console.log('PDF compartilhado com sucesso.');
            URL.revokeObjectURL(pdfUrl);
          }
          ).catch(error => {
            console.error('Erro ao compartilhar o PDF:', error);
            URL.revokeObjectURL(pdfUrl);
          });
      } else {
        anchor.click();
        URL.revokeObjectURL(pdfUrl);
      }
    }).catch(error => {
      console.error('Erro ao gerar o PDF:', error);
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CurrencyConverterComponent implements OnInit {
  amount: number = 1;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  convertedAmount: number | null = null;
  rates: any = {};
  currencyKeys: string[] = [];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.getRates();
  }

  getRates(): void {
    this.currencyService.getRates().subscribe(data => {
      this.rates = data.Valute;
      this.currencyKeys = Object.keys(this.rates);
      this.convertCurrency();
    });
  }

  convertCurrency(): void {
    if (this.rates[this.fromCurrency] && this.rates[this.toCurrency]) {
      const fromRate = this.rates[this.fromCurrency].Value / this.rates[this.fromCurrency].Nominal;
      const toRate = this.rates[this.toCurrency].Value / this.rates[this.toCurrency].Nominal;
      this.convertedAmount = this.amount * (fromRate / toRate);
    } else {
      this.convertedAmount = null;
    }
  }

  onAmountChange(): void {
    this.convertCurrency();
  }

  onCurrencyChange(): void {
    this.convertCurrency();
  }
}

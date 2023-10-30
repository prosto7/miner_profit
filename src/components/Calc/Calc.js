import React, { Component } from 'react';
import axios from 'axios';
import './styles.css'; 


class Calculator extends Component {
  constructor(props) {
    super(props);
    const today = new Date().toISOString().split('T')[0]; // Получаем сегодняшнюю дату в формате 'YYYY-MM-DD'
    this.state = {
      numberToMultiply: '',
      commissionPercentage: 5, // Комиссия по умолчанию
      deliveryWeight: '',
      deliveryPricePerKg: '',
      deliveryResult: 0,
      taxNumber: '',
      taxRate: 7,
      taxResult: 0,
      date: today, // Используем текущую дату как начальное значение
      exchangeRate: 0,
      result: 0,
    };
  }

  handleNumberToMultiplyChange = (event) => {
    this.setState({ numberToMultiply: event.target.value });
  }

  handleCommissionPercentageChange = (event) => {
    this.setState({ commissionPercentage: event.target.value });
  }

  handleDeliveryWeightChange = (event) => {
    this.setState({ deliveryWeight: event.target.value });
  }

  handleDeliveryPricePerKgChange = (event) => {
    this.setState({ deliveryPricePerKg: event.target.value });
  }

  handleTaxNumberChange = (event) => {
    this.setState({ taxNumber: event.target.value });
  }

  handleTaxRateChange = (event) => {
    this.setState({ taxRate: event.target.value });
  }

  handleDateChange = (event) => {
    this.setState({ date: event.target.value });
  }

  fetchExchangeRate = () => {
    const { date } = this.state;
    const apiKey = 'M7o2QOZ9O7MzM9YiWZ4w33sVhNtCdRM6'; // Вставьте свой API ключ
    axios.get(`https://api.apilayer.com/fixer/${date}?symbols=RUB&base=USD`, {
      headers: {
        'apikey': apiKey,
      }
    })
      .then((response) => {
        const exchangeRate = response.data.rates.RUB;
        this.setState({ exchangeRate });
      })
      .catch((error) => {
        console.error('Ошибка при получении курса:', error);
      });
  }

  calculateResult = () => {
    const { numberToMultiply, exchangeRate, commissionPercentage } = this.state;
    const resultBeforeCommission = parseFloat(numberToMultiply) * exchangeRate;
    const commission = (resultBeforeCommission * commissionPercentage) / 100;
    const result = (resultBeforeCommission + commission).toFixed(2); // Ограничиваем до 2 знаков после запятой
    this.setState({ result });
  }

  calculateDeliveryResult = () => {
    const { deliveryWeight, deliveryPricePerKg, exchangeRate } = this.state;
    const deliveryResult = (parseFloat(deliveryWeight) * parseFloat(deliveryPricePerKg)) * exchangeRate;
    this.setState({ deliveryResult: deliveryResult.toFixed(2) }); // Ограничиваем до 2 знаков после запятой
  }

  calculateTaxResult = () => {
    const { taxNumber, taxRate } = this.state;
    const taxResult = (parseFloat(taxNumber) * (parseFloat(taxRate)/100)).toFixed(2); // Ограничиваем до 2 знаков после запятой
    this.setState({ taxResult });
  }

  render() {
    const totalResult = parseFloat(this.state.result) + parseFloat(this.state.deliveryResult) + parseFloat(this.state.taxResult);
    const totalResultStyle = {
      fontWeight: 'bold', // Жирный шрифт
      fontSize: '24px', // Крупный шрифт
    };
    return (
      <div>
        <h1>Калькулятор</h1>
     
        <div>
          <label>Введите число для умножения:</label>
          <input
            type="number"
            placeholder="Введите число"
            value={this.state.numberToMultiply}
            onChange={this.handleNumberToMultiplyChange}
          />
        </div>
        <div>
          <label>Комиссия (%):</label>
          <input
            type="number"
            placeholder="Введите комиссию в %"
            value={this.state.commissionPercentage}
            onChange={this.handleCommissionPercentageChange}
          />
        </div>
        <div>
          <label>Выберите дату:</label>
          <input
            type="date"
            value={this.state.date}
            onChange={this.handleDateChange}
          />
        </div>
        <button className='gradient-button' onClick={this.fetchExchangeRate}>Получить курс</button>
        <p>Курс доллара на выбранную дату: {this.state.exchangeRate} RUB</p>
        <button  onClick={this.calculateResult}>Вычислить</button>
        <p>Результат: {this.state.result} RUB</p>

        <h2>Доставка</h2>
        <div>
          <label>Вес (кг):</label>
          <input
            type="number"
            placeholder="Введите вес"
            value={this.state.deliveryWeight}
            onChange={this.handleDeliveryWeightChange}
          />
        </div>
        <div>
          <label>Цена за кг ($):</label>
          <input
            type="number"
            placeholder="Введите цену за кг"
            value={this.state.deliveryPricePerKg}
            onChange={this.handleDeliveryPricePerKgChange}
          />
        </div>
        <button className='gradient-button'onClick={this.calculateDeliveryResult}>Вычислить доставку</button>
        <p>Сумма доставки: {this.state.deliveryResult} RUB</p>

        <h2>Расчет Налога</h2>
        <div>
          <label>Число:</label>
          <input
            type="number"
            placeholder="Введите число"
            value={this.state.taxNumber}
            onChange={this.handleTaxNumberChange}
          />
        </div>
        <div>
          <label>Процент (%):</label>
          <input
            type="number"
            placeholder="Введите процент"
            value={this.state.taxRate}
            onChange={this.handleTaxRateChange}
          />
        </div>
        <button className='gradient-button' onClick={this.calculateTaxResult}>Вычислить налог</button>
        <p>Результат налога: {this.state.taxResult}</p>
        <div style={totalResultStyle}>
          Сумма результатов: {totalResult.toFixed(2)} RUB
        </div>
      </div>
      
    );
  }
}

export default Calculator;

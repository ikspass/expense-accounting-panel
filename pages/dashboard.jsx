import MainContainer from "../components/mainContainer";
import { useState } from 'react'

const Dashboard = () => {
  function formatDate(date) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(date);
    
    const monthNames = {
      'янв.': 'янв.',
      'фев.': 'фев.',
      'мар.': 'мар.',
      'апр.': 'апр.',
      'май.': 'май.',
      'июн.': 'июн.',
      'июл.': 'июл.',
      'авг.': 'авг.',
      'сен.': 'сен.',
      'окт.': 'окт.',
      'ноя.': 'ноя.',
      'дек.': 'дек.'
    };
  
    return formattedDate.replace(/([а-я]{3}\.)/, (match) => monthNames[match]);
  }

  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
  const [username, setUsername ] = useState('Polina')
  const [expenses, setExpenses ] = useState(3)
  const [limit, setLimit ] = useState(2)


  return (
    <MainContainer>
      <h1>Главная панель</h1>
      <p>{username}</p>
      <p>{currentDate}</p>
      <p>Сумма расходов за текущий месяц: {expenses} BYN</p>
      <p>Лимит расходов: {limit ? limit + ' BYN' : 'Не установлено'}</p>
      <p>Остаток бюджета в текущем месяце: {limit ? (limit - expenses > 0 ? limit - expenses : 0 ) + ' BYN' : 'Безлимит'} </p>
      {
        limit && expenses > limit &&
        <p className='danger-text'>Вы превысили бюджет!</p>
      }
    </MainContainer>
  )
}

export default Dashboard
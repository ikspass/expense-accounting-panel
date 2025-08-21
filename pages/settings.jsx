import MainContainer from "../components/mainContainer";
import { useState, useEffect } from 'react';
import { getCategories } from "../utils/api";


const Settings = () => {
  const [limit, setLimit] = useState(0);
  const [budget, setBudget] = useState(0)

  const saveSettings = () => {
    alert('Изменения сохранены')
  }

  return (
    <MainContainer>
      <h1>Настройки лимита</h1>
      <p>Лимит</p>
      <input value={limit} onChange={e => setLimit(e.target.value)} type="text" />
      <p>Бюджет</p>
      <input value={budget} onChange={e => setBudget(e.target.value)} type="text" />
      <button onClick={saveSettings}>Ок</button>
    </MainContainer>
  )
}

export default Settings
import MainContainer from "../components/MainContainer";
import { useState, useEffect } from "react";
import {
  getCategories,
  getLimitByMonth,
  checkLimit,
  setLimit,
} from "../utils/api";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

const Settings = () => {
  const [limitInfo, setLimitInfo] = useState(null);
  const [month, setMonth] = useState(
    new Date().toISOString().split("T")[0].slice(0, 7)
  );
  const [limitValue, setLimitValue] = useState("");
  const [budget, setBudget] = useState(0);

  const [loading, setLoading] = useState(true);

  const saveSettings = async () => {
    alert('Изменения сохранены')
  };

  const saveLimit = async () => {
    try {
      const data = await setLimit({
        limit_month: month,
        limit_amount: limitValue
      })
    } catch (error) {
      console.log(error)
    } finally {
      alert('Лимит установлен')
    }
  }

  const fetchData = async () => {
    try {
      const limitData = await checkLimit();
      setLimitInfo(limitData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <MainContainer>
      <h1>Настройки</h1>
      {limitInfo.has_limit ? (
        <p>Лимит на текущий месяц: {limitInfo.spending.remaining}</p>
      ) : (
        <div>
          <p>Лимит не установлен</p>
          <Input
            value={limitValue}
            onChange={(e) => setLimitValue(e.target.value)}
          />
          <Button onClick={saveLimit}>Установить лимит</Button>
        </div>
      )}      
      <p>Бюджет</p>
      <Input value={budget} onChange={(e) => setBudget(e.target.value)} />
      <Button onClick={saveSettings}>Ок</Button>
    </MainContainer>
  );
};

export default Settings;

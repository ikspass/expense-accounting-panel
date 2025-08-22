import MainContainer from "../components/MainContainer";
import { useState, useEffect } from "react";
import { getCategories } from "../utils/api";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

const Settings = () => {
  const [limit, setLimit] = useState(0);
  const [budget, setBudget] = useState(0);

  const saveSettings = () => {
    alert("Изменения сохранены");
  };

  return (
    <MainContainer>
      <h1>Настройки лимита</h1>
      <p>Лимит</p>
      <Input 
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />
      <p>Бюджет</p>
      <Input
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <Button onClick={saveSettings}>Ок</Button>
    </MainContainer>
  );
};

export default Settings;

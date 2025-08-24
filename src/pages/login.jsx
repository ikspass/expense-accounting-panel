// src/pages/Login.jsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { authAPI } from '../utils/client';
import MainContainer from '../components/MainContainer';
import Link from 'next/link';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({}); // ошибки валидации полей
  const [generalError, setGeneralError] = useState(''); // общая ошибка входа
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибки при изменении
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Также очищаем общую ошибку
    if (generalError) {
      setGeneralError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Имя пользователя обязательно';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setGeneralError(''); // очищаем предыдущую ошибку
    try {
      const response = await authAPI.login({
        username: formData.username,
        password: formData.password
      });
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        // navigate('/dashboard');
        router.push('/dashboard');

      } else {
        setGeneralError('Ошибка: токен не получен');
      }
    } catch (error) {
      console.error("Login failed:", error);
      console.log("Error message:", error.message); // <-- добавь это для отладки
      
      // Всегда показываем одно сообщение
      setGeneralError('Неверный логин или пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainContainer>
      <div className="auth-form">
        <h2>Вход</h2>
        
        {/* Общая ошибка */}
        {generalError && (
          <div className="error-message" style={{
            color: '#e74c3c',
            backgroundColor: '#fdeaea',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #e74c3c',
            marginBottom: '15px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {generalError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Имя пользователя:</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
              placeholder="Введите имя пользователя"
              style={{
                width: '100%',
                padding: '10px',
                border: errors.username ? '1px solid #e74c3c' : '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                marginTop: '5px'
              }}
            />
            {errors.username && <span className="error-text" style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px', display: 'block' }}>{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Введите пароль"
              style={{
                width: '100%',
                padding: '10px',
                border: errors.password ? '1px solid #e74c3c' : '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                marginTop: '5px'
              }}
            />
            {errors.password && <span className="error-text" style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px', display: 'block' }}>{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="submit-btn"
            style={{
              backgroundColor: isLoading ? '#bdc3c7' : '#3498db',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              width: '100%',
              marginTop: '15px',
              transition: 'background-color 0.3s'
            }}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Нет аккаунта? <Link href="/register" style={{ color: '#3498db', textDecoration: 'none' }}>Зарегистрироваться</Link>
        </p>
      </div>
    </MainContainer>
  );
};

export default Login;
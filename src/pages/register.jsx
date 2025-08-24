// src/pages/Register.jsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { authAPI } from '../utils/client';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({}); // ошибки валидации
  const [generalError, setGeneralError] = useState(''); // общие ошибки от API
  const [successMessage, setSuccessMessage] = useState(''); // сообщение об успехе
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибки при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (generalError) {
      setGeneralError('');
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Проверка email
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    
    // Проверка имени пользователя
    if (!formData.username) {
      newErrors.username = 'Имя пользователя обязательно';
    } else if (formData.username.length < 2) {
      newErrors.username = 'Имя должно быть не менее 2 символов';
    }
    
    // Проверка пароля
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }
    
    // Проверка совпадения паролей
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
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
    setGeneralError('');
    setSuccessMessage('');
    
    try {
      // Отправляем только нужные данные (без confirmPassword)
      const { username, email, password } = formData;
      await authAPI.register({ username, email, password });
      
      // Показываем сообщение об успехе
      setSuccessMessage('Регистрация выполнена успешно! Теперь вы можете войти.');
      
      // Автоматически перенаправляем через 2 секунды
      setTimeout(() => {
        // navigate('/login');
        router.push('/login')
      }, 2000);
    } catch (error) {
      console.error("Registration failed:", error);
      
      // Отображаем ошибку от API
      if (error.message) {
        setGeneralError(error.message);
      } else {
        setGeneralError('Ошибка при регистрации. Попробуйте позже.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Регистрация</h2>
      
      {/* Общая ошибка */}
      {generalError && (
        <div className="error-message" style={{
          color: '#e74c3c',
          backgroundColor: '#fdeaea',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #e74c3c',
          marginBottom: '15px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          {generalError}
        </div>
      )}
      
      {/* Сообщение об успехе */}
      {successMessage && (
        <div className="success-message" style={{
          color: '#27ae60',
          backgroundColor: '#e8f5e9',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #27ae60',
          marginBottom: '15px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="example@mail.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

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
          />
          {errors.username && <span className="error-text">{errors.username}</span>}
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
            placeholder="Минимум 6 символов"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Повторите пароль:</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'error' : ''}
            placeholder="Повторите пароль"
          />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="submit-btn"
          style={{
            backgroundColor: '#27ae60',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%',
            marginTop: '10px'
          }}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '15px', color: '#666' }}>
        Уже зарегистрированы? <a href="/login" style={{ color: '#3498db', textDecoration: 'underline' }}>Войти</a>
      </p>
    </div>
  );
};

export default Register;
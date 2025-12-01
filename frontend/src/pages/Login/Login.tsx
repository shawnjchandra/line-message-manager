import { ChangeEvent, FormEvent, useState, useRef, useEffect } from 'react';
import { Container, Card, Form, Button, Spinner} from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import CustomToast from '../../components/CustomToast/CustomToast';
import { CustomToastInterface } from '../../components/CustomToast/CustomToastInterface';
import { useTranslation } from 'react-i18next';
import './Login.scss';
import { authService } from '../../services/auth';
import useAuthStore from '../../stores/authStore';
import { FileService } from '../../services/FileService';
import User from '../../types/User';

interface FormLoginBase {
  email:string;
  password:string;
}

function Login() {
  const history = useHistory();
  const isMounted = useRef(true);
  const { t, i18n} = useTranslation();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [formData, setFormData] = useState<FormLoginBase>({
    email:'',
    password:''
  });
  const [errors, setErrors] = useState<FormLoginBase>({
    email:'',
    password:''
  });
  const [toastConfig, setToastConfig] = useState<CustomToastInterface>({
    type:'',
    message:'',
    title:'',
  });

  const { isAuthenticated, user, login, logout } = useAuthStore();
  

  useEffect(()=>{
    return ()=>{
      isMounted.current = false;
    }
  }, [])

  const handleChange = (e:ChangeEvent<HTMLInputElement>) :void => {
    const {name, value} = e.target; 

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
   
    setLoginError('');
  }

  const validateForm = () : boolean => {
    const newErrors: Partial<FormLoginBase> = {};

    if(!formData.email) {
      newErrors.email = t('login.emailIsRequired');
    } else if (!formData.email.includes('@') || !formData.email.endsWith('.com')  ) {
       newErrors.email = t('login.pleaseUseTheCorrectEmailFormat');
    }

    if(!formData.password) {
      newErrors.password = t('login.passwordIsRequired');
    } 

    setErrors(newErrors as FormLoginBase);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e : FormEvent) : Promise<void> => {
    e.preventDefault();

    if(!validateForm()) {
      setLoginError(t('login.errorPleaseTryAgain'));
      return;
    };

    setIsLoading(true);
    setLoginError('');

    try {
      
      const users = await FileService.load<User[]>('users');

      if (users){
      const user = authService.login(formData.email, formData.password, users);

      if (user) {        
        login(user);
        // alert('Sukses');
        setToastConfig({
          type: 'success',
          message: t('login.successfullyLoggedIn'),
          title: 'Success',
        });
        setShowToast(true);

        setTimeout(()=>{
          history.push('/');

        },1000)
      } else {
        setToastConfig({
          type: 'failed',
          message: t('login.invalidEmailOrPassword'),
          title: 'Error',
        });
        setShowToast(true);

        setTimeout(()=>{
          setIsLoading(false);
        },2000)
      } }

    } catch (error){
      setLoginError(t('login.errorLogin'));
      setToastConfig({
          type: 'failed',
          message: t('login.failedToLogIn'),
          title: 'Error',
        });
      setShowToast(true)
    } finally {
      if (isMounted.current) {
        
        setIsLoading(false);
      }
    }
  } 

  return (
    <Container className="login-page">
      <Card className="login-card">
        <Card.Body>
          <Card.Header>
            <Card.Img src="/imgs/FARS_logo.png"/>

          </Card.Header>
          <h2>{t('login.login')}</h2>
          <Form>
            <Form.Group>
              <Form.Label>{t('login.email')}</Form.Label>
              <Form.Control 
              type="email" 
              name='email'
              value={formData.email} 
              onChange={handleChange}
              placeholder={t('login.enterYourEmail')}
              disabled={isLoading}
              id='formEmail'
              />
              { errors.email && (
                <Form.Text
                className='error'
                >
                  {errors.email}
                </Form.Text>
               )}
            
            </Form.Group>
            <Form.Group>
              <Form.Label>{t('login.password')}</Form.Label>
              <Form.Control 
              type="password"
              name='password'
              value={formData.password} 
              onChange={handleChange}
              placeholder={t('login.enterYourPassword')}
              disabled={isLoading}
              id='formPassword'
               />
               { errors.password && (
                <Form.Text
                className='error'
                >
                  {errors.password}
                </Form.Text>
               )}
               
            </Form.Group>
            {/* {loginError && (
              <Form.Text 
              role='alert'
              className='error'>
                {loginError}
              </Form.Text>
            )} */}
            <Button 
            variant="primary" 
            type="submit" 
            className="w-100" onClick={handleSubmit}
            disabled={isLoading}
            >
              {isLoading? 
                <Spinner animation={'border'}/>
                 : t('login.login')}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <CustomToast
        show={showToast}
        onClose={()=>setShowToast(false)}
        message={toastConfig.message}
        title={toastConfig.title}
      />
    </Container>
  );
}

export default Login;
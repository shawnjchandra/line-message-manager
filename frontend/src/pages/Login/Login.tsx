import { ChangeEvent, FormEvent, useState, useRef, useEffect } from 'react';
import { Container, Card, Form, Button, Spinner} from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import CustomToast from '../../components/CustomToast/CustomToast';
import { CustomToastInterface } from '../../components/CustomToast/CustomToastInterface';
import { useTranslation } from 'react-i18next';
import './Login.scss';

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
      newErrors.email = t('login.requiredEmail');
    } else if (!formData.email.includes('@') || !formData.email.endsWith('.com')  ) {
       newErrors.email = t('login.formatEmail');
    }

    if(!formData.password) {
      newErrors.password = t('login.requiredPassword');
    } 

    setErrors(newErrors as FormLoginBase);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e : FormEvent) : Promise<void> => {
    e.preventDefault();

    if(!validateForm()) {
      setLoginError(t('login.errorLogin'));
      return;
    };

    setIsLoading(true);
    setLoginError('');

    try {
      const response = await fetch('/data/users.json');
      const users = await response.json();

      const user = users.find(
        (u: any) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        localStorage.setItem('user',JSON.stringify({ 
          // id: user.id,
          email: user.email,
        }
        ));

        console.log('Login: ',user)
        // alert('Sukses');
        setToastConfig({
          type: 'success',
          message: t('login.success'),
          title: 'Success',
        });
        setShowToast(true);

        setTimeout(()=>{
          history.push('/');

        },3000)
      } else {
        setToastConfig({
          type: 'failed',
          message: t('login.failure'),
          title: 'Error',
        });
        setShowToast(true);

        setTimeout(()=>{
          setIsLoading(false);
        },2000)
      } 

    } catch (error){
      setLoginError(t('login.errorLogin'));
      setToastConfig({
          type: 'failed',
          message: t('login.failure'),
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
          <h2>{t('login.title')}</h2>
          <Form>
            <Form.Group  controlId='formEmail'>
              <Form.Label>{t('login.email')}</Form.Label>
              <Form.Control 
              type="email" 
              name='email'
              value={formData.email} 
              onChange={handleChange}
              placeholder={t('login.inputEmail')}
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
            <Form.Group controlId='formPassword'>
              <Form.Label>{t('login.password')}</Form.Label>
              <Form.Control 
              type="password"
              name='password'
              value={formData.password} 
              onChange={handleChange}
              placeholder={t('login.inputPassword')}
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
                 : 'Login'}
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
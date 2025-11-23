import { ChangeEvent, FormEvent, useState, useRef, useEffect } from 'react';
import { Container, Card, Form, Button, Spinner} from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import CustomToast from '../../components/CustomToast/CustomToast';
import { CustomToastInterface } from '../../components/CustomToast/CustomToastInterface';
import { useTranslation } from 'react-i18next';
import './Register.scss';
import User from '../../types/User';
import { authService } from '../../services/auth';

interface FormRegisterBase {
  email:string;
  password:string;
  confirmPassword: string;
}



function Register(){
  const history = useHistory();
  const isMounted = useRef(true);
  const { t, i18n} = useTranslation();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string>('');
  const [formData, setFormData] = useState<FormRegisterBase>({
    email:'',
    password:'',
    confirmPassword:'',
  });

  const [errors, setErrors] = useState<FormRegisterBase>({
    email:'',
    password:'',
    confirmPassword:''
  })
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
  
  const handleChange = (e:ChangeEvent<HTMLInputElement>) : void => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    setRegisterError('');
  }

  const validateForm = () : boolean => {
    const newErrors: Partial<FormRegisterBase> = {};
  
    if(!formData.email) {
      newErrors.email = t('register.emailIsRequired');
    } else if (!formData.email.includes('@') || !formData.email.endsWith('.com')  ) {
       newErrors.email = t('register.pleaseUseTheCorrectEmailFormat');
    }
  
    if(!formData.password) {
      newErrors.password = t('register.passwordIsRequired');
    } else if (formData.password.length < 6 ) {
      newErrors.password = t('register.passwordLength');
    }

    if(!formData.confirmPassword) {
      newErrors.confirmPassword = t('register.passwordIsRequired');
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = t('register.passwordMismatch');
    }


    setErrors(newErrors as FormRegisterBase);
    
    console.log(newErrors)
    return Object.keys(newErrors).length 
    === 0;
  }

  const handleSubmit = async (e: FormEvent) : Promise<void> => {
    e.preventDefault();

    const valid = validateForm();

    if(!valid) {
      setRegisterError(t('register.errorPleaseTryAgain'));
      return;
    } 

    
    setIsLoading(true);
    setRegisterError('');

    try {
      const response = await fetch('/data/users.json');
      const users: User[] = await response.json();

      const userExists = users.find(
        (u: any) => u.email === formData.email
      );
      
      if(userExists)  {
        setRegisterError(t('register.registerError'));
        setIsLoading(false);
      } else {
          
          authService.register(users, formData.email, formData.password);
          
          setToastConfig({
          type: 'success',
          message: t('register.sucessfullyRegistered'),
          title: 'Success',
        });
          setShowToast(true);
            setTimeout(()=>{
            history.push('/login');
  
          },3000)
        }
    } catch (error) {
        setRegisterError(t('register.somethingWentWrong'))
              setToastConfig({
          type: 'failed',
          message:t('register.failedToRegister'),
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
    <Container className="register-page">
      <Card className="register-card">
        <Card.Body>
          <Card.Header>
            <Card.Img src="/imgs/FARS_logo.png"/>

          </Card.Header>
          <h2>{t('register.register')}</h2>
          <Form>
            <Form.Group >
              <Form.Label>{t('register.email')}</Form.Label>
              <Form.Control 
              type="email" 
              name='email'
              value={formData.email} 
              onChange={handleChange}
              placeholder={t('register.enterYourEmail')}
              disabled={isLoading}
              // id='formEmail'
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
              <Form.Label>{t('register.password')}</Form.Label>
              <Form.Control 
              type="password"
              name='password'
              value={formData.password} 
              onChange={handleChange}
              placeholder={t('register.enterYourPassword')}
              disabled={isLoading}
              // id='formPassword'
               />
               { errors.password && (
                <Form.Text
                className='error'
                >
                  {errors.password}
                </Form.Text>
               )}
               
            </Form.Group>
            <Form.Group
            >
              <Form.Label>{t('register.confirmPassword')}</Form.Label>
               <Form.Control
                type="password"
                name='confirmPassword'
                onChange={handleChange}
                placeholder={t('register.reenterYourPassword')}
                disabled={isLoading}
                // id='formConfirmPassword'
                >
               </Form.Control>
                  { errors.confirmPassword && (
                <Form.Text
                className='error'
                >
                  {errors.confirmPassword}
                </Form.Text>
               )}
            </Form.Group>
            {/* {registerError && (
              <Form.Text 
              role='alert'
              className='error'>
                {registerError}
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
                 : t('register.register')}
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
    )
}

export default Register;
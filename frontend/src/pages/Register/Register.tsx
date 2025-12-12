import { ChangeEvent, FormEvent, useState, useRef, useEffect } from 'react';
import { Container, Card, Form, Button, Spinner} from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import CustomToast from '../../components/CustomToast/CustomToast';
import { CustomToastInterface } from '../../components/CustomToast/CustomToastInterface';
import { useTranslation } from 'react-i18next';
import './Register.scss';
import User from '../../types/User';
import { authService } from '../../services/auth';
import { FileService } from '../../services/FileService';
import useToastStore from '../../stores/toastStore';

interface FormRegisterBase {
  username: string;
  email:string;
  password:string;
  confirmPassword: string;
}


function Register(){
  const history = useHistory();
  const isMounted = useRef(true);
  const { t, i18n} = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string>('');
   const showToast = useToastStore((state) => state.showToast);  

  const [formData, setFormData] = useState<FormRegisterBase>({
    username: '',
    email:'',
    password:'',
    confirmPassword:'',
  });

  const [errors, setErrors] = useState<FormRegisterBase>({
    username: '',
    email:'',
    password:'',
    confirmPassword:''
  })
  
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
  
    if(!formData.username) {
      newErrors.username = t('register.usernameIsRequired');
    } else if (formData.username.length < 3 ) {
      newErrors.username = t('register.usernameLength');
    }

    if(!formData.email) {
      newErrors.email = t('register.emailIsRequired');
    } else if (!formData.email.includes('@') || (!formData.email.endsWith('unpar.ac.id') && !formData.email.endsWith('.com')) ) {
       newErrors.email = t('register.pleaseUseTheCorrectEmailFormat');
    }
    console.log((!formData.email.includes('@') || !formData.email.endsWith('unpar.ac.id')));
  
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
      const users = await FileService.load<User[]>('users');
      const userList = users ?? [];
      const userExists = userList.find(
        (u: any) => u.email === formData.email
      );
      
      if(userExists)  {
        setRegisterError(t('register.registerError'));
        showToast({
            type: 'failed',
            message: t('register.registerError'),
            title: 'Email has been used',
        });
        setIsLoading(false);
      } else {
          
          await authService.register(
            userList,
            formData.email,
            formData.password,
            formData.username.trim()
          );
          
          showToast({
            type: 'success',
            message: t('register.successfullyRegistered'),
            title: 'Success',
        });

        setTimeout(()=>{
          history.push('/login');

        },2000)
       
        }
    } catch (error) {
        setRegisterError(t('register.somethingWentWrong'));

        showToast({
          type: 'failed',
          message:t('register.failedToRegister'),
          title: 'Error',
        });
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
              <Form.Label>{t('register.username')}</Form.Label>
              <Form.Control 
              type="text" 
              name='username'
              value={formData.username} 
              onChange={handleChange}
              placeholder={t('register.enterYourUsername')}
              disabled={isLoading}
              />
              { errors.username && (
                <Form.Text
                className='error'
                >
                  {errors.username}
                </Form.Text>
               )}
            
            </Form.Group>
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

    </Container>
    )
}

export default Register;
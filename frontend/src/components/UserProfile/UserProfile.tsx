import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import useAuthStore from '../../stores/authStore';
import './UserProfile.scss'
import UserProfileProps from '../../types/UserProfileProps';
import { AccountManagement } from '../../services/accountManagement';
import { FileService } from '../../services/FileService';
import User from '../../types/User';
import { t } from 'i18next';

const UserProfile: React.FC<UserProfileProps> = ({ show , onHide }) => {
  const { user, login } = useAuthStore();
    
  const [showPassModal, setShowPassModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState(user?.username ?? "");
  
  const togglePass = () => setShowPassModal(!showPassModal);
  const toggleDelete = () => setShowDeleteModal(!showDeleteModal);
  const openUsernameModal = () => {
    setNewUsername(user?.username ?? "");
    setUsernameError("");
    setShowUsernameModal(true);
  };
  const closeUsernameModal = () => {
    setUsernameError("");
    setShowUsernameModal(false);
  };

  const [passwordError ,setPasswordError] = useState("");
  const [usernameError ,setUsernameError] = useState("");

  const submitChange = async (e:FormEvent) => {
    e.preventDefault();

    try {

      const users = await FileService.load<User[]>('users');
      
      if (users){
        if (!await AccountManagement.changePassword(users, newPassword)) {
          setPasswordError("Something went wrong")
        } else {
          togglePass()
          setNewPassword("");
        }       
     }
      

    } catch (error) {
      
    }
  }

  const checkIsValid = (pwd: string): boolean => {
    return pwd.length >= 6;
  };
  const checkUsernameValid = (name: string): boolean => {
    return name.trim().length >= 3;
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    if(value.length > 70) return;

    setNewPassword(value); 

    if (!checkIsValid(value)) {
       setPasswordError("Format Error: Password must be 6+ chars");
      
    } else {
       setPasswordError(""); // Clear error if valid
    }
  };
  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 30) return;
    setNewUsername(value);

    if (!checkUsernameValid(value)) {
       setUsernameError("Username must be at least 3 characters");
    } else {
       setUsernameError("");
    }
  };

  const submitDelete = async (e : FormEvent) => {
      e.preventDefault();

    try {
      const users = await FileService.load<User[]>('users');     
      
      if(users){
        await AccountManagement.deleteAccount(users);
      }
    } catch (error) {
      
    }
  }

  const submitUsernameChange = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newUsername.trim();

    if (!checkUsernameValid(trimmed)) {
      setUsernameError("Username must be at least 3 characters");
      return;
    }

    try {
      const users = await FileService.load<User[]>('users');

      if (!users) {
        setUsernameError("Failed to load users");
        return;
      }

      const updatedUser = await AccountManagement.changeUsername(users, trimmed);
      if (!updatedUser) {
        setUsernameError("Failed to update username");
        return;
      }

      login(updatedUser);
      closeUsernameModal();
    } catch (error) {
      setUsernameError("Something went wrong");
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="lg" className="user-profile-modal">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-secondary">{t('userProfile.account')}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="p-5">
          <div className="d-flex align-items-center mb-5">
            <div className="avatar-circle">
              <i className="bi bi-person-fill"></i>
            </div>

            <div className="user-info ms-4">
              <h5 className="section-title">{t('userProfile.profile')}</h5>
              <p className="user-email mb-1">: {user?.username || '-'}</p>
              <button className="btn-link-action" onClick={openUsernameModal}>
                {t('userProfile.changeUsername')}
              </button>
              <hr className="profile-divider" />
              <p className="user-email mb-1">{t('login.email')}: {user?.email}</p>
              <p>{t('login.password')}: <span className="password-mask">******</span></p>
              
              <button className="btn-link-action" onClick={togglePass}>
                {t('userProfile.changePassword')}
              </button>
            </div>
          </div>

          <hr className="profile-divider" />

          <div className="mt-4">
            <h5 className="section-title">{t('userProfile.accountManagement')}</h5>
            <button className="btn-link-action text-danger" onClick={toggleDelete}>
              {t('userProfile.deleteAccount')}
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showPassModal} onHide={togglePass} centered style={{ zIndex: 1060 }}>
        <Modal.Header>
          <Modal.Title>{t('userProfile.changePassword')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>{t('userProfile.newPassword')}</Form.Label>
              <div className="d-flex align-items-center justify-content-between">
                 <Form.Control 
                  type="password" 
                  placeholder="Enter new password"
                  onChange={handleChangePassword}
                  value={newPassword}
                  name='newPassword'
                 />
                 <span className="text-muted ms-2 small">{newPassword.length }/70</span>
              </div>
            </Form.Group>
            { passwordError ? 
              <span>
                {passwordError}
            </span>
            : <></> }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
          variant="light"
          onClick={togglePass}>{t('userProfile.cancel')}</Button>
          <Button variant="dark" onClick={submitChange}>{t('userProfile.save')}</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUsernameModal} onHide={closeUsernameModal} centered style={{ zIndex: 1060 }}>
        <Modal.Header>
          <Modal.Title>{t('userProfile.changeUsername')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitUsernameChange}>
            <Form.Group>
              <Form.Label>{t('userProfile.newUsername')}</Form.Label>
              <div className="d-flex align-items-center justify-content-between">
                <Form.Control
                  type="text"
                  placeholder="Enter new username"
                  value={newUsername}
                  onChange={handleChangeUsername}
                />
                <span className="text-muted ms-2 small">{newUsername.length}/30</span>
              </div>
            </Form.Group>
            { usernameError ? 
              <span>
                {usernameError}
            </span>
            : <></> }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={closeUsernameModal}>{t('userProfile.cancel')}</Button>
          <Button variant="dark" onClick={submitUsernameChange}>{t('userProfile.save')}</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={toggleDelete} centered style={{ zIndex: 1060 }}>
        <Modal.Header>
          <Modal.Title>{t('userProfile.deleteAccount')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            {t('userProfile.areYouSure')}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
          variant="light"
          onClick={toggleDelete}>{t('userProfile.cancel')}</Button>
          <Button 
          variant="dark"
          onClick={submitDelete}
          >{t('userProfile.deleteAccount')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserProfile;
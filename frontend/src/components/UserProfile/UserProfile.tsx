import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import useAuthStore from '../../stores/authStore';
import './UserProfile.scss'
import UserProfileProps from '../../types/UserProfileProps';
import { AccountManagement } from '../../services/accountManagement';
import { FileService } from '../../services/FileService';
import User from '../../types/User';

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
          <Modal.Title className="fw-bold text-secondary">Account</Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="p-5">
          <div className="d-flex align-items-center mb-5">
            <div className="avatar-circle">
              <i className="bi bi-person-fill"></i>
            </div>

            <div className="user-info ms-4">
              <h5 className="section-title">Profile</h5>
              <p className="user-email mb-1">Username: {user?.username || '-'}</p>
              <button className="btn-link-action" onClick={openUsernameModal}>
                Change username
              </button>
              <hr className="profile-divider" />
              <p className="user-email mb-1">{user?.email}</p>
              <div className="password-mask">******</div>
              <button className="btn-link-action" onClick={togglePass}>
                Change password
              </button>
            </div>
          </div>

          <hr className="profile-divider" />

          <div className="mt-4">
            <h5 className="section-title">Account Management</h5>
            <button className="btn-link-action text-danger" onClick={toggleDelete}>
              Delete Account
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showPassModal} onHide={togglePass} centered style={{ zIndex: 1060 }}>
        <Modal.Header closeButton>
          <Modal.Title>Change password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>New password</Form.Label>
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
          <Button variant="dark" onClick={submitChange}>Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUsernameModal} onHide={closeUsernameModal} centered style={{ zIndex: 1060 }}>
        <Modal.Header closeButton>
          <Modal.Title>Change username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitUsernameChange}>
            <Form.Group>
              <Form.Label>New username</Form.Label>
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
          <Button variant="light" onClick={closeUsernameModal}>Cancel</Button>
          <Button variant="dark" onClick={submitUsernameChange}>Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={toggleDelete} centered style={{ zIndex: 1060 }}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            Are you sure want to delete your account? This cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
          variant="light" 
          onClick={toggleDelete}>Cancel</Button>
          <Button 
          variant="danger"
          onClick={submitDelete}
          >Delete Account</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserProfile;
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import useAuthStore from '../../stores/authStore';
import './UserProfile.scss'
import UserProfileProps from '../../types/UserProfileProps';
import { AccountManagement } from '../../services/accountManagement';
import { FileService } from '../../services/FileService';
import User from '../../types/User';

const UserProfile: React.FC<UserProfileProps> = ({ show , onHide }) => {
  const { user } = useAuthStore();
    
  const [showPassModal, setShowPassModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const togglePass = () => setShowPassModal(!showPassModal);
  const toggleDelete = () => setShowDeleteModal(!showDeleteModal);

  const [passwordError ,setPasswordError] = useState("");

  const submitChange = async (e:FormEvent) => {
    e.preventDefault();

    try {

      const users = await FileService.load<User[]>('users.json');
      
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

  const submitDelete = async (e : FormEvent) => {
      e.preventDefault();

    try {
      const users = await FileService.load<User[]>('users.json');     
      
      if(users){
        AccountManagement.deleteAccount(users);

      }
    } catch (error) {
      
    }
  }

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
              <h5 className="section-title">Email & Password</h5>
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
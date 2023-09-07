import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export function ChangePasswordModal({show, handleClose}) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Current password</Form.Label>
                    <Form.Control type="text" placeholder="Enter password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="new-password">
                    <Form.Label>New password</Form.Label>
                    <Form.Control type="text" placeholder="Enter new password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="new-cpassword">
                    <Form.Label>Confirm new password</Form.Label>
                    <Form.Control type="text" placeholder="Enter confirm password" />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Change Password
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
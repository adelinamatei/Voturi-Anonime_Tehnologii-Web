import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap'
import ApiRequestHandler from '../entities/ApiRequestHelper';

export default function SignUp({ useAuthHandler })
{
  const authHandler = useAuthHandler();
  const requestHandler = new ApiRequestHandler();
  const [userData, setUserData] = useState({
    username: '', 
    name: '',
    surname: '',
    email: '',
    password: '',
    is_professor: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleChange = e => {
    let currentData = { ...userData };
    if(e.target.type === 'checkbox')
    {
      currentData[e.target.name] = e.target.checked;
    }
    else
    {
      currentData[e.target.name] = e.target.value;
    }
    setUserData(currentData);
  };
  const signUp = async () => {
    const user = { ...userData };
    user.is_professor = user.is_professor ? 1 : 0;

    requestHandler.post('/users', { body: user }, resp => {
      if(resp.status === 200)
      {
        setSuccess(resp.message);
      }
      else
      {
        setError(resp.message);
      }
    });
  };

  return (
    <div>
      {authHandler.isAuthenticated()
      ? (<Redirect to="/" />)
      : (<div>
        <Modal isOpen={success.length > 0} toggle={() => setSuccess('')}>
          <ModalHeader>Cont creat.</ModalHeader>
          
          <ModalBody>
            <Alert color="success">{success} Va rugam sa va autentificati cu noul cont.</Alert>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => setSuccess('')}>Ok</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={error.length > 0} toggle={() => setError('')}>
          <ModalHeader>Eroare la autentificare.</ModalHeader>
          
          <ModalBody>
            <Alert color="danger">{error}</Alert>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => setError('')}>Ok</Button>
          </ModalFooter>
        </Modal>

        <Container className="py-2">
          <Row>
            <Col md="4" className="mx-auto">
              <Card>
                <CardBody>
                  <CardTitle>Creati cont pentru Note Anonime</CardTitle>
                  <Form onSubmit={e => e.preventDefault()} method="POST" className="text-left">
                    <FormGroup>
                      <Label for="username">Utilizator</Label>
                      <Input id="username" name="username" type="text" placeholder="Insereaza nume utilizator" value={userData.username} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="surname">Prenume</Label>
                      <Input id="surname" name="surname" type="text" placeholder="Insereaza prenume" value={userData.surname} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">Nume</Label>
                      <Input id="name" name="name" type="text" placeholder="Insereaza nume" value={userData.name} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Parola</Label>
                      <Input id="password" name="password" type="password" placeholder="Insereaza parola" value={userData.password} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input id="is_professor" type="checkbox" name="is_professor" checked={userData.is_professor} onChange={handleChange} />{' '}
                        Cont profesor.
                      </Label>
                    </FormGroup>

                    <Button style={{ backgroundColor: '#33FFA5' , color: 'black'}} onClick={signUp} className="w-100 text-center">Creati cont</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>)}
    </div>
  );
}

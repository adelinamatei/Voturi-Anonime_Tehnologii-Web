import React, { useState, useEffect } from 'react';
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Container,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ApiRequestHandler from '../entities/ApiRequestHelper';

export default function UsersTable({ useAuthHandler, onlyStudents, onlyProfessors }) {
    const authHandler = useAuthHandler();
    const [users, setUsers] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const deleteUser = async id => {
        const requestHandler = new ApiRequestHandler();
        await requestHandler.delete(`/users/${id}`, {
            headers: authHandler.getAuthorizationHeader()
        }, resp => resp.status === 204 ? setSuccess(`Utilizator scos cu succes`) : setError('Nu s-a putut inlatura utilizatorul. Va rugam incercati mai tarziu'));
    };

    const renderRemoveButton = id =>
    {
        if(!onlyProfessors && currentUser && currentUser.is_professor)
        {
            return (<th><Button size="xs" color="danger" onClick={async () => await deleteUser(id)}>Scoateti</Button></th>);
        }

        return null;
    }
    const renderRemoveButtonHeader = _ =>
    {
        if(!onlyProfessors && currentUser && currentUser.is_professor)
        {
            return (<th></th>);
        }

        return null;
    }

    const renderUsers = () => {
        return (
                <Card>
                    <CardHeader>
                        <CardTitle tag="h3">{onlyStudents ? 'Studenti inregistrati' : (onlyProfessors ? 'Profesori inregistrati' : 'Utilizatori') }</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table responsive striped hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Utilizator</th>
                                    <th>Prenume</th>
                                    <th>Nume</th>
                                    { renderRemoveButtonHeader() }
                                </tr>
                            </thead>
                            <tbody>
                                { users && users.map((j, i) =>
                                    <tr key={j.id}>
                                        <th scope="row">{i + 1}</th>
                                        <th><Link to={`/user/${j.username}`}>{j.username}</Link></th>
                                        <th>{j.surname}</th>
                                        <th>{j.name}</th>
                                        { renderRemoveButton(j.id) }
                                    </tr>)
                                }
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
        )
    };

    useEffect(() => {
        const requestHandler = new ApiRequestHandler();
        (async () => {
            await requestHandler.get('/users', {
                query: `?username=${authHandler.getUsername()}`,
                headers: authHandler.getAuthorizationHeader()
            }, resp => resp.status === 200 && setCurrentUser(resp[0]));

            await requestHandler.get('/users', {
                query: `?is_professor=${onlyStudents ? 0 : (onlyProfessors ? 1 : 0)}`,
                headers: authHandler.getAuthorizationHeader()
            }, async resp => {
                let stdnts = [];
                for (let i = 0; i < Object.keys(resp).length - 1; i++) {
                    stdnts.push(resp[i])
                }
                setUsers(stdnts)
            });
        })();
    }, [authHandler, onlyStudents, onlyProfessors]);

    return (
        <Container>
            <Modal isOpen={success.length > 0} toggle={() => setSuccess('')}>
                <ModalHeader>Cont creat.</ModalHeader>
                
                <ModalBody>
                <Alert color="success">{success}</Alert>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={() => { window.location.reload(); setSuccess(''); }}>Ok</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={error.length > 0} toggle={() => setError('')}>
                <ModalHeader>Eroare</ModalHeader>
                <ModalBody>
                    <Alert color="danger">Nu s-a gasit utilizator{error}</Alert>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => setError('')}>Ok</Button>
                </ModalFooter>
            </Modal>
            { renderUsers() }
        </Container>
    )
}

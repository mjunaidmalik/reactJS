import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

interface NavBarProps {
  goBack?: () => void;
  title: string;
  openForm?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ goBack, title, openForm }) => {
  return (
    <Container fluid className="py-2 mt-1 mb-1">
      <Row className="align-items-center">
        <Col xs="auto">
          {goBack && <Button onClick={goBack} variant="secondary">{`< Go Back`}</Button>}
        </Col>
        <Col xs="auto" className="flex-grow-1 text-center">
          <h2 className="m-0">{title}</h2>
        </Col>
        <Col xs="auto">
          {openForm && <Button onClick={openForm} variant="primary">{`+ Add Item`}</Button>}
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;

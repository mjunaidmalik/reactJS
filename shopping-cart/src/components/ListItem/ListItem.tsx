import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

interface ListItemProps {
  data: {
    title: string;
    quantity: string;
    price: string;
  };
}

const ListItem: React.FC<ListItemProps> = ({ data }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={7}>
            <Card.Title>{data.title}</Card.Title>
          </Col>
          <Col xs={3} className="text-right">
            <Card.Text>{`Quantity: ${data.quantity}`}</Card.Text>
          </Col>
          <Col xs={2} className="text-right">
            <Card.Text>{`$ ${data.price}`}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ListItem;

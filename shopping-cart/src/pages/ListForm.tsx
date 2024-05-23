import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button, Card, CardHeader, Row, Col, CardBody } from 'react-bootstrap';
import ItemsContext from '../context/ItemsContext';
import FormItem from '../components/FormItem/FormItem';
import NavBar from '../components/NavBar/NavBar';

const ListForm: React.FC = () => {
  const navigate = useNavigate();
  const { listId } = useParams<{ listId: string }>();

  const [title, setTitle] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const { addItem } = useContext(ItemsContext);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (title && quantity && price) {
      addItem({
        title,
        quantity,
        price,
        listId: parseInt(listId || '') || 0, // Use an empty string as a fallback
      });
    }

    navigate(`/list/${listId}`);
  };

  return (
    <>
      <NavBar goBack={() => navigate(-1)} title="Add Item" />

      <Card>
        <CardBody>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insert title"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.currentTarget.value)}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.currentTarget.value)}
              />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="mt-3">
              Add Item
            </Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default ListForm;

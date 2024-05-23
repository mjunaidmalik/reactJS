import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, ListGroup, Spinner, Alert } from 'react-bootstrap';
import ListsContext from '../context/ListsContext';
import NavBar from '../components/NavBar/NavBar';

interface List {
  id: number;
  title: string;
}

const Lists: React.FC = () => {
  let navigate = useNavigate();

  const { loading, error, lists, fetchLists } = useContext(ListsContext);

  useEffect(() => {
    if (!lists.length) {
      fetchLists();
    }
  }, [fetchLists, lists]);

  return (
      <main>
      <NavBar title='Your Lists' />
        {loading || error ? (
          <Alert variant="danger">{error || 'Loading...'}</Alert>
        ) : (
          <ListGroup>
            {lists.map((list: List) => (
              <ListGroup.Item key={list.id}>
                <Link to={`list/${list.id}`} className="text-decoration-none">
                  <h3>{list.title}</h3>
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </main>
  );
};

export default Lists;

import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';
import ItemsContext from '../context/ItemsContext';
import ListsContext from '../context/ListsContext';
import NavBar from '../components/NavBar/NavBar';
import ListItem from '../components/ListItem/ListItem';

const ListDetail: React.FC = () => {
  const navigate = useNavigate();
  const { listId } = useParams<{ listId: string }>();

  const { loading, error, items, fetchItems } = useContext(ItemsContext);
  const { list, fetchList } = useContext(ListsContext);

  useEffect(() => {
    if (listId && !items.length) {
      fetchItems(listId);
    }
  }, [fetchItems, items, listId]);

  useEffect(() => {
    if (listId) {
      fetchList(listId);
    }
  }, [fetchList, listId]);

  return (
    <Container>
      <NavBar
        goBack={() => navigate(-1)}
        openForm={() => navigate(`/list/${listId}/new`)}
        title={list ? list.title : ''}
      />
      <Container>
        {loading || error ? (
          <Alert variant="danger">{error || 'Loading...'}</Alert>
        ) : (
          items.map((item) => <ListItem key={item.id} data={item} />)
        )}
      </Container>
    </Container>
  );
};

export default ListDetail;

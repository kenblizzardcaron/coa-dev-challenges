import React, { useEffect, useState } from 'react';
import {
  Alert,
  Col,
  Container,
  Jumbotron,
  Pagination,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { mapMarker } from 'react-icons-kit/fa/mapMarker';
import { Icon } from 'react-icons-kit';

import { fetchBadDoggos } from './redux/actions';

const PAGE_SIZE = 10;

const App = ({ doggos, error, isLoading, onFetchBadDoggos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    if (!doggos || doggos.length === 0) {
      setPageData([]);
    } else if (doggos && doggos.length > PAGE_SIZE && !pageData.length) {
      setPageData(doggos.slice(0, PAGE_SIZE));
    }
  }, [doggos, pageData.length]);

  useEffect(() => {
    if (!error && !isLoading && doggos.length === 0) {
      onFetchBadDoggos();
    }
  }, [error, isLoading, onFetchBadDoggos, doggos.length]);

  const handlePageChange = (page = 1) => {
    setCurrentPage(page);
    setPageData(doggos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
  };

  const pageItems = () => (
    <React.Fragment>
      {[...Array(Math.ceil(doggos.length / PAGE_SIZE))].map((_, i) => (
        <Pagination.Item
          onClick={() => handlePageChange(i + 1)}
          key={`page${i}`}
          active={i + 1 === currentPage}
        >
          {i + 1}
        </Pagination.Item>
      ))}
    </React.Fragment>
  );

  return (
    <Container>
      <Row>
        <Col>
          <Jumbotron>
            <h2>Dangerous Dogs</h2>
            <p>
              No declared Dangerous Dog in the City of Austin and Travis County
              should ever be running at large. They are court ordered to be
              restrained at all times and should be wearing a large tag
              identifying them as a Dangerous Dog. They have attacked in the
              past. The owner is required to provide $100,000 in financial
              responsibility. If they attack again the court could order them
              put to sleep.
            </p>
          </Jumbotron>
        </Col>
      </Row>
      {isLoading && (
        <Row>
          <Col>{isLoading && <Spinner animation="border" />}</Col>
        </Row>
      )}
      {error && (
        <Row>
          <Col>
            <Alert variant="error">{error}</Alert>
          </Col>
        </Row>
      )}
      {!error && doggos.length > 0 && (
        <React.Fragment>
          <Row>
            <Col>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.map(
                    (
                      {
                        description_of_dog: descriptionOfDog = '',
                        first_name: firstName = '',
                        last_name: lastName = '',
                        address = '',
                        location = { coordinates: [0, 0] },
                      },
                      index,
                    ) => (
                      <tr>
                        <td>{`${firstName} ${lastName}`}</td>
                        <td>{descriptionOfDog}</td>
                        <td>
                          <a
                            target="_blank"
                            href={`https://www.google.com/maps/search/?api=1&query=${
                              location.coordinates[1]
                            },${location.coordinates[0]}`}
                            rel="noopener noreferrer"
                          >
                            <Icon size={14} icon={mapMarker} /> {address}
                          </a>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
          {doggos.length > PAGE_SIZE && (
            <Row>
              <Col>
                <Pagination className="d-flex justify-content-center">
                  {pageItems()}
                </Pagination>
              </Col>
            </Row>
          )}
        </React.Fragment>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  doggos: state.doggos,
  isLoading: state.isLoading,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  onFetchBadDoggos: () => dispatch(fetchBadDoggos()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

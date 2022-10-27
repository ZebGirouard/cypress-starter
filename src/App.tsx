import React, { FormEvent, useState } from 'react';
import { Form, Button, Input, Label, Row, List, Col, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

interface Character {
    name: string;
    height: string;
    mass: string;
    url: string;
}

const App: React.FC = () => {
  const [characterQuery, setCharacterQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const searchForCharacter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('searching for character', characterQuery);
    try {
      const result = await fetch(`https://swapi.dev/api/people/?search=${characterQuery}`);
      const json = await result.json();
      // @ts-ignore
      const results = json.results;
      console.log('results', results);    
      setSearchResult(results);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container className="Challenge">
      {/* Search Form */}
      <Form onSubmit={searchForCharacter}>
        <Row className="form-items" xs="12">
            <Col>
              <Label>Search for a Star Wars Character: </Label>
            </Col>
            <Col>
              <Input
                type="text"
                placeholder="Han Solo"
                onChange={(e) => setCharacterQuery(e.target.value)}
              />
            </Col>
            <Col>
              <Button>Search</Button>
            </Col>

        </Row>
      </Form>
      {/* Results List */}
      <Row>
        <List className="results">
          {searchResult.map((character: Character = {
            name: '',
            height: '',
            mass: '',
            url: ''
          }) => (
            <li className="result">
              {character.name}
              <List>
                <li>Height: {character.height}</li>
                <li>Mass: {character.mass}</li>
                <li>Link: <a href={character.url}>{character.name}</a></li>
              </List>
            </li>
          ))}
        </List>
      </Row>
    </Container>
  );
}

export default App;

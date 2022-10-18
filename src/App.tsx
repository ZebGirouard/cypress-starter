import React, { FormEvent, useState } from 'react';
import { Form, Button, Input, Label, Row, List } from 'reactstrap';

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
    <div className="Challenge">
      {/* Search Form */}
      <Row>
        <Form onSubmit={searchForCharacter}>
          <Label>Search for a Star Wars Character: </Label>
          <Input
            type="text"
            placeholder="Han Solo"
            onChange={(e) => setCharacterQuery(e.target.value)}
          />
          <Button>Search</Button>
        </Form>
      </Row>
      {/* Results List */}
      <Row>
        <List>
          {searchResult.map((character: Character = {
            name: '',
            height: '',
            mass: '',
            url: ''
          }) => (
            <li>
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
    </div>
  );
}

export default App;

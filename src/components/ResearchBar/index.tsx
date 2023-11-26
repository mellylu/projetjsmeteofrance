import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';

interface Location {
  name: string;
}

interface SearchBarProps {
  onCitySelected: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCitySelected }) => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);

  const fetchSuggestions = async (inputValue: string) => {
    try {
      const response = await fetch(
        `http://api.geonames.org/searchJSON?name_startsWith=${inputValue}&country=FR&username=YOUR_USERNAME`
      );

      if (!response.ok) {
        throw new Error('Unable to fetch suggestions');
      }

      const data = await response.json();
      setSuggestions(data.geonames);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    fetchSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (
    event: React.FormEvent<HTMLInputElement>,
    { suggestion }: { suggestion: Location }
  ) => {
    onCitySelected(suggestion.name);
  };

  const getSuggestionValue = (suggestion: Location) => suggestion.name;

  const renderSuggestion = (suggestion: Location) => <div>{suggestion.name}</div>;

  const inputProps = {
    placeholder: 'Rechercher une ville en France',
    value,
    onChange,
  };

  useEffect(() => {
    // Ajoutez ici d'autres logiques liées à la recherche, si nécessaire
  }, [value]);

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default SearchBar;

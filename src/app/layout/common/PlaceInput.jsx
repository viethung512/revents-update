import React, { Fragment } from 'react';
import './style.css';
import { Input, List } from 'antd';
import PlacesAutoComplete from 'react-places-autocomplete';

function PlaceInput({
  value = '',
  onChange,
  onBlur,
  options,
  onSelect,
  placeholder,
}) {
  return (
    <PlacesAutoComplete
      value={value}
      onChange={onChange}
      searchOptions={options}
      onSelect={onSelect}
    >
      {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
        <Fragment>
          <Input {...getInputProps()} placeholder={placeholder} />
          {suggestions.length > 0 && (
            <List
              className='suggestions'
              loading={loading}
              size='small'
              dataSource={suggestions}
              renderItem={suggestion => (
                <List.Item
                  className='suggestion'
                  {...getSuggestionItemProps(suggestion)}
                  style={{ padding: '4px 16px' }}
                >
                  <List.Item.Meta
                    style={{ padding: 0 }}
                    title={suggestion.formattedSuggestion.mainText}
                    description={suggestion.formattedSuggestion.secondaryText}
                  />
                </List.Item>
              )}
            />
          )}
        </Fragment>
      )}
    </PlacesAutoComplete>
  );
}

export default PlaceInput;

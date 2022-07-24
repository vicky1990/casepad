import React, { useCallback, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { render } from "react-dom";

import "react-bootstrap-typeahead/css/Typeahead.css";

const CACHE = {};

/*{
  "total_count": 3894,
  "incomplete_results": false,
  "items": [
    {
      "login": "RER",
      "score": 1.0
    },
    */

function makeAndHandleRequest(query, page = 1) {
  return fetch(`/diseases?q=${query}`)
    .then((resp) => resp.json())
    .then(({ items, total_count }) => {
      const options = items.map((i) => ({
        login: i.login
      }));
      return { options, total_count };
    });
}

function Asynautocomplete(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");
  const [multiSelections, setMultiSelections] = useState([]);

  const handleInputChange = (q) => {
    setQuery(q);
  };

  const handleChange = (q) => {
    setMultiSelections(q);
    //console.log(q);
    // following is to get the data in parent component
    if (props.onChange) {
      props.onChange(q);
    }
  };

  const handlePagination = (e, shownResults) => {
    const cachedQuery = CACHE[query];

    // Don't make another request if:
    // - the cached results exceed the shown results
    // - we've already fetched all possible results
    if (
      cachedQuery.options.length > shownResults ||
      cachedQuery.options.length === cachedQuery.total_count
    ) {
      return;
    }

    setIsLoading(true);

    const page = cachedQuery.page + 1;

    makeAndHandleRequest(query, page).then((resp) => {
      const options = cachedQuery.options.concat(resp.options);
      CACHE[query] = { ...cachedQuery, options, page };

      setIsLoading(false);
      setOptions(options);
    });
  };

  // `handleInputChange` updates state and triggers a re-render, so
  // use `useCallback` to prevent the debounced search handler from
  // being cancelled.
  const handleSearch = useCallback((q) => {
    if (CACHE[q]) {
      setOptions(CACHE[q].options);
      return;
    }

    setIsLoading(true);
    makeAndHandleRequest(q).then((resp) => {
      CACHE[q] = { ...resp, page: 1 };

      setIsLoading(false);
      setOptions(resp.options);
    });
  }, []);

  return (
    <AsyncTypeahead
      id="async-pagination-example"
      isLoading={isLoading}
      labelKey="login"
      maxResults={10}
      minLength={3}
      multiple
      allowNew
      onInputChange={handleInputChange}
      onChange={handleChange}
      onPaginate={handlePagination}
      onSearch={handleSearch}
      options={options}
      paginate
      placeholder=""
      renderMenuItemChildren={(option) => <div>{option.login}</div>}
      selected={multiSelections}
      useCache={false}
    />
  );
}

export default Asynautocomplete;

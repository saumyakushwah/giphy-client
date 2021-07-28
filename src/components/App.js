import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import axios from "axios";
import ImageList from "./ImageList";
import { Search, Container } from "semantic-ui-react";

const API_KEY = "YcbWhmP6SZVzHoQL9751ByD02xjzwf2D";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]); // Suggestions

  const fetchData = useCallback(
    async (options) => {
      const { offset = 0 } = options || {};
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=20&offset=${offset}`
      );
      setTimeout(
        () => {
          let final = [...response.data.data];
          if (offset > 0) {
            final = [...results, ...response.data.data];
          }
          setResults(final);
          setLoading(false);
        },
        offset > 0 ? 0 : 1000
      );
    },
    [query, results]
  );

  const fetchSuggestions = useCallback(async () => {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&q=${query}`
    );
    // console.log("response:", response);
    // setTimeout(
    //   () => {
    // let final = [...response.data.data];
    // if (offset > 0) {
    //   final = [...results, ...response.data.data];
    // }
    setOptions(response.data.data.map((a) => ({ title: a.name })));
    // setLoading(false);
    // },
    // offset > 0 ? 0 : 1000
    // );
  }, [query]);

  useEffect(() => {
    if (query.length <= 0) {
      setResults([]);
    }
  }, [query]);

  const onSubmit = (e) => {
    if (e) e.preventDefault();
    setOptions([]);
    setLoading(true);
    fetchData();
  };

  const fetchMore = useCallback(() => {
    fetchData({ offset: results.length });
  }, [results, fetchData]);

  const onMount = useCallback(() => {
    window.onscroll = function (ev) {
      console.log(
        window.innerHeight + window.scrollY,
        document.body.scrollHeight
      );
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 500
      ) {
        console.log("Bottom of page");
        fetchMore();
      }
    };
  }, [fetchMore]);

  const onChange = (e) => {
    setQuery(e.target.value);
    fetchSuggestions();
  };

  useEffect(() => {
    onMount();
  }, [onMount]);

  const searching = query && results.length > 0;
  const fontSize = searching ? "24px" : "64px";

  return (
    <>
      <Container
        className={`main-container ${searching ? "collapse" : "expand"}`}
      >
        <h1 className="main-title" style={{ fontSize }}>
          Giphy Client
        </h1>
        <Search
          fluid
          size="massive"
          icon="search"
          input={{
            icon: "search",
            iconPosition: "left",
            placeholder: "Search GIFs...",
            onKeyDown: (e) => {
              if (e.key !== "Enter") return;
              onSubmit();
            },
          }}
          loading={loading}
          showNoResults={false}
          onResultSelect={(e, d) => {
            setQuery(d.result.title);
            onSubmit();
          }}
          onSearchChange={_.debounce(onChange, 500, {
            leading: true,
          })}
          results={options}
          // value={value}
        />
        <br />
        {/* <form
        onSubmit={onSubmit}
        className="ui form"
        style={{
          display: "flex",
          transition: "all .2s ease",
          height: searchHeight,
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        */}
        {/* <div
          className={`ui massive fluid icon input ${loading ? "loading" : ""}`}
        > */}
        {/* <Grid> */}
        {/* <Grid.Column width={12}> */}
        {/* </Grid.Column> */}
        {/* </Grid> */}
        {/* <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search GIFs..."
          /> */}
        {/* <i className="search icon"></i> */}
        {/* </div> */}
      </Container>
      <Container>{query ? <ImageList images={results} /> : null}</Container>
    </>
  );
}

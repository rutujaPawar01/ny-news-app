import { useEffect, useState } from "react";
import {
  TextField,
  Container,
  InputAdornment,
  Box,
  Typography,
  Skeleton,
  Pagination,
  Autocomplete
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { searchNews } from "../../redux/action/search.action";
import { Article } from '../article/article.component';
import debounce from "lodash.debounce";
import { getHistorySearched, handleHistorySearch } from "../../utils/util";

const BASE_URL = "https://static01.nyt.com/";

const SearchNews = () => {
  const [query, setQuery] = useState('');
  const [newsData, setNewsList] = useState([]);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const { searchedNews, searchCount } = useSelector(state => state.search);

  useEffect(() => {
    setNewsList(searchedNews);
    console.log("searchedNews", searchedNews);
  }, [searchedNews]);

  function handleSearchNews(event) {
    const searchText = event?.target?.value;

    setQuery(searchText);

    const trimSearchText = searchText.trim();
    if (trimSearchText?.length) {
      handleHistorySearch(trimSearchText);
      dispatch(searchNews(trimSearchText));
    }
  }

  const debouncedOnChange = debounce(handleSearchNews, 2000);

  const handlePageChange = (e, nextpage) => {
    setNewsList([]);
    setPage(nextpage);
    query.length > 0 && dispatch(searchNews(query, nextpage));
  }

  return (
    <>
      <Container sx={{ padding: { xs: '2rem', md: '2rem' } }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
            Search news here
          </Typography>

          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={getHistorySearched().map((option) => option)}
            renderInput={(params) => (
              <TextField
                {...params}
                type="search"
                placeholder="I'm searching for..."
                onChange={debouncedOnChange}
                variant="outlined"
                sx={{
                  my: "1rem",
                  maxWidth: "30rem",
                }}
                fullWidth
                size="small"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>

        <Grid container spacing={3} my={1}>
          {newsData?.length > 0 ?
            newsData?.map((news, key) => {
              const { multimedia, pub_date, title, abstract, web_url } = news;
              return <Article
                imageUrl={`${BASE_URL}${multimedia?.[2]?.url}`}
                publishedAt={pub_date}
                title={title}
                summary={abstract}
                url={web_url}
                index={key} />
            }) :
            query?.length ? [1, 2, 3, 4, 5, 6].map((news, key) => {
              return <Grid item xs={12} sm={6} md={4}><Skeleton variant="rectangular" height={300} /></Grid>
            })
              : <Grid sx={{ textAlign: "center" }} item xs={12}>Please try different keywords...!</Grid>
          }
        </Grid>
        <Pagination
          count={Math.ceil(searchCount / 10) - 1}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </Container>
    </>
  );
};

export default SearchNews;
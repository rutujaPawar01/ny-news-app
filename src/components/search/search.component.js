import { useEffect, useState } from "react";
import {
  TextField,
  Container,
  InputAdornment,
  Box,
  Typography,
  Tabs,
  Tab,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getNewsDetail, getScienceNews, getWorldNews } from "../../redux/action/news.action";
import { Article } from '../article/article.component';
import newsService from "../../services/news.service";

const News = () => {
  const news = [];
  const [query, setQuery] = useState('');
  const [newsData, setNewsList] = useState([]);

  const dispatch = useDispatch();
  const { searchedNews } = useSelector(state => state.news);

  useEffect(() => {
    dispatch(getWorldNews());
    // setNewsList([]);
  }, [selectedTab]);

  useEffect(() => {
    setNewsList(searchedNews);
  }, [searchedNews]);

  function searchNews(event) {
    //event.target.value
  }

  return (
    <>
      <Container sx={{ padding: { xs: '2rem', md: '2rem' } }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
            Search news here
          </Typography>

          <TextField
            type="search"
            placeholder="I'm searching for..."
            onChange={searchNews}
            variant="outlined"
            sx={{
              my: "1rem",
              maxWidth: "30rem",
            }}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* {loading && <Loading />} */}
        {/* {error && <Error error={error} />} */}

        <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
          Results:{" "}
          {query === '' ? newsData?.length : newData.length}
        </Typography>

        <Grid container spacing={3} my={1}>
          {newsData?.results?.length > 0 ?
            newsData?.results?.map((news, key) => {
              const { multimedia, published_date, title, abstract, url } = news;
              return <Article
                imageUrl={multimedia?.[2]?.url || ''}
                publishedAt={published_date}
                title={title}
                summary={abstract}
                url={url}
                index={key} />
            }) :
            [1, 2, 3, 4, 5, 6].map((news, key) => {
              return <Grid item xs={12} sm={6} md={4}><Skeleton variant="rectangular" height={300} /></Grid>
            })
          }
        </Grid>
      </Container>
    </>
  );
};

export default News;
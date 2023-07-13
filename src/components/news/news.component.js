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
  const [newData, setNewData] = useState([]);
  const [queryArray, setQueryArray] = useState([]);
  const [selectedTab, setTab] = useState(0);
  const [newsData, setNewsList] = useState([]);

  const dispatch = useDispatch();
  const { worldNews, scienceNews } = useSelector(state => state.news);

  useEffect(() => {
    if (selectedTab === 0) {
      dispatch(getWorldNews());
    } else {
      dispatch(getScienceNews());
    }
    setNewsList([]);
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === 0) {
      setNewsList(worldNews);
    } else {
      setNewsList(scienceNews);
    }
  }, [worldNews, scienceNews]);

  function searchNews() {
    setQueryArray(query?.toLowerCase().match(/\S+/g));

    let newArray = [];

    if (queryArray !== undefined) {
      queryArray.forEach((element) => {
        news?.forEach((item) => {
          if (
            element.includes(" ") === false &&
            item.title.toLowerCase().includes(element) &&
            newArray.indexOf(item) === -1
          ) {
            newArray.push(item);
          }
        });
      });
    }

    if (queryArray !== undefined) {
      queryArray.forEach((element) => {
        news?.forEach((item) => {
          if (
            element.includes(" ") === false &&
            item.summary.toLowerCase().includes(element) &&
            newArray.indexOf(item) === -1
          ) {
            newArray.push(item);
          }
        });
      });
    }
    setNewData(newArray);
  }

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Container sx={{ padding: { xs: '2rem', md: '2rem' } }}>
        <Tabs value={selectedTab} onChange={handleChange} centered>
          <Tab label="World" />
          <Tab label="Science" />
        </Tabs>
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
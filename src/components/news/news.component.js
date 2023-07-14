import React from 'react';
import { useEffect, useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getScienceNews, getWorldNews } from "../../redux/action/news.action";
import { Article } from '../article/article.component';

const News = () => {
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

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Container sx={{ padding: { xs: '2rem', md: '2rem' } }}>
        <Tabs value={selectedTab} onChange={handleChange} centered>
          <Tab label="World" name="World" />
          <Tab label="Science" name="Science" />
        </Tabs>
        <Grid container spacing={3} my={1}>
          {newsData?.results?.length > 0 ?
            newsData?.results?.map((news, key) => {
              const { multimedia, published_date, title, abstract, url } = news;
              return url?.length > 0 && <Article
                imageUrl={multimedia?.[2]?.url || ''}
                publishedAt={published_date}
                title={title}
                summary={abstract}
                url={url}
                key={url} />
            }) :
            [1, 2, 3, 4, 5, 6].map(() => {
              return <Grid item xs={12} sm={6} md={4}><Skeleton variant="rectangular" height={300} /></Grid>
            })
          }
        </Grid>
      </Container>
    </>
  );
};

export default News;
import React, { Fragment } from 'react';
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
import { loaderArray } from '../../constant/constant';

const News = () => {
  const [selectedTab, setTab] = useState(0);
  const [newsData, setNewsList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { worldNews, scienceNews } = useSelector(state => state.news);

  useEffect(() => {
    if (selectedTab === 0) {
      dispatch(getWorldNews());
    } else {
      dispatch(getScienceNews());
    }
    setNewsList([]);
    setLoading(true);
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === 0) {
      setNewsList(worldNews);
    } else {
      setNewsList(scienceNews);
    }
    setLoading(false);
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
          {isLoading && loaderArray.map(() => {
            return <Grid item xs={12} sm={6} md={4}><Skeleton variant="rectangular" height={300} /></Grid>
          })}
          {newsData?.results?.length > 0 &&
            newsData?.results?.map((news, key) => {
              const { multimedia, published_date, title, abstract, url } = news;
              return url?.length > 0 && <Fragment key={url}>
                <Article
                  imageUrl={multimedia?.[2]?.url || '/assets/New-York-Times-Logo.png'}
                  publishedAt={published_date}
                  title={title}
                  summary={abstract}
                  url={url}
                  key={url} />
              </Fragment>
            })
          }
        </Grid>
      </Container>
    </>
  );
};

export default News;
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import {  Box, Typography, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getNewsDetail } from "../../redux/action/news.action";
import { useEffect } from 'react';

const BASE_URL = 'https://www.nytimes.com/';

const ArticleDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const articleData = useSelector((state) => state.news.article)

  useEffect(() => {
    dispatch(getNewsDetail(location?.state?.webUrl));
  }, [location]);

  return (
    <>
      {articleData && Object.keys(articleData)?.length > 0 && <>
        <Box
          component="img"
          sx={{
            height: 500,
            width: "100%",
            maxHeight: { xs: 200, sm: 300, md: 400 }
          }}
          alt={articleData?.headline?.main}
          src={BASE_URL + articleData?.multimedia?.[0]?.url}
        />
        <Box
          sx={{
            margin: { md: '4rem', xs: '1rem' },
            position: "absolute",
            top: { xs: 130, sm: 200, md: 250 },
            backgroundColor: "white",
            p: { md: "2rem 4rem", xs: '1rem 1.5rem' },
            width: { sm: '90%', md: '80%' },
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mb: "3rem", fontSize: { xs: "1.5rem" } }}
          >
            {articleData?.headline?.main}{" "}
          </Typography>
          <Typography variant="body1">{articleData?.lead_paragraph}{" "}</Typography>
          <Typography variant="body1">{articleData?.snippet}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ marginTop: "2rem", fontWeight: "600" }}
          >
            Learn more:{" "}
            <Link href={articleData?.web_url} underline="hover" color="inherit">
              {articleData?.web_url}
            </Link>
          </Typography>
        </Box>
      </>
      }
    </>
  );
};

export default ArticleDetail;
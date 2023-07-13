// import React from 'react';
import * as React from 'react';
import * as Redux from 'react-redux';

import { render, screen } from "@testing-library/react";
import ArticleDetail from "../../news-detail/articleDetail.component.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import store from "../../../redux/store/store.js";

import { useSelector } from 'react-redux';
import { mockData } from './article.mock.js';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
}));


const loadComponent = () => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue(mockData);

    render(
        <Provider store={store}>
            <BrowserRouter>
                <StyledEngineProvider injectFirst>
                    <ArticleDetail />
                </StyledEngineProvider>
            </BrowserRouter>
        </Provider>
    ) 
}

describe("Article Component", function () {
    
    it("should show heading", async () => {
        loadComponent();

        expect(await screen.findByText(mockData.headline.main)).toBeVisible()
    });

    it("should show lead paragraph", async () => {
        loadComponent();

        expect(await screen.findByText(mockData.lead_paragraph)).toBeVisible()
    });

    it("should show snippet text and know more url", async () => {
        loadComponent();

        expect(await screen.findByText(mockData.snippet)).toBeVisible();
        expect(await screen.findByText(mockData.web_url)).toBeVisible();
    });
});
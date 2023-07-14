import * as React from 'react';
import * as Redux from 'react-redux';

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import store from "../../../redux/store/store.js";

import { useSelector } from 'react-redux';
import { mockData } from './news.mock.js';
import News from '../../news/news.component.js';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
}));


const loadComponent = () => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue(mockData);

    return render(
        <Provider store={store}>
            <BrowserRouter>
                <StyledEngineProvider injectFirst>
                    <News />
                </StyledEngineProvider>
            </BrowserRouter>
        </Provider>
    )
}

describe("News Component", function () {

    it("should show 2 tabs", async () => {
        loadComponent();

        expect(await screen.findByText('World')).toBeVisible()
        expect(await screen.findByText('Science')).toBeVisible()
    });

    it("should display World news record", async () => {
        loadComponent();

        const data = mockData.worldNews.results[1];
        expect(await screen.findByText(data.published_date)).toBeVisible()
        expect(await screen.findByText(data.title)).toBeVisible()
        expect(await screen.findByText(data.abstract)).toBeVisible()
    });

    it("should display Science news record", async () => {
        loadComponent();

        waitFor(() => {
            const science = screen.getByRole('button', {
                name: /Science/i
            });

            fireEvent.click(science, { target: { value: '' } });

            const data = mockData.scienceNews.results[1];
            expect(screen.findByText(data.published_date)).toBeVisible()
            expect(screen.findByText(data.title)).toBeVisible()
            expect(screen.findByText(data.abstract)).toBeVisible()
        })
    });

});
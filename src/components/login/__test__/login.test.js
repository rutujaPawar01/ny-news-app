// import React from 'react';
import * as React from 'react';
import * as Redux from 'react-redux';

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import store from "../../../redux/store/store.js";

import { useSelector } from 'react-redux';
import Login from '../login.component.js';



const loadComponent = () => {

    return render(
        <Provider store={store}>
            <BrowserRouter>
                <StyledEngineProvider injectFirst>
                    <Login />
                </StyledEngineProvider>
            </BrowserRouter>
        </Provider>
    )
}

describe("Login Component", function () {

    it("should display login form with all fields", async () => {
        loadComponent();

        expect(await screen.findByText("Email Address")).toBeVisible();
        expect(await screen.findByText("Password")).toBeVisible();
        expect(await screen.findByText("Sign In")).toBeVisible();
    });

    it("should display sign up link", async () => {
        loadComponent();
        
        expect(await screen.findByText("Don't have an account? Sign Up")).toBeVisible();
    });

    it("should accept username and password", async () => {
        const setUsername = jest.fn();
        const setPassword = jest.fn();

        const { container } = loadComponent();

        const input = container.querySelector(`input[name="email"]`);
        const passInput = container.querySelector(`input[name="password"]`);
        const submit = screen.getByRole('button', {
            name: /Sign In/i
        })

        fireEvent.change(input, { target: { value: 'a@b.com' } });
        fireEvent.change(passInput, { target: { value: '83hsjdh' } });
        fireEvent.click(submit, { target: { value: '' } });


        waitFor(() => {
            expect(setUsername).toHaveBeenCalled();
            expect(setPassword).toHaveBeenCalled();
        })
    });
});
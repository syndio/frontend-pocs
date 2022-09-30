import React, { Component } from "react";

/*
import { Button } from "./components/ui/Button/Button";
import { Header } from "./layout/Header/Header";
import { Sidebar } from './layout/Sidebar/Sidebar';
import { Main } from './layout/Main/Main';
*/
const Header = React.lazy(() => import('UI/Layout').then(module => ({ default: module.Header })));
const Sidebar = React.lazy(() => import('UI/Layout').then(module => ({ default: module.Sidebar })));
const Main = React.lazy(() => import('UI/Layout').then(module => ({ default: module.Main })));
const Button = React.lazy(() => import('UI/Button').then(module => ({ default: module.Button })));


import 'tailwindcss/tailwind.css'
import './App.css'

export const App = () => {
    return (
        <>
            <Header productName="UI Library" />
            <div className="flex">

                <Sidebar className="p-4 flex-none w-64 h-screen animate-fade-in">
                    <ul>
                        <li><a href="http://localhost:5150" className="prose prose-sm">PayEQ</a></li>
                        <li><a href="http://localhost:2112" className="prose prose-sm">OppEQ</a></li>
                        <li><a href="http://localhost:2022" className="prose prose-sm">UI Library</a></li>
                        <li className="selected"><a href="http://localhost:3333" className="prose prose-sm">Vendor Libraries</a></li>
                    </ul>
                </Sidebar>

                <Main className="grow bg-gradient-to-t from-gray-100 p-4 pt-14 h-screen">
                    <h1>Vendor Libraries</h1>
                    <p>This is just an FE server to serve common vendor libraries shared between apps. Nothing to see here.</p>
                </Main>
            </div>
        </>
    );
}
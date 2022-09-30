import React, { Component } from "libs/react";
// import { App } from "./App";
import { Button } from "./components/ui/Button/Button";
import { Callout } from "./components/ui/Callout/Callout";
import { Tab, Tabs } from "./components/ui/Tabs/Tabs";
import { Header } from "./Layout/Header/Header";
import { Main } from "./Layout/Main/Main";
import { Sidebar } from './Layout/Sidebar/Sidebar';

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
                        <li className="selected"><a href="http://localhost:2022" className="prose prose-sm">UI Library</a></li>
                        <li><a href="http://localhost:3333" className="prose prose-sm">Vendor Libraries</a></li>
                    </ul>
                </Sidebar>

                <Main className="grow bg-gradient-to-t from-gray-100 p-4 pt-14 h-screen">
                    <div>
                        <h1>UI Library</h1>
                        <p>This is just an FE server to serve our shared UI library. Nothing to see here.</p>
                    </div>
                </Main>
            </div>
        </>
    );
}
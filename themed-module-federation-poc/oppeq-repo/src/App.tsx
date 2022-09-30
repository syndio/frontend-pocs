import React, { Suspense } from "libs/react";

import 'tailwindcss/tailwind.css';
import './App.css';

// https://github.com/facebook/react/issues/14603
/*
const Header = React.lazy(() => import('UI/Header').then(module => ({ default: module.Header })));
const Sidebar = React.lazy(() => import('UI/Sidebar').then(module => ({ default: module.Sidebar })));
const Main = React.lazy(() => import('UI/Main').then(module => ({ default: module.Main })));
*/
const Header = React.lazy(() => import('UI/Layout').then(module => ({ default: module.Header })));
const Sidebar = React.lazy(() => import('UI/Layout').then(module => ({ default: module.Sidebar })));
const Main = React.lazy(() => import('UI/Layout').then(module => ({ default: module.Main })));
const Button = React.lazy(() => import('UI/Button').then(module => ({ default: module.Button })));
const Callout = React.lazy(() => import('UI/Callout').then(module => ({ default: module.Callout })));
const Tabs = React.lazy(() => import('UI/Tabs').then(module => ({ default: module.Tabs })));
const Tab = React.lazy(() => import('UI/Tab').then(module => ({ default: module.Tab })));

export const App = () => {
    return (
        <>
            <Suspense fallback="loading header">
               <Header productName="OppEQ" />
            </Suspense>
            <div className="flex">
                <Sidebar className="p-4 flex-none w-64 h-screen animate-fade-in">
                    <ul>
                        <li><a href="http://localhost:5150" className="prose prose-sm">PayEQ</a></li>
                        <li className="selected"><a href="http://localhost:2112" className="prose prose-sm">OppEQ</a></li>
                        <li><a href="http://localhost:2022" className="prose prose-sm">UI Library</a></li>
                        <li><a href="http://localhost:3333" className="prose prose-sm">Vendor Libraries</a></li>
                    </ul>
                </Sidebar>
                <Main>
                    <Suspense fallback="Loading tabs">
                        <Tabs aria-label="Demo tabs" defaultTabId="levels" className="animate-fade-in">
                            <Tab id="demographics" title="Demographics">
                            Demographics!
                            </Tab>
                            <Tab id="levels" title="Levels">
                                <Callout>
                                    <div><strong>This is a callout!</strong></div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <p><Button>Click me</Button></p>
                                </Callout>
                            </Tab>
                        </Tabs>
                    </Suspense>
                </Main>
            </div>
        </>
    );
}
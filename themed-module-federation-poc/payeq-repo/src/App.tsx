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

const IconStatus = ({ title, bgColor }: any) => {
    return (
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${bgColor} text-white inline-block text-xs`}>{title}</div>
    );
}

export const App = () => {
    return (
        <>
            <Header productName="PayEQ +" />
            <div className="flex">
                <Sidebar className="p-4 flex-none w-64 h-screen animate-fade-in">
                    <ul>
                        <li className="selected"><a href="http://localhost:5150" className="prose prose-sm">PayEQ</a></li>
                        <li><a href="http://localhost:2112" className="prose prose-sm">OppEQ</a></li>
                        <li><a href="http://localhost:2022" className="prose prose-sm">UI Library</a></li>
                        <li><a href="http://localhost:3333" className="prose prose-sm">Vendor Libraries</a></li>
                    </ul>
                </Sidebar>
                <Main>
                    <Suspense fallback="Loading tabs">
                        <Tabs aria-label="Demo tabs" defaultTabId="gender" className="animate-fade-in">
                            <Tab
                                id="gender"
                                title={
                                    <div className="flex"><span className="inline-block mr-2 font-bold">Gender</span> <IconStatus title="x" bgColor="bg-green-400" /></div>
                                }
                            >
                                Gender content
                            </Tab>
                            <Tab
                                id="race"
                                title={
                                    <div className="flex"><span className="inline-block mr-2 font-bold">Race</span> <IconStatus title="x" bgColor="bg-red-700" /></div>
                                }
                            >
                                Race Content
                            </Tab>
                        </Tabs>
                    </Suspense>
                </Main>
            </div>
        </>
    );
}
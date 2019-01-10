import React, { Component, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

import Content from './Content';
import Wrap from './Header';

import '../css/Sidebar.css';
import { StyledContent } from './StyledComponents';
import Header1 from './Header';
import ErrorBoundary from './ErrorBoundary';

export const HeaderContext = React.createContext();
const Form = lazy(() => import('./Form'));

export default class Sidebar extends Component {
    state = {
        header: 'Header',
        content: 'Content',
        sidebar: true
    }

    contentChanged = () => {
        this.setState({
            header: 'Form',
            content: 'Sidebar',
            sidebar: false
        })
    }

    render() {
        return (
            <div>
                <ErrorBoundary>
                {this.state.sidebar ?
                    <article className="Sidebar">
                        {/* <Header title={this.state.header} /> */}
                        <HeaderContext.Provider value={this.state.header}>
                            <Header1 />
                        </HeaderContext.Provider>
                        <StyledContent >
                            <nav>
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/" onClick={this.contentChanged}>Side</Link></li>
                                </ul>
                            </nav>
                            <Content content={this.state.content} />
                        </StyledContent>
                    </article> :
                    <div>
                        {/* <Header title={this.state.header} /> */}
                        <HeaderContext.Provider value={this.state.header}>
                            <Wrap />
                        </HeaderContext.Provider>
                        <Suspense fallback={<div>Loading...</div>} maxDuration={2000}>                            
                            <Form />
                        </Suspense>
                    </div>
                }
                </ErrorBoundary>
            </div>
        );
    }
}
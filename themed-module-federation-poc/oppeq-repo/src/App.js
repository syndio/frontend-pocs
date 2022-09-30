import { Component } from 'react';
import { Card } from './components/ui/Card';

// import './app.styles.scss'

class App extends Component {
  render() {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-black font-bold rounded-lg border shadow-lg p-10 m-20'>
          <Card>Hello world</Card>
        </div>
      </div>
    )
  }
}

export default App

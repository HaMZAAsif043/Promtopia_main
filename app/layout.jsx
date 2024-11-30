import '@styles/global.css'
import Navbar from '@components/Navbar'
import Provider from '@components/Provider'
import { getSession } from 'next-auth/react'

export const metadata = {
    title: 'Prompt Sharing',
    description: 'Discover & Share AI prompts',
}

const RootLayout = ({ children, session }) => {
    return (
        <html lang='en'>
            <body>
                <Provider session={session}>
                    <div className='main'>
                        <div className='gradient' />
                    </div>
                    <main className='app'>
                        <Navbar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout
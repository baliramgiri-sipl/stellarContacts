import { Inter } from 'next/font/google'
import '../globals.css'
import Header from '@/components/Header/Header'
import { Theme } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
const ReduxStore = dynamic(() => import('@/Providers/ReduxStore'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Home',
    description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReduxStore >
                    <Theme>
                        <Header />
                        <main className='my-8'>
                            {children}
                        </main>
                    </Theme>
                </ReduxStore>

            </body>
        </html>
    )
}

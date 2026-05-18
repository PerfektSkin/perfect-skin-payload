import React from 'react'

import { FooterPageProvider } from '@/globals/Footer/FooterPageContext'
import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <FooterPageProvider>{children}</FooterPageProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}

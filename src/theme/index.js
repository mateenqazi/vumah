import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
// hooks
import useSettings from '../hooks/useSettings';
//
import shape from './shape';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';
import useLocalStorage from 'src/hooks/useLocalStorage';

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node
};

export default function ThemeConfig({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', {
    isLight: true
  });

  const toggleDarkMode = (event) => {
    if (event.target.checked) {
      document.body.classList.add('dark-theme');
      setSettings({
        ...settings,
        isLight: false
      });
    } else {
      document.body.classList.remove('dark-theme');
      setSettings({
        ...settings,
        isLight: true
      });
    }
  };

  const themeOptions = useMemo(
    () => ({
      palette: settings.isLight ? { ...palette.light, mode: 'light' } : { ...palette.dark, mode: 'dark' },
      shape,
      typography,
      breakpoints,
      toggleDarkMode,
      shadows: settings.isLight ? shadows.light : shadows.dark,
      customShadows: settings.isLight ? customShadows.light : customShadows.dark
    }),
    [settings]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

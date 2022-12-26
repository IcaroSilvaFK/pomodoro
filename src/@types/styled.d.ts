import 'styled-components';
import { ThemeType } from '../styles/theme/type';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

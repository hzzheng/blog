import Typography from 'typography'
import fairyGateTheme from 'typography-theme-fairy-gates'

fairyGateTheme.baseFontSize = '14px';
fairyGateTheme.baseLineHeight = 1.5;
fairyGateTheme.bodyFontFamily = [
  '-apple-system', 'BlinkMacSystemFont', 'Segoe UI',
  'Roboto', 'Helvetica Neue', 'Helvetica', 'Hiragino Sans GB',
  'Microsoft YaHei', 'SimSun', 'sans-serif'
];
const typography = new Typography(fairyGateTheme)

export default typography


import { useSettingContext } from '../../context/Setting.context.js';
import { LoaderWrapper, NeonRing, LoadingText } from './style/Global.loading.style.js';



export const GlobalLoader = () => {
  const { settings } = useSettingContext();
  const theme = settings;
  
  return (
    <LoaderWrapper theme={theme}>
      <div style={{ position: 'relative' }}>
        <NeonRing theme={theme} />
      </div>
      <LoadingText className='font_code'>Initialisation</LoadingText>
    </LoaderWrapper>
  );
};

export const WaveComponent = ({ colorPrimary }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320" 
        preserveAspectRatio="none" 
        style={{ width: '100%', height: 'auto', display: 'block' }}
    >
        <path 
            fill="none" 
            stroke={colorPrimary} 
            strokeOpacity="0.3" 
            strokeWidth="2"
            d="M0,224L60,208C120,192,240,160,360,144C480,128,600,128,720,138.7C840,149,960,171,1080,192C1200,213,1320,235,1380,245.3L1440,256"
        ></path>

        <path 
            fill="none" 
            stroke={colorPrimary} 
            strokeOpacity="1" 
            strokeWidth="4"
            d="M0,160L48,170.7C96,181,192,203,288,208C384,213,480,203,576,170.7C672,139,768,85,864,80C960,75,1056,117,1152,138.7C1248,160,1344,160,1392,160L1440,160"
        ></path>
    </svg>
);
export const WaveComponent = ({ colorPrimary, colorAccent }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320" 
        preserveAspectRatio="none" 
        style={{ width: '100%', height: 'auto', display: 'block' }}
    >
        <path 
            fill={colorAccent} 
            fillOpacity="0.15" 
            d="M0,192L48,165.3C96,139,192,85,288,80C384,75,480,117,576,144C672,171,768,181,864,170.7C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>

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
import * as Styled from './ServiceStatus.style';
import { InfoDataTextComponent, TitleTextComponent } from '@/components/Text/Text.component';
import { CalendarCheck, ClockCheck, Dot, Loader2 } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { fetchGatusEndpoints, getEndpointStatus, calculateUptime, getLastCheck} from '@/api/service/gatus.api';

interface IServiceStatusProps {
    Name: string;
    curStatus: 'online' | 'offline' | 'maintenance';
    uptimeDisplay: string;
    checkTiming: string;
}

interface ServiceData {
    key: string;
    displayName: string;
    status: 'online' | 'offline' | 'maintenance';
    uptime: number;
    lastCheck: string;
}

const BadgeStatus = ({Name, curStatus, uptimeDisplay, checkTiming}: IServiceStatusProps) => {
    return(
        <Styled.StatusBadge $Status={curStatus || "offline"}>
            <div className='for'>
                <Dot className="dot" size={80} />
                {Name} 
            </div>

            <div className='details'>
                <strong className='font_dot'>
                    <ClockCheck size={20}/>
                    {checkTiming}
                </strong>
                <strong className='font_dot'>
                    <CalendarCheck size={20}/>
                    {uptimeDisplay}
                </strong>
            </div>
        </Styled.StatusBadge>
    );
}

const ServiceStatusApiComponent = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [displayedServices, setDisplayedServices] = useState<ServiceData[]>([]);

    const getDisplayName = (key: string): string | null => {
        const mapping: Record<string, string> = {
            'api-portfolio': 'API',
            'site-portfolio': 'FRONT',
        };
        return mapping[key] || null;
    };

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const endpoints = await fetchGatusEndpoints();
                const servicesToShow = ['api-portfolio', 'site-portfolio'];
                
                const services: ServiceData[] = endpoints
                    .filter(e => servicesToShow.includes(e.key))
                    .map(endpoint => ({
                        key: endpoint.key,
                        displayName: getDisplayName(endpoint.key)!,
                        status: getEndpointStatus(endpoint),
                        uptime: calculateUptime(endpoint),
                        lastCheck: getLastCheck(endpoint),
                    }));

                setDisplayedServices(services);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error'));
                console.error('Error fetching Gatus endpoints:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return(
        <Styled.ServiceStatusContainer>
            <TitleTextComponent
                subtitle={'Statut des services'}
                subtitleOpacity={0.3}
            >
                /Statut des services
            </TitleTextComponent>
            <div className='StatusList'>
                {loading && (
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        padding: '2rem',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <Loader2 size={24} className="spin-animation" />
                        <span style={{ marginLeft: '0.5rem' }}>Chargement...</span>
                    </div>
                )}
                
                {error && (
                    <InfoDataTextComponent
                        StrongText="Erreur"
                        text="Impossible de récupérer le statut des services."
                        subtitle="Veuillez réessayer plus tard."
                    />
                )}
                
                {!loading && displayedServices.map(service => (
                    <BadgeStatus
                        key={service.key}
                        Name={service.displayName}
                        curStatus={service.status}
                        uptimeDisplay={`${service.uptime}%`}
                        checkTiming={service.lastCheck}
                    />
                ))}

                {!error && !loading && (
                  <div className="Other font_dot">
                  <a 
                      href={'https://uptime.jonathangleyze.fr/'} 
                      aria-label={"Voir le statut complet sur UptimeRobot"} 
                      target={'_blank'}
                      rel={'noopener noreferrer'}
                  >
                      <span>+</span>
                      <span className="hidden">Voir les autres services</span>
                  </a>
                    
                  </div>
                )}
               
            </div>
        </Styled.ServiceStatusContainer>
    );
}

export const ServiceStatusApi = memo(ServiceStatusApiComponent);
                
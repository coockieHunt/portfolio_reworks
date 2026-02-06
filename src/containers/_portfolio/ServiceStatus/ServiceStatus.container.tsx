import * as Styled from './ServiceStatus.style';
import { TitleTextComponent } from '@/components/Text/Text.component';
import { CalendarCheck, ClockCheck, Dot } from 'lucide-react';
import { useAppUptime } from '@/hooks/useAppUptime';
import { useApiHealth } from '@/hooks/useApiHealth';

//type
interface IServiceStatusProps {
    Name: string;
    curStatus: 'online' | 'offline' | 'maintenance';
    uptimeDisplay: string;
    checkTiming: string;
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

export const ServiceStatusApi = () => {
    const { formatUptime } = useAppUptime();
    const { formatApiUptime, apiStatus } = useApiHealth();

    return(
        <Styled.ServiceStatusContainer>
            <TitleTextComponent
                subtitle={'Statut des services'}
                subtitleOpacity={0.3}
            >
                /Statut des services
            </TitleTextComponent>
            <div className='StatusList'>
                <BadgeStatus 
                    Name="FRONT" 
                    curStatus="online" 
                    uptimeDisplay={formatUptime()}
                    checkTiming=".REAL TIME" 
                />
                <BadgeStatus 
                    Name="API" 
                    curStatus={apiStatus} 
                    uptimeDisplay={formatApiUptime()}
                    checkTiming=".10 m" 
                />
            </div>
        </Styled.ServiceStatusContainer>
    );
}
                
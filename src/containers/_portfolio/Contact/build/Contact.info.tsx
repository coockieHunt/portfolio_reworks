import * as styled from '../Contact.style';
import { DotGridEffect } from '@/styles/effect';
import { Link } from '@/components/Button/LinkButton';
import { Linkedin, Mail, MapPin } from 'lucide-react';
import { ContactEmail } from '@/config';

export const ContactInfo = () => {
    return (
        <styled.Info>
            <DotGridEffect
                $isHovered={true}
                $DotColor="#feffff11"
                $Spacing="18px"
                $DotSize="2px"
            />
            <div className="content">
                <div className="title">
                    <h2 >Informations</h2>
                    <span>Mes coordonnées directes</span>
                </div>
                <div className="container">
                    <Link
                        className="ItemInfo"
                        href={`mailto:${ContactEmail}`}
                        ariaLabel="Email"
                        type="external"
                    >
                        <Mail />
                        <div className="textInfo">
                            <span className="name">Email</span>
                            <span className="info">{ContactEmail}</span>
                        </div>
                    </Link>
                    <Link
                        className="ItemInfo"
                        href="https://maps.app.goo.gl/jVRCWUaxotidE7cx8"
                        ariaLabel="Map"
                        type="external"
                    >
                        <MapPin />
                        <div className="textInfo">
                            <span className="name">Localisation</span>
                            <span className="info">Nîmes (30), France</span>
                        </div>
                    </Link>
                    <Link
                        className="ItemInfo"
                        href="https://www.linkedin.com/in/jonathan-gleyze/"
                        ariaLabel="LinkedIn"
                        type="external"
                    >
                        <Linkedin />
                        <div className="textInfo">
                            <span className="name">LinkedIn</span>
                            <span className="info">Jonathan Gleyze</span>
                        </div>
                    </Link>
                </div>
            </div>
        </styled.Info>
    );
};

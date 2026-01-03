import { TitleTextComponent } from '@/components/Text/Text.component';
import { useContactForm } from '@/hooks/useContactForm';
import { ContactInfo } from './build/Contact.info';
import { ContactFormUI } from './build/ContactFormUI';
import * as styled from './Contact.style';

// Types
export interface IContactContainerProps {
    id?: string;
}

export const ContactContainer: React.FC<IContactContainerProps> = ({ id }) => {
    const formLogic = useContactForm();

    return (
        <div id={id}>
            <TitleTextComponent
                subtitle={'A votre service'}
                style={{ width: '100%' }}
            >
                Me contacter
            </TitleTextComponent>
            <styled.Text>
                Un projet ? Une question ? <br />
                Remplissez ce formulaire, je vous répondrai rapidement.
            </styled.Text>
            <styled.Container>
                <ContactInfo />
                <ContactFormUI {...formLogic} />
            </styled.Container>
        </div>
    );
};

import { PostGuestbookEntry, GetGuestbookEntries } from '../api/guestbook.api';

declare global {
    interface Window {
        isEasterEggPlaying?: boolean;
        hasKonamiListener?: boolean;
        SecretSystem?: any;
        decrypt?: (text: string, shift: string | number) => string;
    }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const SUPERSECRET_PASSWORD = "AZERTY123";

const styles = {
    matrix: "color: #00ff41; font-family: monospace;",
    error: "background: #e60505; color: white; padding: 2px 5px; font-family: monospace;",
    encrypted: "background: #003300; color: #00ff41; padding: 4px; border: 1px solid #00ff41;",
    redPill: "color: #FF3333; font-weight: bold; text-shadow: 0 0 10px #FF0000;",
    warning: "color: #FFA500; font-weight: bold;",
    white: "color: #FFFFFF;",
    gray: "color: gray; font-family: monospace;",
    grayItalic: "color: gray; font-style: italic;",
    green: "color: #007f2a; font-family: monospace;",
    greenBold: "color: #00ff41; font-weight: bold;",
    greenLight: "color: #00ff41;",
    red: "color: #e60505; font-family: monospace;",
    orange: "color: #FFA500;",
    matrixLarge: "color: #00ff41; font-family: monospace; font-size: 16px; font-weight: bold;",
    italic: "color: #00ff41; font-style: italic;"
};

const funnyPasswords = {
    "password": "Seriously? 🤦",
    "admin": "Too simple, Neo...",
    "123456": "We're not in 1999 anymore!",
    "matrix": "Nice try, but no 😏",
    "root": "You're getting warmer... but no",
    "hack": "A hacker would do better than that",
    "secret": "Ironic, but no"
};

const showMatrixNotification = (message: string) => {
    const notification = document.createElement('div');
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#000',
        color: '#00ff41',
        padding: '15px 25px',
        borderRadius: '5px',
        border: '1px solid #00ff41',
        fontFamily: 'monospace',
        fontSize: '13px',
        zIndex: '10000',
        boxShadow: '0 0 15px #00ff41',
        textAlign: 'center'
    });
    notification.innerHTML = `<div style="font-weight:bold;margin-bottom:5px">> SYSTEM_OVERRIDE</div><div>${message}</div>`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.transition = "opacity 0.5s";
        notification.style.opacity = "0";
        setTimeout(() => notification.remove(), 500);
    }, 5000);
};

export const ConnectedToSecretSystem = () => {
    if (typeof window === 'undefined') {
        return;
    }

    const konamiCode = [
        "ArrowUp", "ArrowUp", 
        "ArrowDown", "ArrowDown", 
        "ArrowLeft", "ArrowRight", 
        "ArrowLeft", "ArrowRight", 
        "b", "a"
    ];
    let konamiCursor = 0;

    console.log(`%c[HiddenLayer] Watching for ancient sequences...`, styles.matrix);

    const onKeydown = (e: KeyboardEvent) => {
        const rawKey = e.key;
        if (!rawKey) return; 

        const key = rawKey.toLowerCase();
        const expectedKey = konamiCode[konamiCursor]?.toLowerCase();

        if (!expectedKey) {
            konamiCursor = 0;
            return;
        }

        if (key !== expectedKey) {
            konamiCursor = 0;
            if (key === "arrowup") konamiCursor = 1;
            return;
        }

        konamiCursor++;

        if (konamiCursor === konamiCode.length) {
            konamiCursor = 0;
            showMatrixNotification("DECRYPTOR ACTIVATED. Wake up, developer... Check your F12 console.");
            launchEasterEgg();
        }
    };

    if (window.hasKonamiListener) {
        window.removeEventListener('keydown', onKeydown); 
    }

    window.addEventListener('keydown', onKeydown);
    window.hasKonamiListener = true;
    

    let connected = false;
    let PasswordRecByHASH_DLMQT = ""; 

    if (!window.SecretSystem) {
        window.SecretSystem = {
            login: (password) => {
                console.log(`%c[SecretSystem] Attempting connection...`, styles.matrix);
                
                if (funnyPasswords[password.toLowerCase()]) {
                    console.log(`%c[SecretSystem] ${funnyPasswords[password.toLowerCase()]}`, styles.warning);
                    return false;
                }
                
                if (password === SUPERSECRET_PASSWORD) {
                    connected = true;
                    PasswordRecByHASH_DLMQT = password;
                    triggerMatrixSuccess();
                    return true;
                } else {
                    connected = false;
                    PasswordRecByHASH_DLMQT = "";
                    console.log(`%c[SecretSystem] Access denied. Incorrect password.`, styles.error);
                    return false;
                }
            },

            logout: () => {
                connected = false;
                PasswordRecByHASH_DLMQT = "";
                console.log(`%c[SecretSystem] Successfully disconnected.`, styles.warning);
                return true;
            },

            write: async (name, message) => {
                if(!connected){
                    console.log(`%c[SecretSystem] Failed to write secret data. Please login first.`, styles.error);
                    return false;
                }

                try {
                    const resp = await PostGuestbookEntry(PasswordRecByHASH_DLMQT, name, message);
                    if (resp && resp.success) {
                        console.log(`%c[SecretSystem] Secret data successfully saved.`, styles.matrix);
                        console.log(`%c✓ Message from "${name}" added to secret stream`, styles.greenLight);
                        return true;
                    } else {
                        if(resp && resp.status === 429) {
                            console.log(`%c[SecretSystem] Too many requests. Rate limit active.`, styles.error);
                        } else {
                            console.log(`%c[SecretSystem] Failed to save secret data.`, styles.error);
                        }
                        return false;
                    }
                } catch (error) {
                    console.log(`%c[SecretSystem] Error while writing:`, styles.error, error);
                    return false;
                }
            },
            
            read: async () => {
                if(!connected){
                    console.log(`%c[SecretSystem] Failed to read secret data. Please login first.`, styles.error);
                    return null;
                }
                
                console.log(`%c[SecretSystem] Reading secret data...`, styles.matrix);
                
                try {
                    const resp = await GetGuestbookEntries(PasswordRecByHASH_DLMQT);
                    if (resp && resp.success) {
                        console.log(`%c[SecretSystem] Secret data successfully retrieved.`, styles.matrix);
                        console.log(`%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, styles.greenLight);
                        console.log(`%c        SECRET DATA STREAM`, styles.greenBold);
                        console.log(`%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, styles.greenLight);
                        
                        
                        if (resp['data'].entries && resp['data'].entries.length > 0) {
                            const cleanEntries = resp['data'].entries.map(e => ({
                                Agent: e.name,
                                Data: e.message,
                                Timestamp: new Date(e.created_at).toLocaleTimeString()
                            }));
                            console.table(cleanEntries);
                        } else {
                            console.log(`%c> No data in the stream. Be the first to write!`, styles.orange);
                        }
                        
                        console.log(`%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, styles.greenLight);
                        return true;
                    } else {
                        if(resp && resp.status === 429) {
                            console.log(`%c[SecretSystem] Too many requests. Rate limit active.`, styles.error);
                        } else {
                            console.log(`%c[SecretSystem] Failed to retrieve secret data.`, styles.error);
                        }
                        return null;
                    }
                } catch (error) {
                    console.log(error)
                    console.log(`%c[SecretSystem] Error while reading:`, styles.error, error);
                    return null;
                }
            },

            help: () => {
                console.log(`%c
╔════════════════════════════════════════════════════╗
║          SECRETSYSTEM COMMANDS v1.0                ║
╠════════════════════════════════════════════════════╣
║                                                    ║
║  SecretSystem.login(password)                      ║
║  → Connect to the secret system                    ║
║                                                    ║
║  SecretSystem.logout()                             ║
║  → Disconnect from the system                      ║
║                                                    ║
║  SecretSystem.write(username, message)             ║
║  → Write a message to the secret stream            ║
║                                                    ║
║  SecretSystem.read()                               ║
║  → Read all messages from the secret stream        ║
║                                                    ║
╚════════════════════════════════════════════════════╝
                `, styles.matrix);
            },
            
            hint: "Try the Konami Code on your keyboard..." 
        };
    }
};

export const launchEasterEgg = async () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }
    
    if(window.isEasterEggPlaying) return;
    window.isEasterEggPlaying = true;

    const metaTag = document.createElement('meta');
    metaTag.name = "system-offset";
    metaTag.content = "4"; 

    if (!document.querySelector('meta[name="system-offset"]')) {
        document.head.appendChild(metaTag);
    }

    if (!window.decrypt) {
        window.decrypt = (text, shift) => {
            const s = parseInt(String(shift), 10);
            return text.split('').map(char => {
                const code = char.charCodeAt(0);
                if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 - s + 26) % 26) + 97);
                if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 - s + 26) % 26) + 65);
                return char;
            }).join('');
        };
    }

    const secretData = {
        status: "ENCRYPTED",
        algorithm: "CAESAR",
        hint: "Shift the letters back...",
        offset_key: "HIDDEN_IN_DOM",
        sender_id: "ADMIN_ROOT",
        message: "WCWXIQ_YRPSGOIH::TEWWASVH=EDIVXC123" 
    };
    
    console.clear(); 

    await sleep(800); 
    console.log(`%c> ACCESS GRANTED _`, styles.matrixLarge);
    await sleep(800); 

    console.log(`%c> Wake up, developer…`, styles.matrix);
    await sleep(1000); 

    console.log(`%c> You see details others ignore.`, styles.matrix);
    await sleep(800);

    console.log(`%cSYSTEM://trace\n▒░▒░ Loading hidden sector...\n▒░▒░ Connection unstable...`, styles.green);
    await sleep(1500);

    console.log(`%c> INCOMING DATA PACKET...`, styles.matrix);
    await sleep(400);

    console.log(`%c> ENCRYPTED MESSAGE RECEIVED: [ ADMIN_ROOT ]`, styles.encrypted);
    await sleep(600);

    console.log(`%c> DECRYPTION MESSAGE ...`, styles.encrypted);
    await sleep(1200); 

    console.log(`%c> ERROR: Decryption key missing from memory.`, styles.error);
    await sleep(200);

    console.log(`%c> MESSAGE DATA:`, styles.gray, secretData);
    await sleep(600);

    console.log(`%c> HINT: The key is hidden in the system's <HEAD> metadata...`, styles.error);
    await sleep(400);

    console.log(`%c> TIP: Use global function decrypt(string, key) to read the message.`, styles.grayItalic);
    console.log(`%c> TIP: Use global function SecretSystem.help() for SUPERSECRET ULTRA KILL chat`, styles.grayItalic);
    await sleep(600);
    
    console.log(`%cSYSTEM://trace\n▒ Disconnecting...`, styles.red);
    
    window.isEasterEggPlaying = false;
};

const triggerMatrixSuccess = () => {
    console.clear();
    
    console.log(`%c
    INITIALIZING WAKE_UP_PROTOCOL... 
    Loading constructs... [DONE]
    
    %c
          ______
         /      \\
        |  RED   |    %c You chose the truth.
        |  PILL  |
         \\______/
    
    %c
    The world they overlaid on your vision crumbles.
    You are now Admin.
    
    ---------------------------------------------------
    HERE IS THE SOURCE CODE OF REALITY (Your Password):
    ---------------------------------------------------
    
    %c[ ${SUPERSECRET_PASSWORD} ]%c

    > PS:ADMIN_ROOT: "Authentication Verified."
    
    ---------------------------------------------------
    
    %c> UPLOAD DATA:%c SecretSystem.write("Username", "Message")
    %c> READ STREAM:%c SecretSystem.read()
    %c> HELP:%c SecretSystem.help()
    
    %c> Explore... there might be other secrets 👀
    `, 
    styles.matrix,   
    styles.redPill, 
    styles.redPill, 
    styles.matrix,   
    styles.white,   
    styles.matrix,   
    styles.redPill, 
    styles.matrix,
    styles.redPill, 
    styles.matrix,
    styles.redPill,
    styles.matrix,
    styles.italic
    );
};
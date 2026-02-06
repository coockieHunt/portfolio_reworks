import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as Styled from './toc.style';
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { useWindowSize } from '@/hooks/useScreenResize.hook';

interface TocItem {
    id: string;
    text: string;
    level: number;
    show: boolean;
    DropDown: boolean;
    itemHidden: boolean;
    hasChildren: boolean;
}

interface TocContainerProps {
    QueryTitle: string;
    ScrollQueryTitle: string;
    UpdateAt: any;
}

export const TocContainer = ({
    QueryTitle,
    ScrollQueryTitle,
    UpdateAt,
}: TocContainerProps) => {
    const [items, setItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const isMobileOrTablet = useWindowSize(768);

    useEffect(() => {
        setIsCollapsed(!!isMobileOrTablet);
    }, [isMobileOrTablet]);

    useEffect(() => {
        const headingsElements = Array.from(document.querySelectorAll(QueryTitle));

        const newItems: TocItem[] = headingsElements.map((element, index, array) => {
            const level = parseInt(element.tagName.substring(1));
            const nextElement = array[index + 1];
            const nextLevel = nextElement ? parseInt(nextElement.tagName.substring(1)) : 0;
            const hasChildren = level === 2 && nextLevel > 2;

            return {
                id: element.id,
                text: element.textContent || '',
                level: level,
                show: level === 2,
                DropDown: false,
                itemHidden: level === 1,
                hasChildren: hasChildren,
            };
        });

        setItems(newItems);
    }, [QueryTitle, UpdateAt]);

    useEffect(() => {
        let ticking = false;
        const query = ScrollQueryTitle || QueryTitle;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const headingsElements = document.querySelectorAll(query);
                    let currentId = '';
                    let closestDistance = Infinity;

                    headingsElements.forEach((section) => {
                        const rect = section.getBoundingClientRect();
                        if (rect.top <= 150) {
                            const distance = Math.abs(rect.top - 150);
                            if (distance < closestDistance) {
                                closestDistance = distance;
                                currentId = section.id;
                            }
                        }
                    });

                    if (currentId) {
                        setActiveId((prevId) => (prevId !== currentId ? currentId : prevId));
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [ScrollQueryTitle, QueryTitle]); 

    // Scroll to id
    const handleScrollToId = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    const toggleSection = useCallback((targetId: string) => {
        setItems((prevToc) => {
            const index = prevToc.findIndex(item => item.id === targetId);
            if (index === -1) return prevToc;

            const clickedItem = prevToc[index];
            if (clickedItem.level !== 2 || !clickedItem.hasChildren) return prevToc;

            const isNowOpen = !clickedItem.DropDown;
            
            const newToc = [...prevToc];

            newToc[index] = { ...clickedItem, DropDown: isNowOpen };

            for (let i = 0; i < newToc.length; i++) {
                if (i !== index && newToc[i].level === 2 && newToc[i].hasChildren) {
                    newToc[i] = { ...newToc[i], DropDown: false };
                }

                if (newToc[i].level > 2) {
                    let parentIndex = -1;
                    for (let j = i - 1; j >= 0; j--) {
                        if (newToc[j].level === 2) {
                            parentIndex = j;
                            break;
                        }
                    }

                    if (parentIndex === index) {
                        newToc[i] = { ...newToc[i], show: isNowOpen };
                    } 
                    else {
                        newToc[i] = { ...newToc[i], show: false };
                    }
                }
            }

            return newToc;
        });
    }, []);

    const visibleItems = useMemo(() => {
        return items.filter((item) => !item.itemHidden);
    }, [items]);

    const toggleToc = () => setIsCollapsed(prev => !prev);

    return (
        <Styled.Container id="toc">
            <div className="info">
                <div 
                    className='header' 
                    onClick={toggleToc} 
                    style={{ cursor: 'pointer' }}
                    role="button"
                    tabIndex={0}
                    aria-label={isCollapsed ? 'Ouvrir le sommaire' : 'Fermer le sommaire'}
                    aria-expanded={!isCollapsed}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleToc();
                        }
                    }}
                >
                    <h2>Sommaire</h2>
                    {visibleItems.length > 0 && isMobileOrTablet && (
                        <span>
                            {isCollapsed ? <ArrowDownToLine aria-hidden="true" focusable={false} /> : <ArrowUpFromLine aria-hidden="true" focusable={false} />}
                        </span>
                    )}
                </div>
                
                {visibleItems.length > 0 ? (
                    <ul className={isCollapsed ? 'dropdown-closed' : ''}>
                        {visibleItems.map((item) => (
                            <li
                                key={item.id}
                                className={activeId === item.id ? 'active' : ''}
                                style={{
                                    paddingLeft: `${(item.level - 1) * 15}px`,
                                    display: item.show ? 'flex' : 'none', 
                                }}
                            >
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleScrollToId(item.id);
                                    }}
                                >
                                    {item.text}
                                </a>

                                {item.level === 2 && item.hasChildren && (
                                    <span
                                        className='icon-toggle'
                                        style={{ cursor: 'pointer', marginLeft: '5px' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleSection(item.id);
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={item.DropDown ? `Réduire la section ${item.text}` : `Développer la section ${item.text}`}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                toggleSection(item.id);
                                            }
                                        }}
                                    >
                                        {item.DropDown ? <ArrowUpFromLine size={16} aria-hidden="true" focusable={false} /> : <ArrowDownToLine size={16} aria-hidden="true" focusable={false} />}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                   <p style={{padding: '10px', color: '#666', fontStyle: 'italic'}}>Aucun sommaire</p>
                )}
            </div>
        </Styled.Container>
    );
};
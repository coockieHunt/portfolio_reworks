import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as Styled from './toc.style';
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';

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

/**
 * A React component that renders a table of contents (TOC) with interactive features.
 * It manages the display of headings, tracks the active heading based on scroll position,
 * and allows toggling visibility of nested sections.
 *
 * @param QueryTitle - A CSS selector string used to query heading elements in the DOM for scroll tracking.
 * @param ScrollQueryTitle - A CSS selector string used specifically for scroll tracking of headings.
 * @param UpdateAt - Adependency that triggers re-evaluation of the TOC when changed.
 * @returns A JSX element representing the TOC container.
 */
export const TocContainer = ({
    QueryTitle,
    ScrollQueryTitle,
    UpdateAt,
}: TocContainerProps) => {
    const [items, setItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const headingsElements = Array.from(document.querySelectorAll(QueryTitle));

        const newItems: TocItem[] = headingsElements.map((element) => {
            const level = parseInt(element.tagName.substring(1));
            return {
                id: element.id,
                text: element.textContent || '',
                level: level,
                show: level === 2,
                DropDown: false,
                itemHidden: level === 1,
                hasChildren: false,
            };
        });

        const finalItems = newItems.map((item, index) => {
            if (item.level === 2) {
                const nextItem = newItems[index + 1];
                const hasKids = nextItem && nextItem.level > 2;
                return { ...item, hasChildren: !!hasKids };
            }
            return item;
        });

        setItems(finalItems);
    }, [QueryTitle, UpdateAt]);

    // Get active heading on scroll
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
                        const distance = Math.abs(rect.top - 150);

                        if (rect.top <= 150 && distance < closestDistance) {
                            closestDistance = distance;
                            currentId = section.id;
                        }
                    });

                    if (currentId && currentId !== activeId) {
                        setActiveId(currentId);
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
    }, [activeId, ScrollQueryTitle, QueryTitle]);

    // Scroll to id
    const handleScrollToId = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    // Dropdown toggle
    const toggleSection = useCallback((index: number) => {
        setItems((prevToc) => {
            const clickedItem = prevToc[index];

            if (clickedItem.level !== 2 || !clickedItem.hasChildren) return prevToc;

            const isNowOpen = !clickedItem.DropDown;
            const newToc = [...prevToc];

            newToc[index] = { ...clickedItem, DropDown: isNowOpen };

            for (let i = 0; i < newToc.length; i++) {
                if (i === index) continue;

                if (newToc[i].level === 2 && newToc[i].hasChildren) {
                    newToc[i] = { ...newToc[i], DropDown: false };
                }
            }

            for (let i = index + 1; i < newToc.length; i++) {
                if (newToc[i].level <= 2) break;
                newToc[i] = { ...newToc[i], show: isNowOpen };
            }

            for (let i = 0; i < newToc.length; i++) {
                if (newToc[i].level > 2) {
                    let parentIndex = -1;
                    for (let j = i - 1; j >= 0; j--) {
                        if (newToc[j].level === 2) {
                            parentIndex = j;
                            break;
                        }
                    }

                    if (parentIndex !== index) {newToc[i] = { ...newToc[i], show: false };}
                }
            }

            return newToc;
        });
    }, []);

    // Item visible filter
    const visibleItems = useMemo(() => {
        return items.filter((item) => !item.itemHidden);
    }, [items]);

    return (
        <Styled.Container>
            <div className="info">
                <h2>Sommaire</h2>
                <ul>
                    {visibleItems.map((item, index) => (
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        toggleSection(index);
                                    }}
                                    role="button"
                                    aria-label={
                                        item.DropDown
                                            ? 'Réduire la section'
                                            : 'Développer la section'
                                    }
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            toggleSection(index);
                                        }
                                    }}
                                >
                                    {item.DropDown ? (
                                        <ArrowUpFromLine />
                                    ) : (
                                        <ArrowDownToLine />
                                    )}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </Styled.Container>
    );
};
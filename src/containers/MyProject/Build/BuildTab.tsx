import React from 'react';
import { Bookmark, FolderOpen, X } from 'lucide-react';

import { IBuildTabBuildProps } from '../interface/MyProject.interface';

const BuildTabBuild: React.FC<IBuildTabBuildProps> = ({ project, currentTab, setCurrentTab }) => {
    let Tab = [{ name: 'preview', label: project.fileName, icon: <Bookmark /> }];

    if (project.galery && project.galery.length > 0) {
        Tab.push({ name: 'galerie', label: 'Galerie', icon: <FolderOpen /> });
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, itemName: string, index: number) => {
        let newIndex = index;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            newIndex = (index + 1) % Tab.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            newIndex = (index - 1 + Tab.length) % Tab.length;
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setCurrentTab(itemName);
            return;
        } else {
            return;
        }
        setCurrentTab(Tab[newIndex].name);
        document.getElementById(`tab-${Tab[newIndex].name}-${project.id}`)?.focus();
    };

    return (
        <div className="tab-content">
            <ul role="tablist" aria-label={`Vues du projet ${project.title}`}>
                {Tab.map((item, index) => (
                    <li
                        key={index}
                        id={`tab-${item.name}-${project.id}`}
                        onClick={() => setCurrentTab(item.name)}
                        onKeyDown={(e) => handleKeyDown(e, item.name, index)}
                        className={currentTab === item.name ? 'selected' : undefined}
                        role="tab"
                        aria-selected={currentTab === item.name}
                        tabIndex={0}
                        aria-controls={`panel-${item.name}-${project.id}`}
                    >
                        {item.icon} {item.label}
                        {currentTab === item.name && (
                            <span className="icon icon-active"><X /></span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const BuildTab = React.memo(BuildTabBuild);
import React from 'react';
import { FaXmark } from 'react-icons/fa6';
import { VscBookmark, VscRootFolderOpened } from 'react-icons/vsc';


const BuildTabBuild = ({ project, currentTab, setCurrentTab }) => {

    let Tab = [{ name: 'preview', label: project.fileName, icon: <VscBookmark /> }];

    if (project.galery && project.galery.length > 0) {
        Tab.push({ name: 'galerie', label: 'Galerie.jsx', icon: <VscRootFolderOpened /> });
    }

    return (
        <div className="tab-content">
            <ul>
                {Tab.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => setCurrentTab(item.name)}
                        className={currentTab === item.name ? 'selected' : undefined}
                        role="tab"
                        aria-selected={currentTab === item.name}
                        // no hover specific logic yet
                    >
                        {item.icon} {item.label}
                        {(currentTab === item.name) && (
                            <span className="icon icon-active"><FaXmark /></span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const BuildTab = React.memo(BuildTabBuild);

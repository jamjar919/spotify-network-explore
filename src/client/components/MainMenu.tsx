import React, {FunctionComponent} from "react";
import {Menu, Transition} from '@headlessui/react'
import classNames from "classnames";
import {selectSpotifyProfile} from "../selectors/spotifySelector";

export const MainMenu: FunctionComponent<{}> = () => {
    const profile = selectSpotifyProfile() as SpotifyApi.UserObjectPrivate;
    const displayName: string = profile.display_name || profile.email;

    return (
        <div className="main-menu-container">
            <Menu>
            {({ open }) => (
                <>
                    <Menu.Button className="main-menu-top-button">
                        <span>{displayName}</span>
                        <svg className="main-menu-caret-down" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                    </Menu.Button>
                    <Transition
                        show={open}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="main-menu-items">
                            <Menu.Item>
                                {({ active }) => (
                                    <div className={classNames(active ? "menu-item-active" : "", "main-menu-item")}>
                                        Sign Out
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div className={classNames(active ? "menu-item-active" : "", "main-menu-item")}>
                                        Settings
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div className={classNames(active ? "menu-item-active" : "", "main-menu-item")}>
                                        Made by <a href="https://thejamespaterson.com">James Paterson</a>
                                    </div>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </>
                )}
            </Menu>
        </div>
    )
};
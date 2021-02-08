import React, {FunctionComponent} from "react";
import {Menu, Transition} from '@headlessui/react'
import classNames from "classnames";

export const MainMenu: FunctionComponent<{}> = () => (
    <div className="main-menu-container">
        <Menu>
        {({ open }) => (
            <>
                <span className="main-menu-top-button-wrapper">
                    <Menu.Button className="main-menu-top-button">
                        <span>Options</span>
                        <svg className="" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                    </Menu.Button>
                </span>
                <Transition
                    show={open}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items static>
                        <div className="px-4 py-3">
                            <p className="text-sm leading-5">Signed in as</p>
                            <p className="text-sm font-medium leading-5 text-gray-900 truncate">tom@example.com</p>
                        </div>
                        <div className="py-1">
                            <Menu.Item className="menu-item">
                                {({ active }) => (<>
                                    Made by <a className={classNames(active ? "menu-item-active" : "")} href="https://thejamespaterson.com">James Paterson</a>
                                </>)}
                            </Menu.Item>
                            <Menu.Item className="menu-item">
                                {({ active }) => (<>
                                    Made by <a className={classNames(active ? "menu-item-active" : "")} href="https://thejamespaterson.com">James Paterson</a>
                                </>)}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </>
            )}
        </Menu>
    </div>
);
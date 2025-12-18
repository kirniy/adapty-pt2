"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './LanguageSwitcher.module.css';

const LANGUAGES = [
    { code: 'EN', label: 'English', flag: 'https://adapty.io/assets/plugins/sitepress-multilingual-cms/res/flags/en.svg', href: '/' },
    { code: 'TR', label: 'Türkçe', flag: 'https://adapty.io/assets/plugins/sitepress-multilingual-cms/res/flags/tr.svg', href: '/tr/' },
    { code: 'DE', label: 'Deutsch', flag: 'https://adapty.io/assets/plugins/sitepress-multilingual-cms/res/flags/de.svg', href: '/de/' },
    { code: 'UA', label: 'Українська', flag: 'https://adapty.io/assets/uploads/flags/ua.svg', href: '/ua/' },
    { code: 'PL', label: 'Polski', flag: 'https://adapty.io/assets/plugins/sitepress-multilingual-cms/res/flags/pl.svg', href: '/pl/' },
    { code: 'FR', label: 'Français', flag: 'https://adapty.io/assets/plugins/sitepress-multilingual-cms/res/flags/fr.svg', href: '/fr/' },
    { code: 'RU', label: 'Русский', flag: 'https://adapty.io/assets/plugins/sitepress-multilingual-cms/res/flags/ru.svg', href: '/ru/' },
    { code: 'ES', label: 'Español', flag: 'https://adapty.io/assets/plugins/sitepress-multilingual-cms/res/flags/es.svg', href: '/es/' },
    { code: 'JA', label: '日本語', flag: 'https://adapty.io/assets/plugins/sitepress-multilingual-cms/res/flags/ja.svg', href: '/ja/' },
    { code: 'KO', label: '한국어', flag: 'https://adapty.io/assets/plugins/sitepress-multilingual-cms/res/flags/ko.svg', href: '/ko/' },
    { code: 'ZH', label: '中文', flag: 'https://adapty.io/assets/uploads/flags/flag-zh.svg', href: '/zh/' },
    { code: 'PT', label: 'Português', flag: 'https://adapty.io/assets/uploads/flags/flag-pt.svg', href: '/pt/' },
];

export const LanguageSwitcher: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageSelect = (lang: typeof LANGUAGES[0]) => {
        setCurrentLang(lang);
        setIsOpen(false);
    };

    return (
        <div
            className={`${styles.switcher} ${isOpen ? styles.switcherOpen : ''}`}
            ref={containerRef}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={styles.toggle}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label={currentLang.label}
            >
                <img
                    src={currentLang.flag}
                    alt=""
                    className={styles.flag}
                />
                <span className={styles.code}>{currentLang.code}</span>
                <span className={styles.label}>{currentLang.label}</span>
            </button>

            <ul className={styles.dropdown}>
                {LANGUAGES.filter(lang => lang.code !== currentLang.code).map((lang) => (
                    <li key={lang.code} className={styles.item}>
                        <a
                            href={lang.href}
                            className={styles.option}
                            onClick={(e) => {
                                e.preventDefault();
                                handleLanguageSelect(lang);
                            }}
                        >
                            <img
                                src={lang.flag}
                                alt=""
                                className={styles.flag}
                            />
                            <span className={styles.optionLabel}>{lang.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

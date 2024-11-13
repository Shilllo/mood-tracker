import { useEffect, useState } from 'react';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Theme = 'dark' | 'light';

type useThemeReturn = [Theme, (e: ChangeEvent) => void];

export const useTheme = (initialTheme: Theme): useThemeReturn => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;

    if (!storedTheme) {
        if (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            initialTheme = 'dark';
        }
    }

    const [theme, setTheme] = useState<Theme>(storedTheme || initialTheme);

    const handleChange = (e: ChangeEvent) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        setTheme(newTheme);
        window.location.reload();
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return [theme, handleChange];
};

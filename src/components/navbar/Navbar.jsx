import React, { useEffect, useState } from 'react'

function Navbar() {
    const [lightTheme, setLightTheme] = useState(true)
    useEffect(() => {
    const storedTheme = localStorage.getItem('lightTheme');
    const isLight = storedTheme ? JSON.parse(storedTheme) : true;
    setLightTheme(isLight);

    if (!isLight) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    }, []);
    const handleToggle = () => {
    if (lightTheme) {
      setLightTheme(false);
      document.documentElement.classList.add('dark');
      localStorage.setItem('lightTheme', JSON.stringify(false));
    } else {
      setLightTheme(true);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lightTheme', JSON.stringify(true));
    }
    };
    const navItems = [
        
    ]
  return (
    <div >
        <button onClick={handleToggle} className='dark:text-purple-500'>Change Theme</button>
    </div>
  )
}

export default Navbar
'use client';
import ToggleTheme from './toggle-theme';

export default function HeaderApp() {
  return (
    <nav>
      <div className="flex justify-between items-center w-full p-2">
        <p>Navbar</p>
        <p>Center</p>
        <ToggleTheme />
      </div>
    </nav>
  );
}

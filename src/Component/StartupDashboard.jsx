import MobileNavBar from './MobileNavBar'
import Header from './Header';

export default function StartupDashboard() {
  return (
    <div className={"bg-neutral-950 w-dvw h-dvh"}>
      <Header />
      {/* Content and Cards */}
      <MobileNavBar/>
    </div>
  );
}

import PacSerWideLockup from '@/components/PacSerWideLockup';
import WaveBg from '@/components/WaveBg';

export default function NavBar({}) {
  return (
    <nav>
      <WaveBg />
      <div className="temp-nav-logo-container">
        <PacSerWideLockup fillColor={'--ps-dark'} />
      </div>
    </nav>
  );
}

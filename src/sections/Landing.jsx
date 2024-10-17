import PacSerWideLockup from '@/components/PacSerWideLockup';
import WaveBg from '@/components/WaveBg';

export default function Landing({}) {
  return (
    <section style={{ 'max-width': '1200px' }}>
      <WaveBg />
      <div className="top flex flex-col justify-center items-center h-full m-4">
        <div className="landing-logo-container w-4/6 min-w-96 mb-10">
          <PacSerWideLockup fillColor="#333333" />
        </div>
        <div className="message-box">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At, sapiente odio facere unde, accusamus nemo
          laudantium hic cum deserunt autem, explicabo ipsum provident excepturi ut consequatur quam quaerat dolor
          quisquam!
        </div>
      </div>
    </section>
  );
}

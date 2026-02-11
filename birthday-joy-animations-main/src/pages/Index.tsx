import { AnimatePresence, motion } from 'framer-motion';
import { useBirthdayStore } from '@/stores/birthdayStore';
import { MusicPlayer } from '@/components/MusicPlayer';
import {
  WelcomePage,
  AgeRevealPage,
  PersonalMessagePage,
  MemoriesPage,
  CakeAndCandlesPage,
} from '@/pages/birthday';

const pageComponents = [
  WelcomePage,
  AgeRevealPage,
  PersonalMessagePage,
  MemoriesPage,
  CakeAndCandlesPage,
];

const Index = () => {
  const { currentPage } = useBirthdayStore();
  const CurrentPageComponent = pageComponents[currentPage - 1];

  return (
    <div className="relative overflow-hidden">
      <MusicPlayer />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <CurrentPageComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;

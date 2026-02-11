import { create } from 'zustand';

interface BirthdayData {
  name: string;
  age: number;
  birthDate: string;
  personalMessage: string;
}

interface BirthdayStore {
  data: BirthdayData;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  candlesBlown: boolean;
  setCandlesBlown: (blown: boolean) => void;
}

// Customize these values for the birthday person!
const defaultData: BirthdayData = {
  name: "Yamuna",
  age: 19,
  birthDate: "February 12, 2006",
  personalMessage: "Happy birthday Yamuna 🐒🤎🫶🏼🎉 Life long happy ah iru 😊 Enaku unnoda happiness tha mukiyam athukaga na ena venunalum panuven eppothume unkuda dha irupen 💯 even in your painful time 🤝 Unaku ena problem irundhalum sollu, unaku na irukken 🫶 nee en life la kedacha precious gem korangu 💎🐒 nee Ithu maariyehh un birthday ku ella year um  12 o'clock na dhaan first wish panuven seriyaa 😏 Unaku nyabagam irukkum ninaikuren na un birthday annaiku dhaan unaku follow kuduthu wish panni appo dhaan first time pesunom appo appo konjam lusu maari pesitu irupen, atha perusa edutukatha  athan unkitta inimel pesa maten nu solradhu 😂 apdilam unna vitu poga maten I hope namba bond inno etha vida strong agum nuhh 💯",
};

export const useBirthdayStore = create<BirthdayStore>((set) => ({
  data: defaultData,
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  nextPage: () => set((state) => ({ currentPage: Math.min(state.currentPage + 1, 5) })),
  candlesBlown: false,
  setCandlesBlown: (blown) => set({ candlesBlown: blown }),
}));

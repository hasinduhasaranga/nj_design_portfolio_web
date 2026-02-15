export type Language = 'uz' | 'en' | 'ru';

export const translations = {
  uz: {
    // Navigation
    nav: {
      about: "MƏN HAQQIMDA",
      portfolio: "PORTFOLIO",
      prices: "NARXLAR",
      contact: "BOĞ'LANISH"
    },
    // Categories
    categories: {
      all: "Barchasi",
      mobile: "Mobil ilova",
      website: "Vebsayt",
      logo: "Logotip"
    },
    // Buttons
    buttons: {
      details: "Batafsil",
      save: "Saqlash",
      add: "Qo'shish",
      delete: "O'chirish",
      upload: "Yuklash",
      cancel: "Bekor qilish"
    },
    // Admin Panel
    admin: {
      title: "Admin Panel",
      saveChanges: "O'zgarishlarni saqlash",
      addProject: "Yangi loyiha qo'shish",
      addBrand: "Yangi brend qo'shish",
      addContact: "Yangi aloqa qo'shish",
      addFooterLink: "Yangi havola qo'shish",
      deleteProject: "Loyihani o'chirish",
      moveUp: "Yuqoriga ko'chirish",
      moveDown: "Pastga ko'chirish",
      changePassword: "Parolni o'zgartirish",
      currentPassword: "Joriy parol",
      newPassword: "Yangi parol",
      confirmPassword: "Parolni tasdiqlash",
      updatePassword: "Parolni yangilash",
      logout: "Chiqish"
    },
    // Form Labels
    form: {
      title: "Sarlavha",
      text: "Matn",
      description: "Tavsif",
      image: "Rasm",
      hashtag: "Hashtag nomi",
      year: "Yil",
      media: "Media",
      thumbnail: "Eskiz rasm",
      enabled: "Yoqilgan"
    }
  },
  en: {
    // Navigation
    nav: {
      about: "ABOUT ME",
      portfolio: "PORTFOLIO",
      prices: "PRICES",
      contact: "CONTACT"
    },
    // Categories
    categories: {
      all: "All",
      mobile: "Mobile App",
      website: "Website",
      logo: "Logo"
    },
    // Buttons
    buttons: {
      details: "Details",
      save: "Save",
      add: "Add",
      delete: "Delete",
      upload: "Upload",
      cancel: "Cancel"
    },
    // Admin Panel
    admin: {
      title: "Admin Panel",
      saveChanges: "Save Changes",
      addProject: "Add New Project",
      addBrand: "Add New Brand",
      addContact: "Add New Contact",
      addFooterLink: "Add New Link",
      deleteProject: "Delete Project",
      moveUp: "Move Up",
      moveDown: "Move Down",
      changePassword: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      updatePassword: "Update Password",
      logout: "Logout"
    },
    // Form Labels
    form: {
      title: "Title",
      text: "Text",
      description: "Description",
      image: "Image",
      hashtag: "Hashtag Name",
      year: "Year",
      media: "Media",
      thumbnail: "Thumbnail",
      enabled: "Enabled"
    }
  },
  ru: {
    // Navigation
    nav: {
      about: "ОБО МНЕ",
      portfolio: "ПОРТФОЛИО",
      prices: "ЦЕНЫ",
      contact: "КОНТАКТ"
    },
    // Categories
    categories: {
      all: "Все",
      mobile: "Мобильное приложение",
      website: "Веб-сайт",
      logo: "Логотип"
    },
    // Buttons
    buttons: {
      details: "Подробнее",
      save: "Сохранить",
      add: "Добавить",
      delete: "Удалить",
      upload: "Загрузить",
      cancel: "Отмена"
    },
    // Admin Panel
    admin: {
      title: "Панель администратора",
      saveChanges: "Сохранить изменения",
      addProject: "Добавить новый проект",
      addBrand: "Добавить новый бренд",
      addContact: "Добавить новый контакт",
      addFooterLink: "Добавить новую ссылку",
      deleteProject: "Удалить проект",
      moveUp: "Переместить вверх",
      moveDown: "Переместить вниз",
      changePassword: "Изменить пароль",
      currentPassword: "Текущий пароль",
      newPassword: "Новый пароль",
      confirmPassword: "Подтвердить пароль",
      updatePassword: "Обновить пароль",
      logout: "Выйти"
    },
    // Form Labels
    form: {
      title: "Заголовок",
      text: "Текст",
      description: "Описание",
      image: "Изображение",
      hashtag: "Название хештега",
      year: "Год",
      media: "Медиа",
      thumbnail: "Миниатюра",
      enabled: "Включено"
    }
  }
};

export const getTranslation = (lang: Language, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

export const getLanguageFromStorage = (): Language => {
  if (typeof window === 'undefined') return 'uz';
  const stored = localStorage.getItem('language');
  return (stored === 'en' || stored === 'uz' || stored === 'ru') ? stored : 'uz';
};

export const setLanguageToStorage = (lang: Language): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
  }
};

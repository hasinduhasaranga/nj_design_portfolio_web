
import fs from 'fs/promises';
import path from 'path';
import { ContentBlock } from '../shared/schema';

// Initial default data from the client's Admin.tsx state
const DEFAULT_DATA: ContentBlock[] = [
    {
      id: "block1",
      name: "Bosh sahifa",
      includeInMenu: false, 
      includeInBottom: false, 
      text1: "Salom, men",
      text2: "<b>Najmiddin</b><br>Nurmuhamedov</b>",
      text3: "professional UX/UI dizaynerman. Shuningdek, NJ Design studiyasi asoschisiman. Ushbu vebsayt orqali men yaratgan dizayn ishlarimni ko'rishingiz va ular orqali mening yondashuvim bilan tanishishingiz mumkin.",
    },
    {
      id: "block2",
      name: "Men haqimda",
      includeInMenu: true,
      includeInBottom: true,
      title1: "Men haqimda",
      text1_1: "Men vebsaytlar, mobil ilovalar va logotiplar uchun maxsus dizaynlar yarataman. Men tayyorlagan ishlarim individual va o'ziga xos bo'lib, mijozning talab va istaklariga mos ravishda amalga oshiriladi.",
      text1_2: "Quyida mening rezyumemni yuklab olishingiz mumkin.",
      button1: '<button class="Star" name="Gold" type="button">Yuklab olish</button>',
      button1Enabled: true,
      title2: "Men foydalanadigan dasturiy vositalar",
      text2_1: "Men quyidagi dasturiy ta'minotlardan foydalanib dizaynlar yarataman.",
      text2_2: "Dizayn - bu nafaqat vizual ko'rinish, balki foydalanuvchining tasavvuridagi his-tuyg'ular va jarayonlarni ham aks ettiradi. Har bir loyiha o'ziga xos estetik go'zallik, rang uyg'unligi va e'tiborni tortuvchi elementlar bilan ajralib turadi.",
      stocks: [
        { title: "Figma", icon: "", enabled: true },
        { title: "Adobe XD", icon: '<img src="images/XD.svg" size="50%"><br><title>Adobe XD</title>', enabled: true },
        { title: "Adobe Photoshop", icon: "", enabled: true },
        { title: "Adobe After Effects", icon: "", enabled: true },
        { title: "Adobe Illustrator", icon: "", enabled: false },
      ]
    },
    {
      id: "block3",
      name: "Portfolio",
      includeInMenu: true,
      includeInBottom: true,
      title: "Portfolio",
      text: "Bu bo'limda siz mening ijodimdan eng yaxshi namunalarni ko'rishingiz mumkin. Ko'rsatilgan barcha dizaynlar mualliflik huquqi bilan himoyalangan.",
      tabsEnabled: true,
      projects: [
        {
          title: "OneSimBox Mobile App integrating eSIM and VPN and WiFi",
          hashtag: "Mobil ilova",
          year: "2025",
          description: "The design created for the OneSimBox mobile app — an innovative project that integrates eSIM and VPN technologies. It has been crafted to be unique, attractive, and individual.  In this project, the designs for the dashboard, statistical results, connection, QR code scanner, and several other features have been created.  If you need a similar service, place your order right away!",
          media: [{}, {}, {}, {}], 
          thumbnail: {}
        },
        {
          title: "OneSimBox Mobile App integrating eSIM and VPN and WiFi",
          hashtag: "Vebsayt",
          year: "2025",
          description: "The design created for the OneSimBox mobile app — an innovative project that integrates eSIM and VPN technologies. It has been crafted to be unique, attractive, and individual.  In this project, the designs for the dashboard, statistical results, connection, QR code scanner, and several other features have been created.  If you need a similar service, place your order right away!",
          media: [{}, {}, {}, {}],
          thumbnail: {}
        }
      ]
    },
    {
      id: "block4",
      name: "Narxlar",
      includeInMenu: true,
      includeInBottom: true,
      title1: "Narxlar",
      image1: '<img src="images/book.svg" size="50%">',
      image1Enabled: true,
      text1: "Ko'rsatiladigan xizmatlar uchun narxlar ish hajmi, murakkabligi va ko'lamiga tayangan holda kelishuv asosida amalga oshiriladi. Ishlash shakllari o'zaro kelishuvga muvofiq belgilangan tartibda shartnomaviy, onlayn yoki offlayn tarzda bajarilishi mumkin.",
      title2: "MAXSUS TAKLIF!",
      text2: "Arzon narxda sifatli dizayn tayyorlatishni istasangiz quyidagi birja platformalaridan biri orqali buyurtma bering. Sizning buyurtmangiz albatta yuqori maqomdagi darajada ko'rib chiqiladi.",
      brands: [
        { logo: '<img src="images/fiverr.svg" size="50%">', link: '<a href="https://www.fiverr.com/najmiddin">https://www.fiverr.com</a>', logoEnabled: true, linkEnabled: true },
        { logo: 'upwork.svg', link: 'https://www.upwork.com', logoEnabled: true, linkEnabled: true },
        { logo: 'freelancer.svg', link: 'https://www.freelancer.com', logoEnabled: false, linkEnabled: false },
      ],
      image3: '<img src="images/exclamation.svg" size="50%">',
      image3Enabled: true,
      text3: "Dizayn tayyorlatish albatta ma'lum mablag' talab qiladi, lekin bu ortiqcha hisoblanmaydi. Aksincha, did bilan tayyorlangan dizaynga ega bo'lmagan xar qanday loyiha huddi havodagi chang kabi so'nib ketadi."
    },
    {
      id: "block5",
      name: "Bog'lanish",
      includeInMenu: true,
      includeInBottom: true,
      title1: "Bog'lanish",
      text1: "Jonli muloqot uchun aloqa raqami",
      phone: "+998 33 141 41 41",
      contacts: [
        { image: '<img src="images/telegram.svg" size="50%">', title: '<b>Telegram</b> (Profil)', link: '<a class="link" href="https://t.me/nj_uz">@nj_uz</a>', description: 'istalgan vaqtda murojaat qilishingiz uchun', imageEnabled: true, titleEnabled: true, linkEnabled: true, descriptionEnabled: true },
        { image: 'gmail.svg', title: 'Gmail', link: 'najmiddin4141@gmail.com', description: 'elektron pochta orqali xabar yuborishingiz uchun', imageEnabled: true, titleEnabled: true, linkEnabled: true, descriptionEnabled: true },
        { image: 'linkedin.svg', title: 'Linkedin', link: 'https://www.linkedin.com/in/najmiddinxuja', description: 'meni va ishlarimni kuzatishingiz uchun', imageEnabled: true, titleEnabled: true, linkEnabled: true, descriptionEnabled: true },
        { image: 'telegram.svg', title: 'Telegram (Kanal)', link: 'https://t.me/nj_portfolio', description: 'tayyorlagan ishlarimni ko\'rishingiz uchun', imageEnabled: true, titleEnabled: true, linkEnabled: true, descriptionEnabled: true }
      ]
    },
    { 
      id: "bottom", 
      name: "BOTTOM SECTION", 
      includeInMenu: false, 
      includeInBottom: false,
      title1: "NJ Design",
      text1: "Najmiddin Nurmuxamedov tomonidan asos solingan",
      
      img1: '<img src="images/phone.svg" size="50%">',
      img1Enabled: true,
      link1: '<a class="link" href="tel:+998331414141">+998331414141</a>',
      link1Enabled: true,
      
      img2: 'mail.svg',
      img2Enabled: true,
      link2: 'najmiddin4141@gmail.com',
      link2Enabled: true,
      
      img3: 'telegram.svg',
      img3Enabled: true,
      link3: 'Telegram',
      link3Enabled: true,
      
      img4: 'linkedin.svg',
      img4Enabled: true,
      link4: 'Linkedin',
      link4Enabled: true,
      
      img5: 'facebook.svg',
      img5Enabled: false,
      link5: 'Facebook',
      link5Enabled: false,
      
      qrCode: 'qr_code.svg',
      qrCodeEnabled: true,
      
      authorText: '© 2025 NJ Design (Najmiddin Nurmuxamedov). Barcha huquqlar himoyalangan.',
      authorTextEnabled: true
    }
  ];

export interface IStorage {
  getContent(): Promise<ContentBlock[]>;
  updateContent(content: ContentBlock[]): Promise<void>;
  getPassword(): Promise<string>;
  updatePassword(password: string): Promise<void>;
}

export class FileStorage implements IStorage {
    private dataPath: string;

    constructor() {
        this.dataPath = path.join(process.cwd(), 'server', 'data', 'content.json');
        this.init();
    }

    private async init() {
        try {
            await fs.mkdir(path.dirname(this.dataPath), { recursive: true });
            try {
                await fs.access(this.dataPath);
            } catch {
                await fs.writeFile(this.dataPath, JSON.stringify(DEFAULT_DATA, null, 2));
            }
        } catch (error) {
            console.error("Failed to initialize storage:", error);
        }
    }

    async getContent(): Promise<ContentBlock[]> {
        try {
            const data = await fs.readFile(this.dataPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // If file read fails, try re-initializing or return default
            return DEFAULT_DATA;
        }
    }

    async updateContent(content: ContentBlock[]): Promise<void> {
        await fs.writeFile(this.dataPath, JSON.stringify(content, null, 2));
    }

    async getPassword(): Promise<string> {
        try {
            const authPath = path.join(path.dirname(this.dataPath), 'auth.json');
            const data = await fs.readFile(authPath, 'utf-8');
            return JSON.parse(data).password;
        } catch {
            return "12345678"; // Default password
        }
    }

    async updatePassword(password: string): Promise<void> {
        const authPath = path.join(path.dirname(this.dataPath), 'auth.json');
        await fs.writeFile(authPath, JSON.stringify({ password }, null, 2));
    }
}

export const storage = new FileStorage();

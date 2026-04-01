import {
  Target,
  Briefcase,
  LayoutTemplate,
  Cpu,
  ShoppingBag,
  ShoppingCart,
  BookOpen,
  Vote,
  Globe2,
  CalendarDays,
  Facebook,
  Twitter,
  Linkedin,
  Code2,
  Presentation,
} from 'lucide-react';

// --- โครงสร้างคำถามแบบมีเงื่อนไข (Branching Logic & Step Mapping) ---
const questionMap = {
  // ==========================================
  // STEP 1: ประเภทโครงการ
  // ==========================================
  q_project_type: {
    stepGroup: 1,
    title: "โปรเจคของคุณเป็นรูปแบบไหน?",
    description: "เพื่อเลือก Framework ที่เหมาะสมที่สุดในการวิเคราะห์",
    type: "single",
    options: [
      {
        label: "โครงการระยะสั้น / แคมเปญ",
        value: "short-term",
        next: "q_short_category",
        icon: <Target className="w-8 h-8" />,
        desc: "เน้นสร้างผลกระทบ (Impact) ในเวลาที่จำกัด เช่น รณรงค์การเลือกตั้ง, โครงการเพื่อสังคม (NGOs), จัดอีเวนต์",
        features: ["ใช้ Mission Model Canvas (MMC)", "เพิ่มระบบ OKRs เพื่อวัดผลลัพธ์"],
      },
      {
        label: "โครงการระยะยาว / ธุรกิจ",
        value: "long-term",
        next: "q_long_industry",
        icon: <Briefcase className="w-8 h-8" />,
        desc: "เน้นความยั่งยืนและการสร้างรายได้ เช่น ขายผลิตภัณฑ์ชุมชน (OTOP), สร้าง Tech Startup, เปิดร้านค้า",
        features: ["ใช้ Business Model Canvas (BMC)", "เน้นวิเคราะห์กำไร ขาดทุน และกระแสรายได้"],
      },
    ],
  },

  // ==========================================
  // STEP 2: บริบท (Discovery)
  // ==========================================
  q_long_industry: {
    stepGroup: 2,
    title: "อุตสาหกรรมหรือหมวดหมู่ของธุรกิจคุณคืออะไร?",
    description: "เลือกหมวดหมู่ที่ตรงกับธุรกิจของคุณมากที่สุด",
    type: "single",
    options: [
      { label: "เทคโนโลยี / ซอฟต์แวร์", value: "Tech", next: "q_long_tech_spec", icon: <Cpu className="w-6 h-6" />, desc: "Tech Startup, SaaS, App" },
      { label: "ธุรกิจท้องถิ่น / OTOP", value: "OTOP", next: "q_long_otop_spec", icon: <ShoppingBag className="w-6 h-6" />, desc: "สินค้าชุมชน, งานคราฟต์" },
      { label: "ค้าปลีก / E-commerce", value: "Retail", next: "q_long_retail_spec", icon: <ShoppingCart className="w-6 h-6" />, desc: "ขายออนไลน์, หน้าร้าน" },
      { label: "การศึกษา / บริการ", value: "Service", next: "q_long_target", icon: <BookOpen className="w-6 h-6" />, desc: "คอร์สเรียน, เอเจนซี่, ที่ปรึกษา" },
    ],
    otherOption: { next: "q_long_target" },
  },

  q_long_tech_spec: {
    stepGroup: 2,
    title: "เป็นเทคโนโลยีด้านไหน?",
    type: "single",
    options: [
      { label: "AI & Machine Learning", value: "AI/ML", next: "q_long_target" },
      { label: "SaaS (Software as a Service)", value: "SaaS", next: "q_long_target" },
      { label: "Mobile Application / Web App", value: "App", next: "q_long_target" },
      { label: "Hardware / IoT", value: "Hardware", next: "q_long_target" },
    ],
    otherOption: { next: "q_long_target" },
  },

  q_long_otop_spec: {
    stepGroup: 2,
    title: "ประเภทสินค้า OTOP หรือสินค้าท้องถิ่นคืออะไร?",
    type: "single",
    options: [
      { label: "อาหาร / เครื่องดื่ม / แปรรูป", value: "Food/Beverage", next: "q_long_target" },
      { label: "เสื้อผ้า / เครื่องแต่งกาย / ผ้าทอ", value: "Clothing/Textile", next: "q_long_target" },
      { label: "ของใช้ / ของตกแต่งบ้าน / สมุนไพร", value: "Home/Herbs", next: "q_long_target" },
    ],
    otherOption: { next: "q_long_target" },
  },

  q_long_retail_spec: {
    stepGroup: 2,
    title: "ช่องทางการขายหลักของคุณคืออะไร?",
    type: "single",
    options: [
      { label: "ขายออนไลน์ 100% (Shopee, Lazada, TikTok)", value: "Online 100%", next: "q_long_target" },
      { label: "มีหน้าร้าน (Physical Store)", value: "Physical Store", next: "q_long_target" },
      { label: "Omnichannel (ออนไลน์ร่วมกับหน้าร้าน)", value: "Omnichannel", next: "q_long_target" },
    ],
  },

  q_short_category: {
    stepGroup: 2,
    title: "หมวดหมู่ของแคมเปญหรือโครงการคืออะไร?",
    description: "เลือกหมวดหมู่ที่ตรงกับโครงการของคุณมากที่สุด",
    type: "single",
    options: [
      { label: "การเมือง / รณรงค์การเลือกตั้ง", value: "Politics / Election", next: "q_short_target", icon: <Vote className="w-6 h-6" /> },
      { label: "เพื่อสังคม / สิ่งแวดล้อม (NGO)", value: "Social / Environment", next: "q_short_target", icon: <Globe2 className="w-6 h-6" /> },
      { label: "การศึกษา / ให้ความรู้", value: "Education Campaign", next: "q_short_target", icon: <BookOpen className="w-6 h-6" /> },
      { label: "อีเวนต์ / งานจัดแสดง", value: "Event / Exhibition", next: "q_short_target", icon: <CalendarDays className="w-6 h-6" /> },
    ],
    otherOption: { next: "q_short_target" },
  },

  // ==========================================
  // STEP 3: เจาะลึกรายละเอียด (Model & OKRs)
  // ==========================================
  q_long_target: {
    stepGroup: 3,
    title: "ใครคือกลุ่มลูกค้าเป้าหมายหลัก (Customer Segments)?",
    description: "สามารถเลือกได้มากกว่า 1 ข้อ",
    type: "multiple",
    options: [
      { label: "B2C - กลุ่มวัยรุ่น / นักศึกษา", value: "B2C Youth" },
      { label: "B2C - กลุ่มวัยทำงาน / ครอบครัว", value: "B2C Adults/Family" },
      { label: "B2C - ผู้สูงอายุ", value: "B2C Seniors" },
      { label: "B2B - ธุรกิจขนาดเล็ก (SME) / ร้านค้า", value: "B2B SME" },
      { label: "B2B - องค์กรขนาดใหญ่ (Enterprise)", value: "B2B Enterprise" },
      { label: "B2G - หน่วยงานรัฐบาล", value: "B2G Government" },
    ],
    next: "q_long_value",
  },

  q_long_value: {
    stepGroup: 3,
    title: "จุดเด่นที่ทำให้ลูกค้าต้องเลือกคุณ (Value Proposition)?",
    description: "เลือกจุดเด่นหลักเพียง 1 ข้อ (หรือพิมพ์เพิ่ม)",
    type: "single",
    options: [
      { label: "ราคาคุ้มค่า / ถูกกว่าตลาด", value: "Price/Value", desc: "Cost Leadership" },
      { label: "คุณภาพสูง / พรีเมียม", value: "Quality/Premium", desc: "High Quality" },
      { label: "นวัตกรรม / แก้ปัญหาที่ไม่มีใครแก้ได้", value: "Innovation", desc: "Tech/Innovation" },
      { label: "ความสะดวกสบาย / ใช้งานง่าย", value: "Convenience", desc: "Usability" },
      { label: "ความเป็นเอกลักษณ์ / วัฒนธรรม", value: "Uniqueness", desc: "Culture/Art" },
    ],
    otherOption: { next: "q_long_revenue" },
    nextLevelFallback: "q_long_revenue",
  },

  q_long_revenue: {
    stepGroup: 3,
    title: "โมเดลการสร้างรายได้ (Revenue Streams)?",
    description: "สามารถเลือกได้มากกว่า 1 ข้อ",
    type: "multiple",
    options: [
      { label: "ขายขาด (One-time Sales)", value: "One-time Sales" },
      { label: "เก็บค่าสมาชิก (Subscription / Recurring)", value: "Subscription" },
      { label: "ส่วนแบ่งรายได้ / ค่าคอมมิชชั่น (Commission / Fee)", value: "Commission" },
      { label: "รายได้จากโฆษณา (Advertising)", value: "Advertising" },
    ],
    otherOption: true,
    next: "q_long_activities",
  },

  q_long_activities: {
    stepGroup: 3,
    title: "กิจกรรมหลักที่ต้องทำเพื่อให้ธุรกิจเดินหน้า?",
    description: "สามารถเลือกได้มากกว่า 1 ข้อ",
    type: "multiple",
    options: [
      { label: "การผลิต / สร้างสินค้า", value: "Production" },
      { label: "การตลาดและการขาย", value: "Marketing/Sales" },
      { label: "การวิจัยและพัฒนา (R&D)", value: "R&D" },
      { label: "บริการหลังการขาย / ซัพพอร์ต", value: "Customer Support" },
      { label: "ดูแลและพัฒนาแพลตฟอร์ม", value: "Platform Management" },
    ],
    next: "q_platform",
  },

  q_short_target: {
    stepGroup: 3,
    title: "ผู้ได้รับประโยชน์ (Beneficiaries) คือใคร?",
    description: "สามารถเลือกได้มากกว่า 1 ข้อ",
    type: "multiple",
    options: [
      { label: "คนรุ่นใหม่ / First-time voters", value: "Youth / First-time voters" },
      { label: "ประชาชนทั่วไปในพื้นที่เฉพาะ", value: "Local Citizens" },
      { label: "กลุ่มเปราะบาง / ผู้ด้อยโอกาส", value: "Vulnerable Groups" },
      { label: "หน่วยงานรัฐ หรือ ผู้กำหนดนโยบาย", value: "Policymakers" },
    ],
    otherOption: true,
    next: "q_short_objective",
  },

  q_short_objective: {
    stepGroup: 3,
    title: "เป้าหมายหลักสูงสุดของโครงการนี้ (Objective)?",
    type: "single",
    options: [
      { label: "สร้างความตระหนักรู้ (Awareness)", value: "Awareness" },
      { label: "กระตุ้นให้เกิดการลงมือทำ (Call to Action)", value: "Call to Action", desc: "เช่น โหวต, สมัคร, บริจาค" },
      { label: "ผลักดันให้เกิดการเปลี่ยนแปลงเชิงนโยบาย", value: "Policy Change" },
      { label: "ระดมทุน (Fundraising)", value: "Fundraising" },
    ],
    otherOption: { next: "q_short_metric" },
    nextLevelFallback: "q_short_metric",
  },

  q_short_metric: {
    stepGroup: 3,
    title: "ตัวชี้วัดความสำเร็จ (Key Results / OKRs)?",
    description: "เลือกวิธีการวัดผล (สามารถเลือกได้มากกว่า 1 ข้อ)",
    type: "multiple",
    options: [
      { label: "ยอด Reach / ยอดวิว / Engagement", value: "Social Media Engagement" },
      { label: "จำนวนผู้เข้าร่วมงาน / อาสาสมัคร", value: "Number of Participants" },
      { label: "จำนวนเงินที่ระดมทุนได้", value: "Funds Raised" },
      { label: "จำนวนรายชื่อผู้สนับสนุน (Petition)", value: "Petition Signatures" },
    ],
    otherOption: true,
    next: "q_short_channels",
  },

  q_short_channels: {
    stepGroup: 3,
    title: "ช่องทางหลักในการสื่อสาร (Deployment Channels)?",
    description: "สามารถเลือกได้มากกว่า 1 ข้อ",
    type: "multiple",
    options: [
      { label: "Social Media (Facebook, TikTok, X)", value: "Social Media" },
      { label: "ลงพื้นที่จัดกิจกรรม (On-ground)", value: "On-ground" },
      { label: "สื่อมวลชน / ข่าว / PR", value: "Mass Media" },
      { label: "พาร์ทเนอร์ / Influencer / ผู้นำชุมชน", value: "Influencers/Partners" },
    ],
    next: "q_platform",
  },

  // ==========================================
  // STEP 4: ตัวอย่างสไตล์
  // ==========================================
  q_platform: {
    stepGroup: 4,
    title: "ช่องทางหลักที่คุณจะนำผลลัพธ์ของ AI ไปใช้งาน?",
    description: "เพื่อกำหนด Tone of Voice และโครงสร้างเนื้อหาให้อัตโนมัติ",
    type: "single",
    options: [
      { label: "Facebook / Meta", value: "Facebook", next: "q_sample_text", icon: <Facebook className="w-6 h-6" />, desc: "เน้นเล่าเรื่อง, แชร์ง่าย" },
      { label: "X / Twitter", value: "X / Twitter", next: "q_sample_text", icon: <Twitter className="w-6 h-6" />, desc: "กระชับ, ไวรัลรวดเร็ว" },
      { label: "LinkedIn", value: "LinkedIn", next: "q_sample_text", icon: <Linkedin className="w-6 h-6" />, desc: "ทางการ, เชิงธุรกิจ" },
      { label: "Codebase / IDE", value: "Codebase / IDE", next: "q_sample_text", icon: <Code2 className="w-6 h-6" />, desc: "Cursor, GitHub Copilot" },
      { label: "Pitch Deck", value: "Pitch Deck", next: "q_sample_text", icon: <Presentation className="w-6 h-6" />, desc: "Presentation นำเสนอ" },
    ],
    otherOption: { next: "q_sample_text" },
  },

  q_sample_text: {
    stepGroup: 4,
    title: "วางตัวอย่างผลงาน / สไตล์การเขียน หรือ โค้ดของคุณ",
    description: "วางบทความ โพสต์เก่า หรือโค้ดที่คุณเขียน เพื่อให้ AI ลอกเลียนแบบสไตล์ของคุณ (ถ้าไม่มี สามารถข้ามได้)",
    type: "textarea",
    next: "REVIEW",
  },
};

export default questionMap;

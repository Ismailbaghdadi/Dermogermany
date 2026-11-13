# صفحة Centre Dermogermany

صفحة هبوط (Landing Page) لسنتر Centre Dermogermany بعين السبع، الدار البيضاء، مبنية بـ **Next.js** (App Router + TypeScript + Tailwind CSS). الصفحة باللغة العربية المغربية، من اليمين لليسار (RTL)، وفيها استمارة متعددة الخطوات كتسجل كل طلب مباشرة فـ Google Sheets عبر نقطة نهاية (API) جانب السيرفر.

---

## 1. البنية العامة للمشروع

```
app/
  page.tsx                 الصفحة الرئيسية (Header + Hero + الباقات + الاستمارة + Footer)
  thank-you/page.tsx       صفحة الشكر بعد إرسال الطلب
  api/submit-lead/route.ts نقطة النهاية جانب السيرفر: فحص المعلومات، تصنيف الطلب، الحفظ فـ Google Sheets
  layout.tsx                الهيكل العام (RTL، الخط، تفعيل أكواد التتبع)
  globals.css                الألوان والخط

components/
  Header.tsx, Footer.tsx, Hero.tsx, PackagesSection.tsx, HowItWorks.tsx
  PixelScripts.tsx           كود Meta Pixel و TikTok Pixel (كيتفعل غير إلا كان فيه ID)
  form/                      الاستمارة متعددة الخطوات (الخطوات، الأسئلة، زرور التالي/رجوع، شريط التقدم)

lib/
  types.ts                   أنواع المعلومات (TypeScript)
  options.ts                 الباقات، الأحياء، الأجوبة... (كل النصوص العربية فهاد الملف وفـ المكونات)
  validation.ts               فحص رقم الهاتف المغربي
  classifyLead.ts              منطق تصنيف الطلب (جاهزة / خاصها معلومات / اهتمام ضعيف)
  googleSheets.ts                الاتصال بـ Google Sheets (جانب السيرفر فقط)
  pixels.ts                      دوال تفعيل Meta Pixel و TikTok Pixel
```

**مهم:** ما كايناش أي ملف فيه كلمة السر أو المفاتيح السرية فالكود. كلشي كيتقرا من المتغيرات البيئية (Environment Variables) اللي كاينة فـ `.env.local` (محليا) أو فإعدادات الاستضافة (Vercel مثلا).

---

## 2. التشغيل محليا

```bash
npm install
cp .env.example .env.local   # عمر القيم الحقيقية فـ .env.local
npm run dev
```

الصفحة كتبان على `http://localhost:3000`.

---

## 3. ربط Google Sheets (خطوة بخطوة)

### أ. إنشاء أو اختيار الـ Google Sheet

1. حلي [sheets.google.com](https://sheets.google.com) وصنعي شيت جديد (أو استعملي شيت كاين).
2. سمي أول ورقة (Tab) بـ `Leads` (أو سمية آخرى، وغادي تحطيها فـ `GOOGLE_SHEETS_SHEET_NAME`).
3. خاصك الـ Sheet ID، كاين فـ رابط الشيت:
   `https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXXXXXXXXX/edit`
   الجزء `XXXXXXXXXXXXXXXXXXXXXXXXXXXX` هو الـ `GOOGLE_SHEETS_SPREADSHEET_ID`.

> لا داعي لإضافة صف العناوين (Headers) بيديك — الكود كيضيفها وحدو أول مرة كيتسجل فيها طلب فـ ورقة خاوية.

### ب. إنشاء Service Account (حساب خدمة من Google)

1. حلي [Google Cloud Console](https://console.cloud.google.com/).
2. صنعي مشروع جديد (أو استعملي واحد كاين).
3. من "APIs & Services" > "Library"، فعلي **Google Sheets API**.
4. من "APIs & Services" > "Credentials" > "Create Credentials" > **Service Account**.
5. عمرها بإسم (مثلا `dermo-leads`)، وكملي الإنشاء.
6. من صفحة الـ Service Account، دخلي لـ "Keys" > "Add Key" > "Create new key" > اختاري **JSON**، وتحمل عندك ملف JSON.
7. فهاد الملف غادي تلقى:
   - `client_email` → هو `GOOGLE_SHEETS_CLIENT_EMAIL`
   - `private_key` → هو `GOOGLE_SHEETS_PRIVATE_KEY` (خليه بكامل السطور، بما فيها `-----BEGIN PRIVATE KEY-----` و `-----END PRIVATE KEY-----`)

### ج. مشاركة الـ Sheet مع Service Account

1. رجعي للـ Google Sheet.
2. دوزي "Share" (مشاركة).
3. لصقي الإيميل ديال الـ Service Account (`client_email`) وعطيها صلاحية **Editor**.
4. بدون هاد الخطوة، الكود ما غاديش يقدر يكتب فالشيت.

### د. تعمير المتغيرات البيئية

محليا، فملف `.env.local` (ماشي `.env.example`):

```
GOOGLE_SHEETS_SPREADSHEET_ID=...
GOOGLE_SHEETS_CLIENT_EMAIL=...
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SHEET_NAME=Leads
```

فـ Vercel (أو أي استضافة آخرى): Project Settings > Environment Variables، وزيدي نفس المتغيرات الأربعة لـ Production (و Preview إلا بغيتي).

> `GOOGLE_SHEETS_PRIVATE_KEY` خاصها تبقى بـ `\n` كيما هي (ماشي أسطر حقيقية) إلا كنتي كتلصقها فـ Vercel كقيمة واحدة؛ الكود كيتعامل مع الحالتين.

### هـ. النشر (Deploy) والتأكد

1. انشري المشروع (مثلا على Vercel: `vercel --prod` أو عبر الربط بـ GitHub).
2. تأكدي أن المتغيرات البيئية الأربعة مزيدين فـ الاستضافة.
3. دخلي للصفحة المنشورة، عمري الاستمارة بمعلومات تجريبية، وصيفطي الطلب.
4. حلي الـ Google Sheet وتأكدي أن صف جديد ظهر (مع صف العناوين أول مرة).

إلا ما ظهرش الصف: شوفي الـ logs ديال الاستضافة (مثلا Vercel > Deployments > Logs) — رسالة الخطأ غادي تبين شنو ناقص (Sheet ID؟ الصلاحية؟ المفتاح؟).

---

## 4. أعمدة الشيت

كل طلب كيتسجل كصف وحد، بهاد الترتيب:

| العمود | المعنى |
|---|---|
| تاريخ ووقت الطلب | بتوقيت الدار البيضاء |
| الاسم | الاسم الشخصي |
| رقم الهاتف | بصيغة `+212...` |
| الباقة المختارة | |
| اختيار المنطقة الواحدة، إلا كان مناسباً | غير إلا اختارت "منطقة واحدة" |
| الحي | |
| وقت البدء | |
| نية التواصل | |
| القدرة على المجيء للسنتر | |
| الوقت المناسب للاتصال | |
| الموافقة على التواصل | |
| حالة الطلب | مهتمة وجاهزة للاتصال / خاصها معلومات أكثر / اهتمام ضعيف أو خارج المنطقة |
| سبب تصنيف الطلب | شرح قصير لليه تصنف الطلب هكا |
| مصدر الإعلان UTM | `utm_source` |
| الحملة الإعلانية | `utm_campaign` |
| الإعلان | `utm_content` |
| رابط الصفحة ومصدر الزيارة | الرابط اللي زارت منه الصفحة + referrer |

**كل الطلبات الصحيحة كيتسجلو، حتى الطلبات ديال "اهتمام ضعيف / خارج المنطقة"** — باش الفريق يقدر يراجعها بيديه إلا بان فيها فرصة.

---

## 5. Meta Pixel و TikTok Pixel

الصفحة خدامة بشكل كامل حتى بلا Pixel IDs. ملي توصلك الـ IDs:

1. زيديهم فـ `.env.local` محليا، وفـ Environment Variables فالاستضافة:
   ```
   NEXT_PUBLIC_META_PIXEL_ID=xxxxxxxxxxxxxxx
   NEXT_PUBLIC_TIKTOK_PIXEL_ID=XXXXXXXXXXXXXXXXXXXX
   ```
2. ما كاين شي تعديل آخر فالكود — `components/PixelScripts.tsx` كيقرا هاد المتغيرات وحدو.

**شنو كيتبعت للـ Pixels:**
- عند فتح الصفحة: `PageView` (Meta) و `page()` (TikTok) — تلقائي من كود التفعيل نفسه.
- عند نجاح إرسال الاستمارة (من بعد ما يتسجل الطلب فـ Google Sheets بنجاح): `Lead` (Meta) و `SubmitForm` (TikTok).
- إلا كان تصنيف الطلب "مهتمة وجاهزة للاتصال": كيتبعت event زائد `QualifiedLead` (Meta و TikTok).

**ما كايتبعتش للـ Pixels:** الاسم، رقم الهاتف، الباقة، الحي، ولا أي جواب آخر ديال الاستمارة — غير اسم الـ event.

الكود موجود فـ:
- `components/PixelScripts.tsx` (تفعيل الـ base code ديال كل Pixel)
- `lib/pixels.ts` (الدوال اللي كتصيفط الـ events)
- `components/form/LeadForm.tsx` (فين كيتصيفطو الـ events من بعد النجاح)

---

## 6. منطق تصنيف الطلب

موجود فـ `lib/classifyLead.ts`:

- **اهتمام ضعيف / خارج المنطقة**: إلا قالت "ما بغيتش يتاصلوا بيا"، أو "لا" على سؤال القدرة على المجيء، أو ساكنة "خارج الدار البيضاء".
- **مهتمة وجاهزة للاتصال**: اختارت باقة محددة (ماشي "مازال ما عرفتش")، وبغات التواصل بخصوص الموعد، وبغات تبدا هاد السيمانة أو هاد الشهر، وأكدت أنها تقدر تجي للسنتر.
- **خاصها معلومات أكثر**: كل الحالات الباقية.

---

## 7. حدود وملاحظات مهمة

- الصفحة ما كتأكدش أي موعد — غير الفريق هو اللي كيأكد من بعد ما يتصل.
- عدد الجلسات مذكور فكل باقة (جلسة واحدة للباقة الأولى، 7 جلسات للباقات الأخرى).
- رقم الهاتف كيتأكد بصيغ: `06XXXXXXXX`، `07XXXXXXXX`، `+2126...`، `+212 7...`.
- إلا فشل الحفظ فـ Google Sheets، الاستمارة كتبقى بأجوبتها، وكتبان رسالة خطأ واضحة بالعربية باش تعاود المحاولة — ما كتبانش صفحة الشكر حتى يتأكد الحفظ.

---

## 8. شنو خاص المسؤول عن السنتر يوفر (ما كنقدرش نكملو بلاه)

1. **لوغو السنتر الحقيقي** — دابا الهيدر فيه رمز مؤقت (دائرة "DG"). ملي توصل صورة اللوغو، خاصها تحط فـ `public/` وتربط فـ `components/Header.tsx` و `components/Footer.tsx`.
2. **حساب Google و Service Account** — خاص صاحب الحساب (أو شي واحد عندو صلاحية) يتبع الخطوات فالفصل 3.
3. **Meta Pixel ID و TikTok Pixel ID** — غادي نزيدهم ملي توصلو، بلا أي تعديل آخر فالكود.
4. **اسم النطاق (Domain) والاستضافة النهائية** إلا بغيتي دومين خاص بسنتر Dermogermany.

# صفحات روابط الصور (Image Page Locations)

بناءً على الكود المصدري، روابط الصور الموجودة في الـ screenshot (والمستخدمة للخدمات) موجودة في الصفحات التالية:

## 1. الصفحة الرئيسية (Home Page)
- **الملف:** [Home.jsx](file:///c:/Users/Geniius/services/resources/js/pages/Home.jsx)
- **الاستخدام:** 
    - صورة الـ Hero (صورة العامل المحترف) تستخدم الرابط: `https://images.unsplash.com/photo-1621905251189-08b45d6a269e`
    - قسم "الأكثر طلباً الآن" (Featured Services) يعرض كروت الخدمات (`ServiceCard`) التي تسحب صورها من قاعدة البيانات (والتي تم إنشاؤها عبر الـ Seeder باستخدام 4 روابط Unsplash).

## 2. ملف التعريف للفني (Technician Profile)
- **الملف:** [TechnicianProfile.jsx](file:///c:/Users/Geniius/services/resources/js/pages/TechnicianProfile.jsx)
- **الاستخدام:** يعرض الخدمات المرتبطة بتخصص الفني باستخدام كروت الخدمات (`ServiceCard`) التي تحتوي على نفس روابط الصور.

## 3. مكون كارت الخدمة (Service Card Component) - المكون الأساسي
- **الملف:** [ServiceCard.jsx](file:///c:/Users/Geniius/services/resources/js/components/ServiceCard.jsx)
- **الاستخدام:** هذا المكون هو المسؤول عن عرض الصور. يحتوي على رابط "fallback" (صورة احتياطية) في حال عدم وجود صورة للخدمة: `https://images.unsplash.com/photo-1621905252507-b354bcadc911`

## روابط الصور المستخدمة في قاعدة البيانات (Seeders):
تم تعريف الروابط التالية في ملف [ProjectSeeder.php](file:///c:/Users/Geniius/services/database/seeders/ProjectSeeder.php):
1. `https://images.unsplash.com/photo-1581578731548-c64695cc6954`
2. `https://images.unsplash.com/photo-1621905251189-08b45d6a269e`
3. `https://images.unsplash.com/photo-1595844730298-b960ff98fee0`
4. `https://images.unsplash.com/photo-1558618666-fcd25c85cd6b`

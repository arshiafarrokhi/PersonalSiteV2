# انتشار و سوییچ بین v1 و v2

دامنهٔ اصلی: <https://arshiafarrokhi.ir/>. پروژهٔ Vercel: `arshias-projects/personal-site-v2`.

در ۱۸ اکتبر ۲۰۲۶، `main` به‌صورت fast-forward به نسخهٔ Windows 98 منتقل و Production منتشر شد. برنچ `v1` همچنان روی `3140ae6e09e2a7d1026a92ea4026be8a61bae1d6` محفوظ است. برنچ `v2` نسخهٔ جدید را نگه می‌دارد. تنظیم Branch Tracking همچنان `main` و Auto-Assign Custom Production Domains فعال است.

## سوییچ سریع از پنل Vercel

| نسخه           | Deployment آماده                                                                                          | commit نسخهٔ اجرایی |
| -------------- | --------------------------------------------------------------------------------------------------------- | ------------------- |
| v1، سایت قبلی  | [بازکردن v1 در Vercel](https://vercel.com/arshias-projects/personal-site-v2/Adsivsq1MjMpudby11cCNGjVi1sH) | `3140ae6`           |
| v2، Windows 98 | [بازکردن v2 در Vercel](https://vercel.com/arshias-projects/personal-site-v2/HXUmWHZJhjFbsk9grudYRHRVvxMu) | `e458e2d`           |

۱. لینک نسخهٔ موردنظر را از جدول باز کن.

۲. منوی سه‌نقطهٔ **Deployment Actions** را باز کن و **Promote** را بزن.

۳. در پنجرهٔ تأیید، نسخه و مقصد `arshiafarrokhi.ir` را کنترل کن و **Promote** را بزن. پس از پایان عملیات، دامنه را Refresh کن. نسخه‌ای که همین الان فعال است نیازی به Promote ندارد.

این مسیر برای v1 تا پنجرهٔ تأیید بررسی شد و سپس با Cancel بسته شد؛ حین بررسی، سایت به v1 برگردانده نشد. گزینهٔ Instant Rollback نیز در همان منو برای بازگشت اضطراری وجود دارد.

این کار به تغییر DNS یا حذف سایت احتیاج ندارد. برنچ‌ها و تاریخچهٔ گیت را تغییر نمی‌دهد. **اگر بعداً روی `main` push کنی، انتشار موفق بعدی می‌تواند نسخهٔ انتخاب‌شده را جایگزین کند.** بعد از سوییچ موقت به v1، پیش از push به `main` این موضوع را در نظر بگیر.

Deploymentهای قدیمی تابع سیاست نگهداری Vercel هستند؛ آن‌ها را تنها نسخهٔ پشتیبان حساب نکن. برنچ‌های گیت برای ساخت مجدد نسخه‌ها محفوظ‌اند.

## انتشار تغییرات بعدی v2

تغییرات را روی `v2` توسعه و بررسی کن. سپس برای انتشار روی دامنه، در یک working tree تمیز:

```sh
git fetch origin
git switch main
git pull --ff-only origin main
git merge --ff-only v2
git push origin main
```

اگر merge با `--ff-only` متوقف شد، تاریخچه‌ها از هم جدا شده‌اند؛ از reset یا force-push استفاده نکن و اختلاف را بررسی کن. برنچ `v1` را به‌عنوان snapshot نسخهٔ قبلی نگه دار. merge کردن `v1` داخل `main` فعلی، نسخهٔ قبلی را فعال نمی‌کند، چون `v1` از اجداد `main` است.

## بررسی بعد از انتشار

در [Deployments](https://vercel.com/arshias-projects/personal-site-v2/deployments)، وضعیت Ready، محیط Production، commit موردنظر و دامنه را کنترل کن. سپس صفحهٔ اصلی، یک مسیر داخلی مثل `/resume/pavan` و Refresh آن را بررسی کن. فایل‌های `/assets/` باید JavaScript/CSS واقعی برگردانند؛ پاسخ HTML یا صفحهٔ ورود Vercel، بررسی موفق asset محسوب نمی‌شود.

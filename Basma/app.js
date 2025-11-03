// ---------- Elements ----------
const form = document.getElementById('composer');
const input = document.getElementById('input');
const list = document.getElementById('timeline');
const scroll = document.getElementById('scroll');
const chips = document.getElementById('chips');

const btnEn = document.getElementById('btnEn');
const btnAr = document.getElementById('btnAr');

// ---------- Utilities ----------
const tz = 'Asia/Bahrain'; // keep timestamps consistent with BH time
function nowStamp(locale = document.documentElement.lang || 'en-BH') {
  const d = new Date();
  const time = d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: tz });
  const day = d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: tz });
  return `${time} ${day}`;
}

function scrollToBottom() {
  requestAnimationFrame(() => { scroll.scrollTop = scroll.scrollHeight; });
}

function bubble({ html, text, who = 'user', avatar = null }) {
  const section = document.createElement('section');
  section.className = `msg ${who}`;
  section.setAttribute('aria-label', who === 'user' ? 'User message' : 'Basma message');

  const avatarEl = document.createElement('div');
  avatarEl.className = `avatar ${who}`;
  avatarEl.setAttribute('aria-hidden', 'true');

  if (who === 'bot') {
    const img = document.createElement('img');
    img.src = 'batelco_logo.png';
    img.alt = 'Batelco logo';
    avatarEl.appendChild(img);
  } else {
    avatarEl.textContent = avatar || 'H';
  }


  // Use Basma SVG for bot avatar
  if (who === 'bot') {
    const img = document.createElement('img');
    img.src = 'basma.png';
    img.alt = 'Basma avatar';
    avatarEl.textContent = ''; // clear any text
    avatarEl.appendChild(img);
  } else {
    avatarEl.textContent = avatar || 'H';
  }


  const time = document.createElement('div');
  time.className = 'time';
  time.textContent = nowStamp();

  const bubbleEl = document.createElement('div');
  bubbleEl.className = 'bubble';
  if (html) bubbleEl.innerHTML = html; else bubbleEl.textContent = text || '';

  const right = document.createElement('div');
  right.appendChild(bubbleEl);
  right.appendChild(time);

  if (who === 'user') {
    section.appendChild(right);
    section.appendChild(avatarEl);
  } else {
    section.appendChild(avatarEl);
    section.appendChild(right);
  }

  list.appendChild(section);
  scrollToBottom();
  return section;
}

// ---------- Seed a VOYA suggestion reply (UI-only) ----------
function egovOptions(locale = 'en') {
  if (locale === 'ar') {
    return `
      <h4>خدمات الحكومة الإلكترونية المقترحة:</h4>
      <div class="voya">
        <ol>
          <li><strong>تجديد بطاقة الهوية (CPR)</strong><br/>
            <a href="#" role="link">ابدأ الآن</a></li>
          <li><strong>دفع المخالفات المرورية</strong><br/>
            <a href="#" role="link">ابدأ الآن</a></li>
          <li><strong>دفع فاتورة الكهرباء والماء (EWA)</strong><br/>
            <a href="#" role="link">ابدأ الآن</a></li>
          <li><strong>تجديد رخصة القيادة</strong><br/>
            <a href="#" role="link">ابدأ الآن</a></li>
          <li><strong>حجز موعد لدى الجوازات (NPRA)</strong><br/>
            <a href="#" role="link">ابدأ الآن</a></li>
        </ol>
      </div>`;
  }
  return `
    <h4>Here are some eGovernment services you can use:</h4>
    <div class="voya">
      <ol>
        <li><strong>Renew CPR</strong><br/>
          <a href="#" role="link">Start</a></li>
        <li><strong>Pay Traffic Fines</strong><br/>
          <a href="#" role="link">Start</a></li>
        <li><strong>Pay EWA Bill</strong><br/>
          <a href="#" role="link">Start</a></li>
        <li><strong>Renew Driving License</strong><br/>
          <a href="#" role="link">Start</a></li>
        <li><strong>Book NPRA Appointment</strong><br/>
          <a href="#" role="link">Start</a></li>
      </ol>
    </div>`;
}
function cprForm(locale = 'en') {
  if (locale === 'ar') {
    return `
      <h4>نموذج تجديد بطاقة الهوية (CPR)</h4>
      <form id="cprForm" class="chatform" novalidate>
        <div class="row">
          <label for="cpr">رقم الهوية (CPR)</label>
          <input id="cpr" name="cpr" inputmode="numeric" placeholder="123456789" required />
          <div class="hint">أدخل رقم الهوية المكون من 9 أرقام (بدون الشرطة).</div>
          <div class="error" data-for="cpr">يرجى إدخال رقم CPR صحيح.</div>
        </div>

        <div class="row">
          <label for="dob">تاريخ الميلاد</label>
          <input id="dob" name="dob" type="date" required />
          <div class="error" data-for="dob">يرجى اختيار تاريخ الميلاد.</div>
        </div>

        <div class="row">
          <label for="mobile">رقم الهاتف</label>
          <input id="mobile" name="mobile" inputmode="tel" placeholder="+973 3xxxxxxx" required />
          <div class="hint">صيغة مقترحة: ‎+973 3xxxxxxx</div>
          <div class="error" data-for="mobile">يرجى إدخال رقم هاتف صالح في البحرين.</div>
        </div>

        <div class="row">
          <label for="email">البريد الإلكتروني</label>
          <input id="email" name="email" type="email" placeholder="name@example.com" required />
          <div class="error" data-for="email">يرجى إدخال بريد إلكتروني صالح.</div>
        </div>

        <div class="actions">
          <button class="btn" type="submit">متابعة</button>
          <button class="btn secondary" type="button" id="cancelCpr">إلغاء</button>
        </div>
      </form>
    `;
  }

  return `
    <h4>Renew CPR — Quick Form</h4>
    <form id="cprForm" class="chatform" novalidate>
      <div class="row">
        <label for="cpr">CPR Number</label>
        <input id="cpr" name="cpr" inputmode="numeric" placeholder="123456789" required />
        <div class="hint">Enter the 9-digit CPR number (no dash).</div>
        <div class="error" data-for="cpr">Please enter a valid 9-digit CPR.</div>
      </div>

      <div class="row">
        <label for="dob">Date of Birth</label>
        <input id="dob" name="dob" type="date" required />
        <div class="error" data-for="dob">Please select your date of birth.</div>
      </div>

      <div class="row">
        <label for="mobile">Mobile</label>
        <input id="mobile" name="mobile" inputmode="tel" placeholder="+973 3xxxxxxx" required />
        <div class="hint">Suggested format: +973 3xxxxxxx</div>
        <div class="error" data-for="mobile">Please enter a valid Bahrain mobile.</div>
      </div>

      <div class="row">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" placeholder="name@example.com" required />
        <div class="error" data-for="email">Please enter a valid email.</div>
      </div>

      <div class="actions">
        <button class="btn" type="submit">Continue</button>
        <button class="btn secondary" type="button" id="cancelCpr">Cancel</button>
      </div>
    </form>
  `;
}

function trafficForm(locale = 'en') {
  if (locale === 'ar') {
    return `
      <h4>الاستعلام عن المخالفات المرورية</h4>
      <form id="trafficForm" class="chatform" novalidate>
        <div class="row">
          <label for="tf_cpr">رقم الهوية (CPR)</label>
          <input id="tf_cpr" name="cpr" inputmode="numeric" placeholder="123456789" required />
          <div class="error" data-for="tf_cpr">يرجى إدخال CPR صحيح (9 أرقام).</div>
        </div>
        <div class="row">
          <label for="tf_plate">رقم اللوحة</label>
          <input id="tf_plate" name="plate" placeholder="12345" required />
          <div class="error" data-for="tf_plate">يرجى إدخال رقم لوحة صالح.</div>
        </div>
        <div class="actions">
          <button class="btn" type="submit">استعلام</button>
          <button class="btn secondary" type="button" id="cancelTraffic">إلغاء</button>
        </div>
      </form>
    `;
  }
  return `
    <h4>Traffic Fines — Lookup</h4>
    <form id="trafficForm" class="chatform" novalidate>
      <div class="row">
        <label for="tf_cpr">CPR Number</label>
        <input id="tf_cpr" name="cpr" inputmode="numeric" placeholder="123456789" required />
        <div class="error" data-for="tf_cpr">Enter a valid 9-digit CPR.</div>
      </div>
      <div class="row">
        <label for="tf_plate">Plate Number</label>
        <input id="tf_plate" name="plate" placeholder="12345" required />
        <div class="error" data-for="tf_plate">Enter a valid plate number.</div>
      </div>
      <div class="actions">
        <button class="btn" type="submit">Lookup</button>
        <button class="btn secondary" type="button" id="cancelTraffic">Cancel</button>
      </div>
    </form>
  `;
}

function ewaForm(locale = 'en') {
  if (locale === 'ar') {
    return `
      <h4>فاتورة الكهرباء والماء (EWA)</h4>
      <form id="ewaForm" class="chatform" novalidate>
        <div class="row">
          <label for="ewa_acc">رقم الحساب (EWA)</label>
          <input id="ewa_acc" name="account" placeholder="EWA-1234567" required />
          <div class="error" data-for="ewa_acc">يرجى إدخال رقم حساب صالح.</div>
        </div>
        <div class="row">
          <label for="ewa_mobile">رقم الهاتف</label>
          <input id="ewa_mobile" name="mobile" inputmode="tel" placeholder="+973 3xxxxxxx" required />
          <div class="error" data-for="ewa_mobile">يرجى إدخال رقم هاتف صالح.</div>
        </div>
        <div class="actions">
          <button class="btn" type="submit">استعلام</button>
          <button class="btn secondary" type="button" id="cancelEwa">إلغاء</button>
        </div>
      </form>
    `;
  }
  return `
    <h4>EWA Bill — Lookup</h4>
    <form id="ewaForm" class="chatform" novalidate>
      <div class="row">
        <label for="ewa_acc">EWA Account</label>
        <input id="ewa_acc" name="account" placeholder="EWA-1234567" required />
        <div class="error" data-for="ewa_acc">Enter a valid account.</div>
      </div>
      <div class="row">
        <label for="ewa_mobile">Mobile</label>
        <input id="ewa_mobile" name="mobile" inputmode="tel" placeholder="+973 3xxxxxxx" required />
        <div class="error" data-for="ewa_mobile">Enter a valid Bahrain mobile.</div>
      </div>
      <div class="actions">
        <button class="btn" type="submit">Lookup</button>
        <button class="btn secondary" type="button" id="cancelEwa">Cancel</button>
      </div>
    </form>
  `;
}

// ---------- Events ----------
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  bubble({ text: value, who: 'user', avatar: 'H' });

  // Simple demo router (UI only)
  // Simple demo router (UI only)
  // Simple demo router (UI only)
// Simple demo router (UI only)
const locale = document.documentElement.lang.startsWith('ar') ? 'ar' : 'en';
const text = value.toLowerCase();

// intent detection
const isCPR   = /(cpr|renew cpr|renewal|identity|هوية|بطاقة|تجديد)/i.test(value);
const isFine  = /(traffic|fine|fines|ticket|مخال|مرور)/i.test(value);
const isEwa   = /(ewa|bill|electric|water|كهرب|ماء|فاتور)/i.test(value);

if (isFine) {
  bubble({ html: trafficForm(locale), who: 'bot', avatar: 'B' });
} else if (isEwa) {
  bubble({ html: ewaForm(locale), who: 'bot', avatar: 'B' });
} else if (isCPR) {
  bubble({ html: cprForm(locale), who: 'bot', avatar: 'B' }); // from previous step
} else {
  bubble({
    html: locale === 'ar'
      ? 'شكرًا! سيتم تحويل سؤالك إلى الدعم لاحقًا (واجهة فقط).'
      : 'Thanks! Your question will be routed to support later (UI only).',
    who: 'bot'
  });
}



  input.value = '';
  input.focus();
});
// Handle CPR form submit inside the chat bubble (event delegation)
list.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'cprForm') {
    e.preventDefault();

    const formEl = e.target;
    const locale = document.documentElement.lang.startsWith('ar') ? 'ar' : 'en';

    const cpr    = formEl.querySelector('#cpr')?.value.trim() || '';
    const dob    = formEl.querySelector('#dob')?.value.trim() || '';
    const mobile = formEl.querySelector('#mobile')?.value.trim() || '';
    const email  = formEl.querySelector('#email')?.value.trim() || '';

    // Clear previous errors
    formEl.querySelectorAll('.error').forEach(el => el.style.display = 'none');

    // Simple validations
    let ok = true;

    // 9 digits CPR
    if (!/^[0-9]{9}$/.test(cpr)) {
      formEl.querySelector('.error[data-for="cpr"]').style.display = 'block';
      ok = false;
    }

    // Date required
    if (!dob) {
      formEl.querySelector('.error[data-for="dob"]').style.display = 'block';
      ok = false;
    }

    // Bahrain mobile (very light check): +973 3xxxxxxx or 3xxxxxxx
    if (!/^(\+973\s?)?3[0-9]{7}$/.test(mobile.replace(/\s+/g,''))) {
      formEl.querySelector('.error[data-for="mobile"]').style.display = 'block';
      ok = false;
    }

    // Basic email
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      formEl.querySelector('.error[data-for="email"]').style.display = 'block';
      ok = false;
    }

    if (!ok) return;

    // Mask CPR for display
    const masked = cpr.replace(/^([0-9]{3})([0-9]{3})([0-9]{3})$/, '$1-$2-***');

    // UI-only confirmation bubble
    const html = locale === 'ar'
      ? `<strong>تم الاستلام.</strong><br/>سنقوم ببدء عملية تجديد CPR للرقم <b>${masked}</b>.<br/><span class="muted">هذا عرض واجهة فقط — لا يتم إرسال البيانات فعليًا.</span>`
      : `<strong>Received.</strong><br/>We’ll start the CPR renewal for <b>${masked}</b>.<br/><span class="muted">UI-only demo — no data is actually sent.</span>`;

    bubble({ html, who: 'bot', avatar: 'B' });
  }
});

// Handle cancel button inside the CPR form
list.addEventListener('click', (e) => {
  const btn = e.target.closest('#cancelCpr');
  if (!btn) return;
  const locale = document.documentElement.lang.startsWith('ar') ? 'ar' : 'en';
  bubble({
    html: locale === 'ar' ? 'تم الإلغاء. كيف يمكنني مساعدتك أيضًا؟' : 'Cancelled. What else can I help with?',
    who: 'bot',
    avatar: 'B'
  });
});
// --- Utility: fake fetchers (mock data) ---
function mockTrafficFines({ cpr, plate }, locale = 'en') {
  // Deterministic fake names
  const fakeNames = [
    { en: "Ahmed Hassan", ar: "أحمد حسن" },
    { en: "Fatima Salman", ar: "فاطمة سلمان" },
    { en: "Mohammed Ali", ar: "محمد علي" },
    { en: "Sara AlBalooshi", ar: "سارة البلوشي" },
    { en: "Yousef AlHaddad", ar: "يوسف الحداد" }
  ];
  const name = fakeNames[parseInt(cpr.slice(-1) || "0", 10) % fakeNames.length];

  // Offence catalog (examples)
  const catalog = [
    {
      code: "SPD-120+",
      type_en: "Speeding",
      type_ar: "تجاوز السرعة",
      title_en: "Speeding over 120 km/h",
      title_ar: "تجاوز السرعة لأكثر من 120 كم/س",
      location: "Shaikh Khalifa Bin Salman Hwy",
      datetime: "2025-09-14 14:22",
      amount: 50.000
    },
    {
      code: "SEAT-01",
      type_en: "Seatbelt",
      type_ar: "حزام الأمان",
      title_en: "Seatbelt not fastened (driver)",
      title_ar: "حزام الأمان غير مربوط (السائق)",
      location: "Exhibition Ave, Manama",
      datetime: "2025-10-02 08:10",
      amount: 20.000
    },
    {
      code: "PHONE-02",
      type_en: "Mobile phone",
      type_ar: "الهاتف المتحرك",
      title_en: "Using mobile phone while driving",
      title_ar: "استخدام الهاتف أثناء القيادة",
      location: "Sitra Highway",
      datetime: "2025-10-18 17:43",
      amount: 25.000
    },
    {
      code: "PRK-03",
      type_en: "Parking",
      type_ar: "مخالفة موقف",
      title_en: "No-parking zone",
      title_ar: "موقف غير مسموح",
      location: "Block 338",
      datetime: "2025-10-22 21:05",
      amount: 10.000
    },
    {
      code: "RL-01",
      type_en: "Red light",
      type_ar: "إشارة حمراء",
      title_en: "Red light violation",
      title_ar: "تجاوز الإشارة الحمراء",
      location: "Seef Signal",
      datetime: "2025-09-28 19:02",
      amount: 100.000
    }
  ];

  // Pick two offences based on CPR digits for variety
  const idx = parseInt(cpr.slice(-2) || "0", 10) % catalog.length;
  const items = [catalog[idx], catalog[(idx + 2) % catalog.length]];

  const header = locale === "ar"
    ? `<h4>نتيجة الاستعلام — المخالفات المرورية</h4>`
    : `<h4>Lookup Result — Traffic Fines</h4>`;

  const labels = {
    name:  locale === "ar" ? "الاسم" : "Name",
    cpr:   locale === "ar" ? "رقم الهوية (CPR)" : "CPR Number",
    plate: locale === "ar" ? "رقم اللوحة" : "Plate Number",
    total: locale === "ar" ? "الإجمالي المستحق" : "Total Due",
    pay:   locale === "ar" ? "ادفع الآن" : "Pay Now"
  };

  const summary = `
    <div class="infoblock">
      <div class="row"><div class="label">${labels.name}</div><div class="value">${locale === 'ar' ? name.ar : name.en}</div></div>
      <div class="row"><div class="label">${labels.cpr}</div><div class="value">${cpr}</div></div>
      <div class="row"><div class="label">${labels.plate}</div><div class="value">${plate}</div></div>
    </div>
  `;

  const list = items.map(i => {
    const title = locale === "ar" ? i.title_ar : i.title_en;
    const type  = locale === "ar" ? i.type_ar  : i.type_en;
    return `
      <div class="item">
        <div>
          <div class="title">${title}</div>
          <div class="meta">${i.code} · ${i.datetime} · ${i.location}</div>
          <div class="tags">
            <span class="tag">${type}</span>
          </div>
        </div>
        <div class="money">BD ${i.amount.toFixed(3)}</div>
      </div>
    `;
  }).join("");

  const total = items.reduce((s, i) => s + i.amount, 0);

  return `
    ${header}
    ${summary}
    <div class="fines">${list}</div>
    <div class="payrow">
      <div><strong>${labels.total}:</strong> <span class="money">BD ${total.toFixed(3)}</span></div>
      <button class="btn pay" data-pay="traffic" data-amount="${total.toFixed(3)}">${labels.pay}</button>
    </div>
    <div class="muted">${locale === 'ar' ? 'عرض تجريبي للواجهة فقط.' : 'UI-only demo — data not real.'}</div>
  `;
}




function mockEwaBill({ account, mobile }, locale = 'en') {
  const amount = 18.750; // mock
  const header = locale==='ar' ? `<h4>نتيجة الاستعلام — فاتورة EWA</h4>` : `<h4>Lookup Result — EWA Bill</h4>`;
  const labels = {
    acc: locale==='ar' ? 'الحساب' : 'Account',
    mob: locale==='ar' ? 'الهاتف' : 'Mobile',
    due: locale==='ar' ? 'المبلغ المستحق' : 'Amount Due',
    pay: locale==='ar' ? 'ادفع الآن' : 'Pay Now'
  };
  return `
    ${header}
    <div class="infoblock">
      <div class="row"><div class="label">${labels.acc}</div><div class="value">${account}</div></div>
      <div class="row"><div class="label">${labels.mob}</div><div class="value">${mobile}</div></div>
      <div class="row"><div class="label">${labels.due}</div><div class="value money">BD ${amount.toFixed(3)}</div></div>
    </div>
    <div class="payrow">
      <div><strong>${labels.due}:</strong> <span class="money">BD ${amount.toFixed(3)}</span></div>
      <button class="btn pay" data-pay="ewa" data-amount="${amount.toFixed(3)}">${labels.pay}</button>
    </div>
    <div class="muted">${locale==='ar' ? 'عرض تجريبي واجهة فقط.' : 'UI-only demo.'}</div>
  `;
}

// --- Handle TRAFFIC form submit ---
list.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'trafficForm') {
    e.preventDefault();
    const formEl = e.target;
    const locale = document.documentElement.lang.startsWith('ar') ? 'ar' : 'en';

    const cpr = formEl.querySelector('#tf_cpr')?.value.trim() || '';
    const plate = formEl.querySelector('#tf_plate')?.value.trim() || '';

    // clear errors
    formEl.querySelectorAll('.error').forEach(el => el.style.display = 'none');

    let ok = true;
    if (!/^[0-9]{9}$/.test(cpr)) {
      formEl.querySelector('.error[data-for="tf_cpr"]').style.display = 'block';
      ok = false;
    }
    if (!/^[A-Za-z0-9-]{3,}$/.test(plate)) {
      formEl.querySelector('.error[data-for="tf_plate"]').style.display = 'block';
      ok = false;
    }
    if (!ok) return;

    const html = mockTrafficFines({ cpr, plate }, locale);
    bubble({ html, who: 'bot', avatar: 'B' });
  }
});

// --- Handle EWA form submit ---
list.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'ewaForm') {
    e.preventDefault();
    const formEl = e.target;
    const locale = document.documentElement.lang.startsWith('ar') ? 'ar' : 'en';

    const account = formEl.querySelector('#ewa_acc')?.value.trim() || '';
    const mobile  = formEl.querySelector('#ewa_mobile')?.value.trim() || '';

    formEl.querySelectorAll('.error').forEach(el => el.style.display = 'none');

    let ok = true;
    if (!/^[A-Za-z0-9-]{5,}$/.test(account)) {
      formEl.querySelector('.error[data-for="ewa_acc"]').style.display = 'block';
      ok = false;
    }
    if (!/^(\+973\s?)?3[0-9]{7}$/.test(mobile.replace(/\s+/g,''))) {
      formEl.querySelector('.error[data-for="ewa_mobile"]').style.display = 'block';
      ok = false;
    }
    if (!ok) return;

    const html = mockEwaBill({ account, mobile }, locale);
    bubble({ html, who: 'bot', avatar: 'B' });
  }
});

// --- Handle cancel buttons for both forms ---
list.addEventListener('click', (e) => {
  const locale = document.documentElement.lang.startsWith('ar') ? 'ar' : 'en';
  if (e.target.closest('#cancelTraffic')) {
    bubble({ html: locale==='ar' ? 'تم الإلغاء.' : 'Cancelled.', who: 'bot', avatar: 'B' });
  }
  if (e.target.closest('#cancelEwa')) {
    bubble({ html: locale==='ar' ? 'تم الإلغاء.' : 'Cancelled.', who: 'bot', avatar: 'B' });
  }
});

// --- Handle Pay Now buttons (traffic + EWA) ---
list.addEventListener('click', (e) => {
  const btn = e.target.closest('button.btn.pay');
  if (!btn) return;

  const locale = document.documentElement.lang.startsWith('ar') ? 'ar' : 'en';
  const type = btn.dataset.pay; // 'traffic' | 'ewa'
  const amount = btn.dataset.amount;

  // show a fake payment confirmation
  const msg = locale==='ar'
    ? `<strong>تم الدفع بنجاح.</strong><br/>العملية: <span class="tag">${type === 'traffic' ? 'مخالفات' : 'EWA'}</span><br/>المبلغ: <b class="money">BD ${amount}</b><br/><span class="muted">عرض واجهة فقط — لا توجد دفعة فعلية.</span>`
    : `<strong>Payment successful.</strong><br/>Type: <span class="tag">${type === 'traffic' ? 'Traffic Fines' : 'EWA Bill'}</span><br/>Amount: <b class="money">BD ${amount}</b><br/><span class="muted">UI-only demo — no real charge.</span>`;

  bubble({ html: msg, who: 'bot', avatar: 'B' });
});

// Quick reply chips
chips?.addEventListener('click', (e) => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  input.value = btn.dataset.text || btn.textContent;
  form.requestSubmit();
});

// Keyboard helper: Ctrl/Cmd+Enter to send
input.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    form.requestSubmit();
  }
});

// Language toggle (EN/AR) with RTL switch
function setLang(lang) {
  const en = lang === 'en';
  document.documentElement.lang = en ? 'en' : 'ar';
  document.documentElement.dir = en ? 'ltr' : 'rtl';
  btnEn.setAttribute('aria-pressed', en);
  btnAr.setAttribute('aria-pressed', !en);
  document.getElementById('chatTitle').textContent = en ? 'Chat with Basma' : 'الدردشة مع بسمة';
  document.getElementById('greet').textContent = en ? 'Good evening Hosam!' : 'مساء الخير يا حسام!';
  document.getElementById('intro').textContent = en ? 'You can select one of the suggested topics below to start a new chat or ask any other question.' : 'يمكنك اختيار أحد المواضيع المقترحة أدناه لبدء محادثة جديدة أو طرح أي سؤال آخر.';
  input.placeholder = en ? 'Ask me anything' : 'اسألني أي شيء';
}
btnEn.addEventListener('click', () => setLang('en'));
btnAr.addEventListener('click', () => setLang('ar'));

// Ensure initial scroll bottom
(function () { scrollToBottom(); })();

# 19-Noyabr 20:00 dan Keyin Qilingan Barcha O'zgarishlar va Ketma-ketlik

Bu hujjatda 19-noyabr soat 20:00 dan keyin loyihada qilingan barcha o'zgarishlar, ularning mantiqlari hamda **DEFINE** (qayerda ta'riflangan) va **CALL** (qayerda chaqirilib ishlatilgan) joylari 1, 2, 3, 4 ketma-ketlikda batafsil bayon etilgan.

---

## 1. SAVATCHA (BASKET) VA MAXSUS HOOK (`useBasket`) MANTIG'I

Taomlarni savatchaga qo'shish, sonini oshirish/kamaytirish, o'chirish va brauzer xotirasi (`localStorage`) bilan sinxronlashtirish tizimi qurildi.

### 1.1. `CartItem` turi (Type):
* **DEFINE (Ta'riflangan joyi):**
  * Fayl: `search.ts`
  * Ta'rif: `export interface CartItem { _id: string; quantity: number; name: string; price: number; image: string; }`
* **CALL (Ishlatilgan joylari):**
  * `useBasket.ts` (savatcha elementlarining tipi sifatida)
  * `App.tsx` (state va prop tiplarida)
  * `Basket.tsx`
  * `HomeNavbar.tsx` & `OtherNavbar.tsx`
  * `Products.tsx`, `ChosenProduct.tsx`

---

### 1.2. `useBasket` Custom Hook va uning metodlari:
* **DEFINE (Ta'riflangan joyi):**
  * Fayl: `useBasket.ts`
  * Mantiqlar:
    1. `localStorage.getItem("cartData")` orqali mavjud savatchani o'qib olish.
    2. `onAdd(input: CartItem)`: agar taom savatchada bo'lsa `quantity + 1`, yangi bo'lsa ro'yxatga qo'shish va `localStorage.setItem` qilish.
    3. `onRemove(input: CartItem)`: agar taom soni 1 bo'lsa to'liq o'chirish, ko'p bo'lsa `quantity - 1` qilish va `localStorage`ni yangilash.
    4. `onDelete(input: CartItem)`: tanlangan bitta mahsulotni to'liq o'chirib tashlash.
    5. `onDeleteAll()`: butun savatchani bo'shatish va `localStorage.removeItem("cartData")`.
* **CALL (Ishlatilgan joylari):**
  * **Chaqirish nuqtasi:** `App.tsx`
    ```typescript
    const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
    ```
  * `onAdd` uzatilib ishlatilgan joylar:
    * `Products.tsx` (Taom kartasidagi savatcha tugmasi bosilganda: `onClick={() => onAdd(...) }`)
    * `ChosenProduct.tsx` (Tanlangan taom sahifasidagi "Add to Cart" tugmasida)
  * `cartItems`, `onAdd`, `onRemove`, `onDelete`, `onDeleteAll` uzatilib ishlatilgan joylar:
    * `Basket.tsx` (Savatcha popover oynasida `+`, `-`, o'chirish va umumiy narxni hisoblashda)
    * `HomeNavbar.tsx` & `OtherNavbar.tsx`

---

## 2. SWEETALERT2 VA AUTENTIFIKATSIYA MODALI (`AuthenticationModal`)

Xabarlarni chiroyli ko'rsatish (Toast / Popups) hamda Login va Signup uchun yagona modal oyna yaratildi.

### 2.1. SweetAlert yordamchi funksiyalari:
* **Kutubxona:** `sweetalert2` o'rnatildi (`package.json`, `yarn.lock`).
* **DEFINE (Ta'riflangan joyi):**
  * Fayl: `sweetAlert.ts`
  * Funksiyalar:
    * `sweetErrorHandling(err)` — xatoliklarni qizil alertda ko'rsatish.
    * `sweetTopSuccessAlert(msg, duration)` — ekranning yuqori o'ng burchagida muvaffaqiyat xabari.
    * `sweetTopSmallSuccessAlert(msg, duration)` — kichik toast xabari.
    * `sweetFailureProvider(msg, show_button, forward_url)` — yo'naltirishli xato xabari.
* **CALL (Ishlatilgan joylari):**
  * `auth/index.tsx` (Login va Signup muvaffaqiyatli yoki xato bo'lganda)
  * `App.tsx` (Logout jarayonida)

---

### 2.2. `AuthenticationModal` komponenti:
* **DEFINE (Ta'riflangan joyi):**
  * Fayl: `auth/index.tsx`
  * Mantiqlar:
    * `signupOpen` va `loginOpen` holatiga qarab MUI `Modal`ni ochish/yopish.
    * Tablar orqali "SIGNUP" (tab 1) va "LOGIN" (tab 2) o'rtasida o'tish (`handleTabChange`).
    * Input qiymatlari uchun state'lar: `memberNick`, `memberPhone`, `memberPassword`, `memberImage`.
    * Rasm tanlanganda uni yuklash va preview hosil qilish (`handleImageUpload`, `URL.createObjectURL`).
    * Parol kiritilgach `Enter` bosilganda submit qilish (`handlePasswordKeyDown`).
* **CALL (Ishlatilgan joylari):**
  * `App.tsx` da chaqirildi:
    ```tsx
    <AuthenticationModal
      signupOpen={signupOpen}
      loginOpen={loginOpen}
      handleLoginClose={handleLoginClose}
      handleSignupClose={handleSignupClose}
    />
    ```
  * `HomeNavbar.tsx` va `OtherNavbar.tsx` da "LOGIN" va "SIGN UP" tugmalari bosilganda:
    * `onClick={() => setLoginOpen(true)}`
    * `onClick={() => setSignupOpen(true)}`

---

## 3. BACKEND BILAN INTEGRATSIYA: `MemberService` (SIGNUP, LOGIN, LOGOUT)

Serverga axios orqali HTTP so'rovlar yuboruvchi servis mantig'i kengaytirildi.

### 3.1. `MemberService` metodlari:
* **DEFINE (Ta'riflangan joyi):**
  * Fayl: `MemberService.ts`
  * Metodlar:
    1. `signup(input: MemberInput): Promise<Member>`:
       * `/member/signup` manziliga `POST` so'rov (rasm va forma ma'lumotlari).
       * `{ withCredentials: true }` cookie qabul qilish uchun.
       * `localStorage.setItem("memberData", JSON.stringify(member))` orqali saqlash.
    2. `login(input: LoginInput): Promise<Member>`:
       * `/member/login` manziliga `POST` so'rov (`memberNick`, `memberPassword`).
       * `{ withCredentials: true }` cookie olish.
       * `localStorage.setItem("memberData", JSON.stringify(member))`.
    3. `logout(): Promise<void>`:
       * `/member/logout` manziliga `POST` so'rov yuborish.
       * `localStorage.removeItem("memberData")` orqali tozalash.
* **CALL (Ishlatilgan joylari):**
  * **Signup uchun CALL:**
    * Fayl: `auth/index.tsx` ichidagi `handleSignupRequest`:
      ```typescript
      const memberService = new MemberService();
      const result = await memberService.signup(signupInput);
      setAuthMember(result);
      handleSignupClose();
      ```
  * **Login uchun CALL:**
    * Fayl: `auth/index.tsx` ichidagi `handleLoginRequest`:
      ```typescript
      const memberService = new MemberService();
      const result = await memberService.login(loginInput);
      setAuthMember(result);
      handleLoginClose();
      ```
  * **Logout uchun CALL:**
    * Fayl: `App.tsx` ichidagi `handleLogoutRequest`:
      ```typescript
      const member = new MemberService();
      await member.logout();
      await sweetTopSuccessAlert("success", 700);
      localStorage.removeItem("cartData");
      setAuthMember(null);
      ```

---

## 4. GLOBAL CONTEXT (`useGlobals`), COOKIE NAZORATI VA LOGOUT UI

Ilovaning barcha qismida foydalanuvchi ma'lumotlariga kirish va uning sessiyasini kuzatish tizimi qurildi.

### 4.1. `GlobalContext` va `useGlobals` Custom Hook:
* **Kutubxona:** `universal-cookie` o'rnatildi.
* **DEFINE (Ta'riflangan joyi):**
  * Fayl: `useGlobals.ts`
  * Mantiq: `createContext` orqali `authMember` va `setAuthMember` funksiyasini taqdim etuvchi `useGlobals` hooki yaratildi.
* **CALL (Ishlatilgan joylari):**
  * `auth/index.tsx` da `const { setAuthMember } = useGlobals();` (login/signupdan keyin avtorizatsiya holatini yangilash uchun)
  * `App.tsx` da `const { setAuthMember } = useGlobals();` (logoutda tozalash uchun)
  * `HomeNavbar.tsx` da `const { authMember } = useGlobals();` (foydalanuvchi rasmini chiqarish uchun)
  * `OtherNavbar.tsx` da `const { authMember } = useGlobals();` (profil menyusini boshqarish uchun)

---

### 4.2. `ContextProvider` komponenti:
* **DEFINE (Ta'riflangan joyi):**
  * Fayl: `contextProvider.tsx`
  * Mantiq:
    * `new Cookies()` orqali brauzer cookielarini o'qiydi.
    * Agar cookie ichida `accessToken` yo'q bo'lsa, `localStorage.removeItem("memberData")` qiladi (sessiya tugaganini aniqlaydi).
    * `authMember` state'iga `localStorage.getItem("memberData")` qiymatini boshlang'ich qilib beradi.
    * `<GlobalContext.Provider value={{ authMember, setAuthMember }}>` orqali farzand komponentlarga uzatadi.
* **CALL (Ishlatilgan joyi):**
  * Fayl: `index.tsx`
    ```tsx
    <Provider store={store}>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </ContextProvider>
    </Provider>
    ```

---

### 4.3. Navbarlarda Profil menyusi va Logout (UI & Handlers):
* **DEFINE (Ta'riflangan joyi):**
  * Fayl: `App.tsx`
    * State: `const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);`
    * Handlerlar: `handleLogoutClick`, `handleCloseLogout`, `handleLogoutRequest`.
* **CALL (Ishlatilgan joyi):**
  * `HomeNavbar.tsx` va `OtherNavbar.tsx` da:
    * Agar `authMember` mavjud bo'lsa (Login qilingan bo'lsa):
      * Foydalanuvchi avatari (`serverApi + '/' + authMember.memberImage`) ko'rinadi.
      * Avatar bosilganda `handleLogoutClick` chaqirilib MUI `Menu` ochiladi.
      * Menyu ichidagi `MenuItem` bosilganda `onDeleteAll()` va `handleLogoutRequest()` chaqiriladi.
    * Agar `authMember` mavjud bo'lmasa:
      * "LOGIN" va "SIGN UP" tugmalari ko'rsatiladi.

---

## XULOSA: FAYLLAR VA ULARNING ROLI

| Fayl nomi | Qilingan ish / Vazifasi | Asosiy ro'li |
|---|---|---|
| `search.ts` | `CartItem` interfeysi yaratildi | **DEFINE** (Data model) |
| `useBasket.ts` | `useBasket` hooki va savatcha amallari (`onAdd`, `onRemove`, `onDelete`, `onDeleteAll`) | **DEFINE** (Biznes mantiq) |
| `Basket.tsx` | Savatcha UI oynasi, jami narxni hisoblash | **CALL** (`useBasket` ma'lumotlari) |
| `Products.tsx` | Taom kartasidan savatchaga qo'shish | **CALL** (`onAdd`) |
| `ChosenProduct.tsx` | Taom profilidan savatchaga qo'shish | **CALL** (`onAdd`) |
| `sweetAlert.ts` | SweetAlert2 xabar funksiyalari | **DEFINE** (Universal alertlar) |
| `auth/index.tsx` | `AuthenticationModal`, formalar, rasm yuklash | **DEFINE** (Modal UI & Form mantiq) |
| `MemberService.ts` | `signup`, `login`, `logout` axios so'rovlari | **DEFINE** (Backend API xizmati) |
| `useGlobals.ts` | `GlobalContext` va `useGlobals` hooki | **DEFINE** (Global Auth state) |
| `contextProvider.tsx` | Cookie tekshiruvi va Context Provider | **DEFINE & WRAPPER** |
| `index.tsx` | `<ContextProvider>` ni ilova ildiziga o'rash | **CALL** (`ContextProvider`) |
| `HomeNavbar.tsx` | Dinamik header (Avatar, Logout menyusi, Login/Signup) | **CALL** (`useGlobals`, `authModal`, `Basket`) |
| `OtherNavbar.tsx` | Boshqa sahifalar uchun dinamik header | **CALL** (`useGlobals`, `authModal`, `Basket`) |
| `App.tsx` | Savatcha, Auth modal va Logout boshqaruv markazi | **CALL** (`useBasket`, `authModal`, `MemberService`, `sweetAlert`) |

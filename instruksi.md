# 📚 MyBooks - Fitur per Halaman & Design

## 👤 HALAMAN USER (Login Required)

### 1. User Dashboard
**Deskripsi:** Overview profile user.

**Fitur & UI:**
- Profile card: avatar, nama, email, "Edit Profile" button
- Stats cards (4 grid):
  - Total orders (count)
  - Total spending (sum)
  - Total reviews (count)
  - Wishlist items (count)
- Quick links grid: "View Orders", "View Wishlist", "View Reviews", "Update Profile", "Logout"

**Design Elements:**
- Card-based layout
- Stats dengan ikon & number display
- Responsive grid (2 cols tablet, 4 desktop)

**Database Operasi:**
- SELECT users WHERE id=?
- COUNT & SUM dari orders, reviews, wishlists

---

### 2. Edit Profile
**Deskripsi:** Edit data profile user.

**Fitur & UI:**
- Form fields pre-filled:
  - Full Name (editable)
  - Email (read-only)
  - Username (read-only)
  - Phone (editable)
  - Profile image upload
  - Password (optional, untuk change)
  - Confirm password
- Buttons: "Save Changes", "Cancel"

**Design Elements:**
- Modal form atau dedicated page
- Read-only fields styling berbeda (lighter color)
- File upload preview

**Database Operasi:**
- UPDATE users SET full_name=?, phone=?, profile_image=? WHERE id=?
- Jika password: UPDATE users SET password=HASH(?) WHERE id=?

---

### 3. My Orders
**Deskripsi:** Riwayat pesanan user.

**Fitur & UI:**
- Filter sidebar: Status (All/Pending/Paid/Processing/Shipped/Delivered/Cancelled), Date range
- Sort buttons: Newest, Oldest, Amount high-to-low
- Orders table:
  - Kolom: Order number, Date, Amount, Status badge (color-coded), Actions
  - View detail button
  - Cancel button (jika pending)
  - Report issue button
- Pagination (10-20 items)

**Design Elements:**
- Status badges color-coded (pending=yellow, paid=blue, processing=orange, shipped=purple, delivered=green, cancelled=gray)
- Responsive table layout
- Filter panel collapsible di mobile

**Database Operasi:**
- SELECT orders, count(order_items) WHERE user_id=?
- Filter status & date
- GROUP BY order_id

---

### 4. Order Detail
**Deskripsi:** Detail order lengkap dengan timeline.

**Fitur & UI:**
- Order header: order number, date, status badge, tracking number (jika shipped)
- Items table: book image, title, author, qty, unit_price, subtotal
- Pricing breakdown: Subtotal, Tax, Shipping, Grand Total
- Shipping info: address display, tracking link
- Payment info: method, status badge, paid_at timestamp
- Order timeline: created → paid → processing → shipped → delivered
- Buttons: "Download Invoice", "Track Shipment", "Report Issue", "Leave Review" (jika delivered)

**Design Elements:**
- Timeline visualization (vertical/horizontal)
- Card-based layout sections
- Color-coded status badges
- Print-friendly styling untuk invoice

**Database Operasi:**
- SELECT orders JOIN users, payments WHERE order_id=? AND user_id=?
- SELECT order_items JOIN books WHERE order_id=?

---

### 5. Checkout
**Deskripsi:** Multi-step checkout process.

**Fitur & UI:**
- Step 1: Review cart (dari LOCAL STORAGE)
  - Items table, dapat modify qty/remove
  - Total display
  - Next button
- Step 2: Shipping address
  - Form: nama, alamat, kota, provinsi, kode pos, telepon
  - Save address checkbox (auto-fill next time)
  - Shipping method select (Standard/Express/Overnight)
  - Next button
- Step 3: Payment method
  - Radio buttons: Bank Transfer, Credit Card, E-Wallet
  - Show rekening (if bank transfer)
  - Next button
- Step 4: Confirmation
  - Order number display (ORD-YYYYMMDDHHMMSS)
  - Items summary
  - Total display
  - Bank details (if bank transfer)
  - Guidance text

**Design Elements:**
- Step indicator/progress bar
- Form validation UI
- Stepper navigation (Previous/Next)
- Confirmation page dengan success styling

**Database Operasi:**
- Validasi: SELECT books.stock, books.price untuk setiap item
- INSERT orders, order_items, payments
- Clear LOCAL STORAGE cartItems

---

### 6. Payment Status
**Deskripsi:** Poll & display payment status real-time.

**Fitur & UI:**
- Bank transfer section (jika method=bank_transfer):
  - Bank account number display + copy button
  - Amount to transfer
  - Upload proof file input
  - Status text: "Waiting for confirmation"
- Credit card section:
  - Redirect ke payment gateway
  - Show status dari gateway
  - Auto-redirect jika sukses
- E-Wallet section:
  - QR code display atau app link
  - Poll status sampai confirmed
- Status timeline visualization:
  - Pending (yellow) → Received (green) → Processing → Shipped → Delivered

**Design Elements:**
- Clear step-by-step guidance
- Status badges color-coded
- Copy button icon untuk nomor rekening
- Countdown/loading indicator untuk polling

**Database Operasi:**
- SELECT payments WHERE order_id=?
- Poll payments.status every 5-10 detik

---

### 7. Payment Confirmation (Auto-triggered)
**Deskripsi:** Backend process saat payment dikonfirmasi (auto-triggered, no user UI).

**Fitur Sistem:**
- Triggered saat payments.status → 'paid' (dari admin verify atau gateway callback)
- Update orders.status → 'paid'
- Kurangi stok: books.stock -= quantity per item
- Insert transaction log
- Email notification ke user

**Database Operasi:**
- UPDATE payments SET status='paid', paid_at=NOW()
- UPDATE orders SET status='paid'
- UPDATE books SET stock=stock-quantity (per item)
- INSERT transaction_history tipe 'purchase'

---

### 8. Review Buku
**Deskripsi:** Form review untuk buku yang sudah delivered.

**Fitur & UI:**
- Star rating selector (1-5, clickable stars)
- Review title input (optional)
- Comment textarea (min 10 char)
- Photo upload (optional, multiple files)
- Buttons: "Submit", "Cancel"
- Validation: rating required, comment min 10 char
- Success message

**Design Elements:**
- Star selector dengan hover preview
- Character count untuk comment
- Image preview before upload

**Database Operasi:**
- Validasi: SELECT COUNT FROM orders JOIN order_items WHERE user_id=?, book_id=?, status='delivered'
- INSERT reviews (user_id, book_id, rating, comment, is_approved=TRUE)
- Auto-calc: UPDATE books SET rating_average, rating_count

---

### 9. Wishlist
**Deskripsi:** Daftar buku favorit user.

**Fitur & UI:**
- Header: "My Wishlist" + item count
- Empty state display (jika kosong)
- Wishlist grid (seperti katalog):
  - Card: image, title, author, price, rating, "Add to Cart", "Remove", "View Detail" buttons
  - Price badge (show discount % if promo)
- Sort options: Recently added, Price high-to-low, Rating high-to-low
- Bulk actions: "Add all to cart" (mass add), "Clear wishlist"

**Design Elements:**
- Consistent card styling dengan katalog
- Hover effects
- Price highlight styling

**Local Storage:**
- `cartItems`: update saat "Add to Cart" dari wishlist

**Database Operasi:**
- SELECT wishlists JOIN books LEFT JOIN categories WHERE user_id=?
- DELETE FROM wishlists WHERE user_id=?, book_id=? (single)
- DELETE FROM wishlists WHERE user_id=? (clear all)

---

### 10. Contact / Support
**Deskripsi:** Komunikasi user dengan admin.

**Fitur & UI:**
- Contact form:
  - Subject dropdown (atau text)
  - Message textarea
  - File attachment input (optional)
  - Submit button
- Message history (chat-like):
  - List user messages + admin replies
  - Status badges: unread / read / replied
  - Timestamp, expandable detail
- FAQ section (static content)

**Design Elements:**
- Message bubble layout (user left, admin right)
- Status indicator next to message
- Timestamp formatting

**Database Operasi:**
- INSERT contact_messages (user_id, subject, message, status='unread')
- SELECT contact_messages WHERE user_id=?
- UPDATE contact_messages SET admin_reply=?, status='replied' WHERE id=?

---

## 🔧 HALAMAN ADMIN (Login Required + role='admin')

### A1. Admin Dashboard
**Deskripsi:** Analytics dashboard dengan metrics & charts.

**Fitur & UI:**
- Key metrics cards (4 grid):
  - Today's orders count
  - Today's revenue total
  - Total active customers
  - Pending payments count
- Charts section:
  - Monthly revenue trend (line chart)
  - Top 10 best sellers (bar chart)
  - Order status breakdown (pie chart)
  - Payment method usage (pie chart)
- Recent orders table (link to detail)
- Pending reviews widget (approve/reject buttons)

**Design Elements:**
- Card-based metrics dengan icons & big numbers
- Interactive charts (hover data labels)
- Color-coded category indicators
- Real-time data feel dengan refresh indicators

**Database Operasi:**
- COUNT, SUM dari orders, payments (WHERE DATE = TODAY)
- AGGREGATE orders, order_items, books GROUP BY date/product/category
- SELECT pending reviews

---

### A2. Manage Categories
**Deskripsi:** CRUD kategori buku.

**Fitur & UI:**
- Add category button → modal form
- Categories table:
  - Kolom: Name, Slug, Description, Active status toggle, Book count, Actions (Edit/Delete)
  - Edit button → pre-filled modal
  - Delete button (soft delete, confirmation)
  - Search bar
- Validasi: Name UNIQUE, slug auto-generate from name

**Design Elements:**
- Modal form untuk add/edit
- Toggle switch untuk active/inactive
- Action buttons compact (edit/delete icons)
- Search/filter responsive

**Database Operasi:**
- INSERT, UPDATE, SELECT categories
- DELETE (soft) → UPDATE deleted_at=NOW()
- COUNT books per category

---

### A3. Manage Books
**Deskripsi:** CRUD buku katalog.

**Fitur & UI:**
- Add book button → form modal/page dengan fields:
  - Title, slug, description, category dropdown, author, publisher, ISBN, price, stock
  - Cover image upload
  - Active checkbox
- Books table:
  - Kolom: Title, Category, Author, Price, Stock status (color: green/yellow/red), Rating, Sales count, Actions
  - Edit button
  - Delete button (soft)
  - Stock quick adjust (±)
  - Search & filter (kategori, price range, stock status, active/inactive)
- Pagination

**Design Elements:**
- Stock status color-coded (Ready=green, Low=yellow, Out=red)
- Quick action buttons
- Image thumbnail preview
- Responsive table dengan overflow scroll on mobile

**Database Operasi:**
- INSERT, UPDATE, SELECT books
- DELETE (soft) → UPDATE deleted_at=NOW()
- JOIN categories
- COUNT sales, rating aggregate

---

### A4. Manage Orders
**Deskripsi:** Kelola semua pesanan.

**Fitur & UI:**
- Orders table:
  - Kolom: Order number, Customer name, Date, Amount, Status (color), Payment status, Actions
  - Filter: status (dropdown), date range
  - Search: order number, customer name
  - Sort: date, amount
- View detail modal:
  - Full order info display
  - Update status dropdown (pending→paid→processing→shipped→delivered flow)
  - Update tracking number input
  - Cancel order button (if pending)

**Design Elements:**
- Status badges color-coded
- Modal detail dengan summary sections
- Confirmation untuk status change

**Database Operasi:**
- SELECT orders JOIN users, payments, order_items
- UPDATE orders SET status=?, tracking_number=?
- Trigger payment confirmation flow if mark as paid manually

---

### A5. Manage Users
**Deskripsi:** Monitor & manage user accounts.

**Fitur & UI:**
- Users table:
  - Kolom: Username, Email, Name, Join date, Total orders, Total spending, Status (badge), Actions
  - Search: username, email, name
  - Filter: active, inactive
  - Sort: join date, spending
- User detail view:
  - Profile info display
  - Stats: total orders, spending, reviews, wishlist
  - Recent orders list (preview)
  - Ban/unban button
  - Soft delete button (confirmation)

**Design Elements:**
- Status badge (active=green, inactive=red)
- Stats summary cards
- Action buttons clearly labeled

**Database Operasi:**
- SELECT users LEFT JOIN orders (aggregate stats)
- UPDATE users SET is_active=? (ban/unban)
- UPDATE users SET deleted_at=NOW() (soft delete)

---

### A6. Manage Payments
**Deskripsi:** Kelola pembayaran & verifikasi transfer.

**Fitur & UI:**
- Pending payments list:
  - Order number, customer name, amount, proof image display
  - Approve button (trigger payment confirmation)
  - Reject button (SET status='failed', confirmation)
- Transaction history table:
  - Kolom: Type (purchase/refund badge), User, Amount, Order, Date
  - Filter: type, date range
  - Search: order number
- Summary cards: Total revenue, Total refund, Net revenue

**Design Elements:**
- Image proof preview (thumbnail clickable untuk full view)
- Color-coded type badges (purchase=green, refund=red)
- Currency formatting untuk amount display
- Confirmation modal untuk approve/reject

**Database Operasi:**
- SELECT payments WHERE status='pending'
- UPDATE payments SET status='paid', paid_at=NOW() (approve)
- Trigger: UPDATE books.stock, INSERT transaction_history
- SELECT transaction_history (aggregation queries)

---

### A7. Manage Reviews
**Deskripsi:** Moderate reviews sebelum tampil public.

**Fitur & UI:**
- Pending reviews list:
  - Book title, reviewer name, rating (stars), comment preview, date
  - Approve button → is_approved=TRUE
  - Reject button → delete atau is_approved=FALSE
- All reviews table:
  - Kolom: Book, Reviewer, Rating (stars), Comment, Status badge, Actions
  - Filter: status (approved/rejected), rating range
  - Search: book title, reviewer name
- Summary cards: Total reviews, Avg rating, Most reviewed book

**Design Elements:**
- Star rating display
- Comment truncation dengan read more link
- Status badge (approved=green, rejected=red)
- Action buttons compact

**Database Operasi:**
- SELECT reviews WHERE is_approved=FALSE
- UPDATE reviews SET is_approved=TRUE/FALSE
- Auto-update: books.rating_average, books.rating_count

---

### A8. Manage Messages
**Deskripsi:** Kelola pesan dari customer.

**Fitur & UI:**
- Messages list dengan status tabs: Unread, Read, Replied
  - Kolom: From (user name), Subject, Status badge, Date
  - Unread badge indicator
  - View button → detail modal
- Message detail modal:
  - User info (name, email)
  - Subject & message content display
  - Admin reply textarea
  - Send reply button
  - Mark as read checkbox

**Design Elements:**
- Tab interface untuk status filtering
- Message detail dengan timestamp
- Textarea untuk reply input
- Confirmation setelah send reply

**Database Operasi:**
- SELECT contact_messages GROUP BY status
- UPDATE contact_messages SET admin_reply=?, status='replied'

---

### A9. Analytics & Reports
**Deskripsi:** Laporan penjualan & analytics mendalam.

**Fitur & UI:**
- Date range selector (dari-sampai, preset: Today/Week/Month/Year)
- Key metrics display:
  - Total orders, revenue, AVG order value
  - New customers, total sold products
- Charts section:
  - Revenue trend (line, by date/week/month)
  - Top 10 products (bar chart)
  - Top 5 categories (pie/donut chart)
  - Order status breakdown (pie)
  - Payment method distribution (pie)
  - Customer acquisition trend (line)
  - Rating distribution (histogram)
- Export buttons: Export CSV, Export PDF

**Design Elements:**
- Chart interactive (hover labels, click legend)
- Color-coded by category/metric
- Responsive chart sizing
- Print-friendly styling

**Database Operasi:**
- AGGREGATE queries dengan GROUP BY date, product, category, payment_method
- SELECT, SUM, COUNT, AVG dari orders, order_items, books, payments, transaction_history
- Date range filtering

---

## 🎨 DESIGN SYSTEM NOTES

**Color Palette:**
- Primary: White (#ffffff) - buttons, text highlights
- Secondary: Indigo (#6366f1), Emerald (#10b981), Orange (#f97316), Pink (#ec4899)
- Background: Neutral-950 (#0a0a0a)
- Borders/Accents: White/10-20% opacity
- Status: Green (success), Yellow (pending), Blue (processing), Purple (shipped), Gray (cancelled)

**Components:**
- Cards: glassmorphic dengan backdrop blur, border white/5-10%
- Buttons: hover scale & color transitions, rounded-lg
- Forms: white/5 background, white/20 border, smooth focus states
- Tables: responsive dengan horizontal scroll on mobile
- Modals: centered, backdrop blur, smooth animations

**Typography:**
- Headers: Bold, tight letter-spacing
- Body: Regular weight, neutral-400 untuk secondary text
- Mono: For brand logo & code elements

**Animations:**
- Scroll reveal: observe-anim dengan delay classes
- Hover: scale 1.02, color transitions (150ms)
- Loading: pulse indicators, smooth transitions

**Notes**

```
Pokoknya design di samakan dengan yang sudah ada di dashboard.tsx, terapkan secara KONSISTEN YA!
```
---

Selain itu:

### Struktur Folder dan File (Arsitektur Project)
Buatkan struktur folder dan file secara profesional dan scalable untuk project ini. Terapkan pola arsitektur yang bersih dengan memisahkan fungsi berdasarkan peran, meliputi:

- **components** untuk UI  
- **hooks** untuk reusable logic  
- **services** untuk business logic atau API calls  
- **utils** untuk pure helper functions  
- **lib** untuk konfigurasi atau inisialisasi library eksternal  
- **store** atau **context** untuk global state management  
- **config** untuk konfigurasi environment atau constant global  
- **types** atau **interfaces** untuk definisi tipe (jika diperlukan)  
- **assets** untuk file statis  

Saat saya meminta penambahan fitur atau fungsi baru, sesuaikan file dan lokasinya secara otomatis berdasarkan kategori terbaiknya, berikan alasan penempatannya, dan tampilkan struktur final yang rapi. Pastikan seluruh output konsisten, mudah dibaca, tidak berlebihan, dan mengikuti praktik senior engineer yang umum digunakan pada project modern.

---

Pastikan seluruh hasil akhir disusun secara sistematis, jelas, dan layak dijadikan blueprint utama untuk pengembangan aplikasi e-commerce toko buku modern berbasis Laravel.

---

## 🔄 FLOW TRANSAKSI SINGKAT

1. **Browse (Home/Katalog):** SELECT books + categories, display featured/filtered
2. **Add to Cart:** Save to LOCAL STORAGE (cartItems array)
3. **Checkout:** Validate books.stock → INSERT orders + order_items + payments
4. **Payment:** Poll payments.status → Saat 'paid' → UPDATE books.stock, INSERT transaction_history
5. **Delivered:** Show review form → INSERT reviews → UPDATE books.rating
6. **Admin Dashboard:** AGGREGATE data dari orders, order_items, payments untuk laporan

---


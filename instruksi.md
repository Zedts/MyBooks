# 📚 MyBooks - Fitur per Halaman & Design (Updated)

## 👤 HALAMAN USER (Login Required)

### 1. User Dashboard / Home
**Deskripsi:** Dashboard utama user dengan grid buku, shopping experience profesional.

**Fitur & UI:**
- Header dengan:
  - Logo MyBooks
  - Search bar (search books by title/author/publisher)
  - Cart icon dengan badge (total items count)
  - Profile dropdown menu:
    - Avatar + nama user
    - "Account" link → User Dashboard stats
    - "Settings" link → Edit Profile page
    - "Logout" button
- Featured/Recommended books carousel section
- "Just For You" grid section (personalized recommendations)
- Category filter pills (Design, Tech, Philosophy, etc) dengan smooth scroll
- Books grid display (4 kolom responsive):
  - Book card: image, title, author, price, rating stars, "Add to Cart" button, wishlist icon
  - Hover effect: scale 1.02, shadow enhance
  - Category badge color-coded
- Pagination or infinite scroll

**Design Elements:**
- Dark theme (bg-neutral-950) consistent dengan landing page
- Glassmorphic cards dengan backdrop blur
- Gradient overlays sesuai kategori (indigo/emerald/orange/pink)
- Smooth hover animations (scale 1.02, 150ms transitions)
- Status badges: in-stock (green), low-stock (yellow), out-of-stock (gray)
- Price highlight dengan formatting currency
- Rating display dengan star icons
- Mobile responsive: 1 col mobile, 2 tablet, 4 desktop

**Local Storage:**
- `cartItems`: update saat user click "Add to Cart"
- `userId`: track user context
- `authToken`: session validation

**Database Operasi:**
- SELECT books WHERE is_active=TRUE AND deleted_at IS NULL (all books untuk grid)
- SELECT wishlists WHERE user_id=? (untuk highlight wishlist items)
- SELECT reviews GROUP BY book_id (untuk average rating display)
- JOIN categories untuk kategori display
- ORDER BY rating_average DESC / created_at DESC untuk featured section

---

### 2. User Account / Profile Stats
**Deskripsi:** Dashboard overview dengan statistik user (accessible from profile dropdown).

**Fitur & UI:**
- Profile card: avatar, nama, email
- Stats cards grid (2x2 atau 1x4 responsive):
  - Total orders (count + link)
  - Total spending (sum amount + currency format)
  - Total reviews (count + link)
  - Wishlist items (count + link)
- Recent orders preview (last 3-5 orders mini cards)
- "View All Orders" button
- "Edit Profile" button (from header dropdown)
- "Logout" button

**Design Elements:**
- Card-based layout dengan glassmorphism
- Stats dengan ikon & big number display
- Color-coded stats (orders=indigo, spending=emerald, reviews=orange, wishlist=pink)
- Responsive grid (1 col mobile, 2 tablet, 4 desktop)

**Database Operasi:**
- SELECT users WHERE id=? AND deleted_at IS NULL
- SELECT COUNT(id) FROM orders WHERE user_id=? AND status IN ('paid', 'delivered')
- SELECT SUM(final_total) FROM orders WHERE user_id=? AND status IN ('paid', 'delivered')
- SELECT COUNT(id) FROM reviews WHERE user_id=?
- SELECT COUNT(id) FROM wishlists WHERE user_id=?
- SELECT orders LIMIT 5 ORDER BY created_at DESC (recent orders preview)

---

### 3. User Settings / Edit Profile
**Deskripsi:** Edit profil user (accessible from profile dropdown).

**Fitur & UI:**
- Form page/modal dengan tabs atau sections:
  - **Account Info:**
    - Username (read-only)
    - Email (read-only, atau editable dengan verification)
    - Full Name (editable)
    - Phone (editable)
    - Profile image upload (preview thumbnail)
  - **Security:**
    - Current password (password input)
    - New password (password input, strength indicator)
    - Confirm password (match validator)
  - **Address Book:**
    - Saved addresses list (for quick checkout)
    - Add new address button → modal form
    - Edit/delete address buttons per item
  - **Preferences:**
    - Email notifications checkbox (for orders, reviews)
    - Newsletter subscription checkbox
- Buttons: "Save Changes", "Cancel"
- Success/error toast notifications

**Design Elements:**
- Consistent form styling dengan design system
- Tabs atau collapsible sections
- Read-only fields dengan lighter styling
- File upload preview
- Password strength indicator (weak/medium/strong colors)
- Form validation UI (red border invalid, green check valid)

**Database Operasi:**
- SELECT users WHERE id=? (pre-fill form)
- UPDATE users SET full_name=?, phone=?, profile_image=? WHERE id=?
- UPDATE users SET password=HASH(?) WHERE id=? (if password change)
- SELECT addresses FROM user_addresses WHERE user_id=? (if implemented)
- INSERT INTO user_addresses (user_id, address, city, province, zip, phone) (add address)

---

### 4. My Orders
**Deskripsi:** Riwayat semua pesanan user dengan filter & sorting.

**Fitur & UI:**
- Header dengan:
  - "My Orders" title
  - Filter sidebar (collapsible di mobile):
    - Status filter (All/Pending/Paid/Processing/Shipped/Delivered/Cancelled)
    - Date range picker (from-to)
  - Sort dropdown (Newest, Oldest, Amount High-to-Low)
- Orders table/card list:
  - For table: Kolom: Order number, Date, Amount, Status badge, Item count, Actions
  - For card list (mobile): card display dengan info summary
  - Status badge color-coded
  - View detail button
  - Cancel button (jika status=pending, with confirmation)
  - Report issue button
- Pagination (10-20 items per page)
- Empty state (if no orders)

**Design Elements:**
- Status badges: pending=yellow, paid=blue, processing=orange, shipped=purple, delivered=green, cancelled=gray
- Responsive table dengan horizontal scroll on mobile
- Filter panel glassmorphic
- Action buttons dengan hover effects
- Mobile: card-based list layout

**Database Operasi:**
- SELECT orders, count(order_items) WHERE user_id=?
- Filter: status, DATE(created_at) BETWEEN ? AND ?
- GROUP BY order_id
- ORDER BY created_at DESC / final_total DESC
- LIMIT + OFFSET pagination

---

### 5. Order Detail
**Deskripsi:** Detail lengkap satu pesanan dengan timeline & informasi pembayaran.

**Fitur & UI:**
- Order header section:
  - Order number (large display)
  - Order date
  - Status badge (color-coded, large)
  - Tracking number (jika shipped)
  - Download Invoice button (PDF)
- Items section (table/list):
  - Kolom: Book image, title, author, qty, unit_price, subtotal
  - Each item card dengan book preview
- Pricing breakdown (card):
  - Subtotal display
  - Tax 11% display
  - Shipping cost display
  - Grand Total (highlighted)
- Shipping info card:
  - Recipient name & phone
  - Full shipping address
  - Tracking link (jika available)
  - Estimated delivery date (jika shipped)
- Payment info card:
  - Payment method (Bank Transfer / Credit Card / E-Wallet)
  - Payment status badge
  - Paid at timestamp
  - Transaction ID (jika available)
- Order timeline (vertical):
  - Order Created → Paid → Processing → Shipped → Delivered
  - Each step dengan timestamp
  - Current status highlighted
- Action buttons:
  - "Track Shipment" (jika shipped, opens tracking portal)
  - "Report Issue" (contact admin)
  - "Leave Review" button (jika status=delivered)
  - "Reorder" button (quick add to cart)

**Design Elements:**
- Card-based layout sections
- Color-coded status badges
- Timeline visualization dengan step indicator
- Print-friendly styling (no blur/transparency for invoice)
- Mobile responsive: stacked sections

**Database Operasi:**
- SELECT orders JOIN users, payments WHERE order_id=? AND user_id=? AND deleted_at IS NULL
- SELECT order_items JOIN books WHERE order_id=?
- Display order status timeline (derived from orders.status & timestamps)

---

### 6. Checkout (Multi-Step)
**Deskripsi:** Multi-step checkout dengan cart review, shipping, payment method selection.

**Fitur & UI:**
- Step indicator bar (Step 1/2/3/4, progress visualization)
- **Step 1: Review Cart**
  - Items table dari LOCAL STORAGE:
    - Kolom: Book image, title, author, price, qty (++/-- buttons), subtotal, remove button
    - Update qty immediate dengan live calculation
    - Remove item confirmation
  - Cart summary panel:
    - Subtotal calculation
    - Tax 11% (auto-calc)
    - Shipping cost (default 50k, or calculated)
    - Grand total highlight
  - Navigation: "Continue Shopping" link, "Next" button
- **Step 2: Shipping Address**
  - Use saved address dropdown (jika ada)
  - Or enter new address:
    - Full name input
    - Address input
    - City dropdown
    - Province dropdown
    - Zip code input
    - Phone number input
  - Save address checkbox (for next order)
  - Shipping method select:
    - Standard (3-5 days, free)
    - Express (1-2 days, +30k)
    - Overnight (same day, +50k)
  - Navigation: "Previous" button, "Next" button
- **Step 3: Payment Method**
  - Radio buttons untuk method selection:
    - Bank Transfer (show bank details preview)
    - Credit Card (show preview)
    - E-Wallet (show methods list)
  - Method details display:
    - For bank transfer: show account info, amount
    - For credit card: show form preview
    - For e-wallet: show supported wallets
  - Navigation: "Previous" button, "Place Order" button
- **Step 4: Order Confirmation**
  - Success message/badge
  - Order number display (large, ORD-YYYYMMDDHHMMSS)
  - Order summary: items count, total amount
  - Shipping to: address display
  - Payment method used
  - Next steps guidance text:
    - For bank transfer: "Transfer ke nomor rekening berikut..."
    - For other methods: "Silakan lanjutkan di payment gateway..."
  - Buttons: "View Order", "Continue Shopping"

**Design Elements:**
- Step indicator dengan progress bar
- Form validation UI (red error messages, green checkmarks)
- Stepper navigation dengan Previous/Next buttons
- Summary panel sticky on desktop, full-width on mobile
- Confirmation page dengan success styling (green accents)
- Modal atau dedicated page layout

**Database Operasi:**
- Validasi sebelum checkout:
  - SELECT books.stock, books.price WHERE book_id IN (cart items)
  - Validate stok availability
- Insert order:
  - INSERT INTO orders (order_number, user_id, status='pending', total_price, tax_amount, shipping_cost, final_total, shipping_address, ...)
  - INSERT INTO order_items (order_id, book_id, quantity, unit_price, subtotal) untuk setiap item
  - INSERT INTO payments (order_id, payment_method, amount, status='pending')
- Clear LOCAL STORAGE cartItems setelah order sukses

---

### 7. Payment Status / Real-Time Polling
**Deskripsi:** Halaman status pembayaran dengan polling real-time.

**Fitur & UI:**
- Order info header (order number, date, amount)
- Payment method specific section:
  - **Bank Transfer:**
    - Bank account number display + copy button
    - Amount to transfer highlight
    - Upload proof/receipt file input
    - Status message: "Waiting for confirmation"
    - Countdown timer: "Auto-confirm in XX minutes"
  - **Credit Card:**
    - Redirect ke payment gateway (Midtrans/Xendit)
    - Status display dari gateway
    - Auto-redirect jika payment sukses
    - Retry button jika failed
  - **E-Wallet:**
    - QR code display (untuk scan)
    - Atau app link button
    - Poll status real-time dengan spinner/loading
    - Auto-redirect saat confirmed
- Status timeline visualization:
  - Pending (yellow, animated pulse)
  - Confirmed/Received (green, checkmark)
  - Processing (blue, clock icon)
  - Shipped (purple, truck icon)
  - Delivered (green, box icon)
- Countdown timer (untuk auto-cancel unpaid orders, typically 24 hours)
- Help section: "Butuh bantuan?" link ke support

**Design Elements:**
- Clear visual status indicators
- Color-coded badges (yellow/green/blue/purple)
- Copy button untuk bank account
- Loading spinner untuk polling
- Animated pulse untuk pending status
- Mobile responsive

**Database Operasi:**
- SELECT payments WHERE order_id=?
- SELECT orders WHERE id=?
- Poll payments.status every 5-10 seconds
- Saat status berubah ke 'paid' → trigger payment confirmation backend process

---

### 8. Payment Confirmation (Auto-Triggered Backend)
**Deskripsi:** Backend process saat payment dikonfirmasi (no user UI).

**Fitur Sistem (Backend Only):**
- Triggered saat payments.status → 'paid' (dari admin verify atau gateway callback)
- Update orders.status → 'paid'
- Decrement stok: books.stock -= quantity per setiap item
- Insert transaction log untuk audit
- Send email notification ke user dengan order summary
- Frontend auto-redirect ke order detail page atau success page

**Database Operasi:**
- UPDATE payments SET status='paid', paid_at=NOW(), transaction_id=? WHERE order_id=?
- UPDATE orders SET status='paid', updated_at=NOW() WHERE id=?
- UPDATE books SET stock=stock-? WHERE id IN (SELECT book_id FROM order_items WHERE order_id=?)
- INSERT INTO transaction_history (order_id, user_id, description='Purchase Order #...', amount, transaction_type='purchase', created_at=NOW())
- Send email trigger (async job)

---

### 9. Review Buku
**Deskripsi:** Form review untuk buku yang sudah diterima.

**Fitur & UI:**
- Header: "Review [Book Title]" by [Author]
- Form fields:
  - Star rating selector (1-5, clickable stars dengan hover preview)
  - Review title input (text, optional, placeholder: "Judul review Anda")
  - Comment textarea (min 10 char, char counter, placeholder: "Bagikan pengalaman Anda...")
  - Photo upload (file input, optional, multiple, preview thumbnails)
  - Buttons: "Submit Review", "Cancel"
- Validation display:
  - Rating required message (jika belum dipilih)
  - Comment min 10 char warning (live char count)
  - Success message setelah submit
- Restriction message (jika user belum membeli atau status != delivered)

**Design Elements:**
- Star selector dengan 5-point size, hover color change
- Character counter di bawah textarea
- Image preview thumbnails sebelum upload
- Form validation styling
- Success toast notification
- Modal atau dedicated page

**Database Operasi:**
- Validasi: SELECT COUNT FROM orders JOIN order_items WHERE user_id=?, book_id=?, status='delivered'
- INSERT INTO reviews (user_id, book_id, rating, comment, photo_urls=?, is_approved=TRUE, created_at=NOW())
- Auto-calculate dan UPDATE books:
  - SET rating_average = (SELECT AVG(rating) FROM reviews WHERE book_id=? AND is_approved=TRUE AND deleted_at IS NULL)
  - SET rating_count = (SELECT COUNT(*) FROM reviews WHERE book_id=? AND is_approved=TRUE AND deleted_at IS NULL)
  - WHERE id=?

---

### 10. Wishlist
**Deskripsi:** Grid daftar buku favorit dengan actions.

**Fitur & UI:**
- Header: "My Wishlist" + item count badge
- Empty state display (jika kosong, dengan "Continue Shopping" button)
- Wishlist grid (4 kolom responsive, same as home):
  - Book cards: image, title, author, price, rating, category badge
  - "Add to Cart" button
  - "Remove from Wishlist" button (X icon)
  - "View Detail" link
  - Price highlight, discount % badge (jika ada promo)
- Sort options buttons:
  - Recently Added
  - Price High-to-Low
  - Price Low-to-High
  - Rating High-to-Low
- Bulk actions:
  - "Add All to Cart" button (mass add semua items)
  - "Clear Wishlist" button (with confirmation)
- Pagination atau infinite scroll

**Design Elements:**
- Consistent card styling dengan home page
- Hover animations (scale, shadow)
- "Remove" button styling (subtle, hover highlight)
- Bulk action buttons prominent
- Mobile responsive grid

**Local Storage:**
- `cartItems`: update saat "Add to Cart" dari wishlist

**Database Operasi:**
- SELECT wishlists JOIN books LEFT JOIN categories WHERE user_id=? AND books.deleted_at IS NULL AND books.is_active=TRUE
- ORDER BY wishlists.created_at DESC (atau sorting parameter)
- DELETE FROM wishlists WHERE user_id=? AND book_id=? (remove single)
- DELETE FROM wishlists WHERE user_id=? (clear all)

---

### 11. Contact / Support
**Deskripsi:** Halaman komunikasi user dengan admin.

**Fitur & UI:**
- Contact form section (top):
  - Subject dropdown (pilihan: "General Question", "Order Issue", "Product Inquiry", "Bug Report", "Other")
  - Message textarea (placeholder: "Jelaskan pertanyaan Anda...")
  - File attachment input (optional, image/document support)
  - Submit button
  - Reset button
- Message history section (below):
  - "Your Messages" header + count
  - Message list (chat-like layout):
    - User message bubble (left side, blue/white)
    - Admin reply bubble (right side, gray, "Admin Support" label)
    - Status indicator: unread icon / "replied" badge
    - Timestamp per message
    - Expandable/collapsible per thread
  - Empty state (if no messages)
  - Filter tabs: All / Unread / Replied
- FAQ section (collapsible accordion):
  - Common questions dengan answers
  - Search bar untuk filter FAQ
- Live chat indicator (jika ada agent available)

**Design Elements:**
- Message bubble layout (chat-like UX)
- Status badges (unread=orange, replied=green)
- Timestamp formatting (e.g., "2 hours ago", "Nov 27, 2025")
- Form styling consistent dengan design system
- Responsive message layout
- Accordion untuk FAQ

**Database Operasi:**
- INSERT INTO contact_messages (user_id, subject, message, attachments=?, status='unread', created_at=NOW())
- SELECT contact_messages WHERE user_id=? ORDER BY created_at DESC
- UPDATE contact_messages SET status='read' WHERE id=? (when user view)
- UPDATE contact_messages SET admin_reply=?, status='replied', updated_at=NOW() WHERE id=? (admin reply, backend trigger)

---

## 🔧 HALAMAN ADMIN (Login Required + role='admin')

### A1. Admin Dashboard
**Deskripsi:** Analytics dashboard dengan metrics & interactive charts (MUI X Charts).

**Fitur & UI:**
- Key metrics cards (4-column grid, responsive):
  - **Today's Orders** card:
    - Title: "Today's Orders"
    - Big number display: COUNT(orders WHERE DATE=TODAY)
    - Icon: ShoppingCart icon
    - Trend indicator: +X% vs yesterday (green/red arrow)
    - Background: Glassmorphic, indigo accent
  - **Today's Revenue** card:
    - Title: "Today's Revenue"
    - Big number display: SUM(orders.final_total WHERE DATE=TODAY) dengan currency format (Rp)
    - Icon: DollarSign icon
    - Trend indicator: +X% vs yesterday
    - Background: Glassmorphic, emerald accent
  - **Active Customers** card:
    - Title: "Active Customers"
    - Big number display: COUNT(DISTINCT orders.user_id WHERE status IN ('paid','delivered'))
    - Icon: Users icon
    - Trend indicator: +X new customers this week
    - Background: Glassmorphic, pink accent
  - **Pending Payments** card:
    - Title: "Pending Payments"
    - Big number display: COUNT(payments WHERE status='pending')
    - Icon: Clock icon
    - Action link: "View Pending" → Manage Payments page
    - Background: Glassmorphic, orange accent

- Charts section (below metrics):
  - **Monthly Revenue Trend** (MUI X Charts LineChart):
    - Title: "Revenue Trend (30 days)"
    - X-axis: Date (formatted as "Nov 1", "Nov 2", etc)
    - Y-axis: Revenue amount
    - Line: smooth curve, color=indigo
    - Hover tooltip dengan date + amount
    - Legend dengan "Revenue" label
    - Height: 300px
  - **Top 10 Best Sellers** (MUI X Charts BarChart):
    - Title: "Top 10 Best Selling Books"
    - X-axis: Book titles (truncated jika panjang)
    - Y-axis: Units sold
    - Bar: horizontal atau vertical, color=emerald
    - Hover tooltip dengan book title + count
    - Height: 300px
  - **Order Status Breakdown** (MUI X Charts PieChart):
    - Title: "Order Status Distribution"
    - Segments: pending (yellow), paid (blue), processing (orange), shipped (purple), delivered (green), cancelled (gray)
    - Hover tooltip dengan status + count + percentage
    - Legend: below chart
    - Size: 250px
  - **Payment Method Usage** (MUI X Charts DonutChart):
    - Title: "Payment Methods"
    - Segments: Bank Transfer, Credit Card, E-Wallet (masing-masing warna berbeda)
    - Center: total transactions number
    - Hover tooltip dengan method + count
    - Legend: right side
    - Size: 250px

- Recent orders table section:
  - Title: "Recent Orders"
  - Kolom: Order number, Customer name, Amount, Status badge, Date, Action (view detail link)
  - Max 5 rows displayed
  - "View All Orders" link di bawah

- Pending reviews widget (card):
  - Title: "Pending Reviews"
  - Count display: X reviews awaiting approval
  - Quick stats: Average rating
  - "Manage Reviews" button → Manage Reviews page
  - Small list: last 3 pending reviews preview

**Design Elements:**
- Glassmorphic metric cards (backdrop blur, white/5-10% border)
- MUI X Charts styling: consistent dengan dark theme
- Color-coded metrics (indigo/emerald/pink/orange)
- Interactive charts (hover labels, clickable legend)
- Card-based layout sections dengan gap spacing
- Responsive: 2x2 metrics grid on tablet, 1x4 atau 2x2 on mobile
- Charts responsive dengan container width

**Database Operasi:**
- SELECT COUNT(id) FROM orders WHERE DATE(created_at)=CURDATE() AND status IN ('paid','processing','shipped','delivered')
- SELECT SUM(final_total) FROM orders WHERE DATE(created_at)=CURDATE() AND status IN ('paid','delivered')
- SELECT COUNT(DISTINCT user_id) FROM orders WHERE status IN ('paid','delivered')
- SELECT COUNT(id) FROM payments WHERE status='pending'
- Revenue trend: SELECT DATE(created_at) as date, SUM(final_total) as revenue FROM orders WHERE status IN ('paid','delivered') AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY DATE(created_at) ORDER BY date ASC
- Top sellers: SELECT b.title, COUNT(oi.id) as sold FROM order_items oi JOIN books b ON oi.book_id=b.id GROUP BY b.id ORDER BY sold DESC LIMIT 10
- Status breakdown: SELECT status, COUNT(id) FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY status
- Payment methods: SELECT payment_method, COUNT(id) FROM payments WHERE status='paid' AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY payment_method
- Recent orders: SELECT orders.id, order_number, final_total, status, created_at, users.full_name FROM orders JOIN users ON orders.user_id=users.id ORDER BY created_at DESC LIMIT 5
- Pending reviews: SELECT r.id, r.rating, r.comment, b.title, u.full_name FROM reviews r JOIN books b ON r.book_id=b.id JOIN users u ON r.user_id=u.id WHERE r.is_approved=FALSE ORDER BY r.created_at DESC LIMIT 3

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

---

## 📁 Struktur Folder & Arsitektur Project (Next.js + TypeScript)

## 🔄 FLOW TRANSAKSI SINGKAT

1. **Browse (Home/Katalog):** SELECT books + categories, display featured/filtered grid
2. **Add to Cart:** Save to LOCAL STORAGE (cartItems array)
3. **Checkout:** Validate books.stock → INSERT orders + order_items + payments
4. **Payment:** Poll payments.status → Saat 'paid' → UPDATE books.stock, INSERT transaction_history
5. **Delivered:** Show review form → INSERT reviews → UPDATE books.rating
6. **Admin Dashboard:** AGGREGATE data dari orders, order_items, payments dengan MUI X Charts untuk visualisasi

---

# Platzi Store - React Native

Platzi Store is a **React Native** application that allows users to browse products, manage their shopping cart, and add/remove items from favorites. It utilizes JWT-based authentication to securely log in and log out users.

## Libraries Used

- **Platzi Fake Store API** - For fetching mock product data.
- **React Navigation** - For navigation between screens.
- **React Native Vector Icons** - For using icons in the app.
- **Axios** - For handling API requests.
- **Redux Toolkit** - For global state management.
- **Formik** - For handling forms and user input.
- **Async Storage** - For storing JWT tokens.
- **Linear Gradient** - For creating color transitions.
- **Normalize** - For ensuring responsive design across devices.

## Features

- **Auth System**:

  - Allows users to log in and log out.
  - If login credentials are incorrect, an error message is shown.
  - JWT token is stored in Async Storage for user authentication.

- **Product Listing**:

  - Displays all products.
  - Allows filtering products by category.
  - Search functionality for finding products by name.

- **Favorites**:

  - Users can add and remove products from their favorites.

- **Cart Management**:

  - The quantity of the same product increases, and the total price is recalculated when products are added or removed.
  - If no products are in the cart, the user is notified.
  - Once products are added, a "Confirm Cart" button appears.
  - After confirming, the cart is emptied.

- **Responsive Design**:
  - Uses Normalize to ensure a proper layout on different screen sizes.

## Installation & Running

Follow these steps to run the project:

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/your-username/platzi-store.git
   cd platzi-store

   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

```

3. **Run the App:**
   For Android: npx react-native run-android

   For IOS: npx react-native run-ios

## SCREEN GİF

# Platzi Store - React Native (Türkçe)

Platzi Store, **React Native** kullanılarak geliştirilmiş bir uygulamadır. Kullanıcılar, ürünleri görüntüleyebilir, sepete ekleyip çıkarabilir ve favorilerine ekleyebilir. JWT tabanlı kimlik doğrulama kullanılarak güvenli giriş/çıkış yapılır.

## Kullanılan Kütüphaneler

- **Platzi Fake Store API** - Sahte ürün verileri için.
- **React Navigation** - Sayfa geçişleri için.
- **React Native Vector Icons** - İkon kullanımı için.
- **Axios** - API istekleri için.
- **Redux Toolkit** - Global state yönetimi için.
- **Formik** - Form işlemleri için.
- **Async Storage** - JWT token saklama için.
- **Linear Gradient** - Renk geçişleri için.
- **Normalize** - Responsive tasarım için.

## Özellikler

### Auth Sistemi:

- Kullanıcılar giriş yapabilir ve çıkış yapabilir.
- Yanlış giriş bilgileri hata mesajı döndürür.
- JWT token Async Storage ile saklanır ve doğrulama yapılır.

### Ürün Listeleme:

- Tüm ürünler listelenebilir.
- Kategoriye göre filtreleme yapılabilir.
- Ürün ismine göre arama yapılabilir.

### Favoriler:

- Kullanıcılar ürünleri favorilerine ekleyebilir ve çıkarabilir.

### Sepet Yönetimi:

- Aynı üründen eklenen ürünün adedi arttırılır ve toplam fiyat, eklenen ve çıkarılan ürünlere göre hesaplanır.
- Sepette ürün yoksa kullanıcıya bildirilir.
- Ürün sepete eklendikten sonra "Sepeti Onayla" butonu görünür.
- Onaylandıktan sonra sepet boşaltılır.

### Responsive Tasarım:

- Normalize kullanılarak tüm ekran boyutlarında düzgün görüntü sağlanır.
```

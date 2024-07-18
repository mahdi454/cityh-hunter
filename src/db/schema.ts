import { sql } from "drizzle-orm";
import { longtext } from "drizzle-orm/mysql-core";
import {
  boolean,
  date,
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  pgTableCreator,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// User Table
export const UserType = pgEnum("userType", ["ADMIN", "BASIC"]);
export const User = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username"),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  emailToken: text("emailToken"),
  isVerified: boolean("isVerified").notNull().default(false),
  expiration: timestamp("expiration").notNull(),
  role: UserType("userType").default("BASIC").notNull(),
});

// Products Table
// export const CategoryType = pgEnum('categoryType', ['men', 'women']);
export const Products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  productName: varchar("productName", { length: 255 }).notNull(),
  description: text("description"),
  price: real("price").notNull(),
  stockQuantity: real("stockQuantity").notNull(),
  imageURL: varchar('imageURL')
  .array()
  .notNull()
  .default(sql`ARRAY[]::text[]`),
  category: text("category"),
});

export const Orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderDate: timestamp("orderDate").defaultNow().notNull(),
  shippedDate: timestamp("shippedDate"),
  totalAmount: numeric("totalAmount", { precision: 10, scale: 2 }),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  adressId: uuid("orderId")
  .notNull()
  .references(() => ShippingAddresses.id, {
    onDelete: "restrict",
    onUpdate: "cascade",
  }),
});

// ShippingAddresses Table
export const ShippingAddresses = pgTable('shippingAddresses', {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  lastname: text("lastname"),
  email: text("email").notNull(),
  houseNo: text('houseNo').notNull(),
  adress: text('adress').notNull(),
  landmark: text('landmark'),
  city: text('city').notNull(),
  state: text('state').notNull(),
  pincode: text('pincode').notNull(),
  country: text('country').notNull(),
  isDefault: boolean('isDefault').notNull(), 
  userId: uuid("userId")
  .notNull()
  .references(() => User.id, {
    onDelete: "restrict",
    onUpdate: "cascade",
  }),

});
export const OrderDetails = pgTable(
  "order_details",
  {
    orderId: uuid("orderId")
      .notNull()
      .references(() => Orders.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    productId: uuid("productId")
      .notNull()
      .references(() => Products.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    userId: uuid("userId")
      .notNull()
      .references(() => User.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    quantity: integer("quantity").notNull(),
  },
  (table) => {
    return {
      orderDetailsPkey: primaryKey({
        columns: [table.orderId, table.productId, table.userId],
        name: "order_details_pkey",
      }),
    };
  }
);

// // Reviews Table
// export const reviews = pgTable('reviews', {
//   reviewID: serial('reviewID').primaryKey().notNull(),
//   productID: integer('productID').notNull().references(() => Products.productID),
//   userID: integer('userID').notNull().references(() => User.userId),
//   rating: real('rating').notNull(),
//   comment: text('comment'),
//   timestamp: timestamp('timestamp').defaultNow(),

// });

// // Orders Table
// export const orders = pgTable('orders', {
//   orderID: serial('orderID').primaryKey().notNull(),
//   userID: integer('userID').notNull().references(() => User.userID),
//   orderDate: date('orderDate').notNull(),
//   shipDate: date('shipDate'),
//   orderStatus: varchar('orderStatus', { length: 50 }),
//   totalAmount: numeric('totalAmount', { precision: 10, scale: 2 }),
//   shippingAddress: varchar('shippingAddress', { length: 255 }),
//   paymentMethod: varchar('paymentMethod', { length: 50 }),

// });

// // OrderItems Table
// export const orderItems = pgTable('orderItems', {
//   orderItemID: serial('orderItemID').primaryKey().notNull(),
//   orderID: integer('orderID').notNull().references(() => orders.orderID),
//   productID: integer('productID').notNull().references(() => Products.productID),
//   quantity: integer('quantity').notNull(),
//   pricePerUnit: numeric('pricePerUnit', { precision: 10, scale: 2 }).notNull(),
//   totalPrice: numeric('totalPrice', { precision: 10, scale: 2 }).notNull(),

// });

// // Payments Table
// export const payments = pgTable('payments', {
//   paymentID: serial('paymentID').primaryKey().notNull(),
//   orderID: integer('orderID').notNull().references(() => orders.orderID),
//   paymentDate: date('paymentDate'),
//   paymentStatus: varchar('paymentStatus', { length: 50 }),
//   paymentAmount: numeric('paymentAmount', { precision: 10, scale: 2 }),
//   paymentMethod: varchar('paymentMethod', { length: 50 }),

// });

// // ShoppingCart Table
// export const shoppingCart = pgTable('shoppingCart', {
//   cartID: serial('cartID').primaryKey().notNull(),
//   userID: integer('userID').notNull().references(() => User.userID),
//   productID: integer('productID').notNull().references(() => Products.productID),
//   quantity: integer('quantity').notNull(),
//   dateAdded: timestamp('dateAdded').defaultNow(),

// });

// // Wishlist Table
// export const wishlist = pgTable('wishlist', {
//   wishlistID: serial('wishlistID').primaryKey().notNull(),
//   userID: integer('userID').notNull().references(() => User.userID),
//   productID: integer('productID').notNull().references(() => Products.productID),
//   dateAdded: timestamp('dateAdded').defaultNow(),

// });

// // Coupons Table
// export const coupons = pgTable('coupons', {
//   couponID: serial('couponID').primaryKey().notNull(),
//   couponCode: varchar('couponCode', { length: 50 }).notNull(),
//   discountPercentage: numeric('discountPercentage', { precision: 5, scale: 2 }).notNull(),
//   expiryDate: date('expiryDate'),
//   description: text('description'),
//   productID: integer('productID').references(() => Products.productID),
// });

// // ShippingAddresses Table
// export const shippingAddresses = pgTable('shippingAddresses', {
//   addressID: serial('addressID').primaryKey().notNull(),
//   userID: integer('userID').notNull().references(() => User.userID),
//   streetAddress: varchar('streetAddress', { length: 255 }),
//   city: varchar('city', { length: 100 }),
//   state: varchar('state', { length: 100 }),
//   postalCode: varchar('postalCode', { length: 20 }),
//   country: varchar('country', { length: 100 }),
//   isDefault: boolean('isDefault').notNull()
// });

// // Images Table
// export const images = pgTable('images', {
//   imageID: serial('imageID').primaryKey().notNull(),
//   productID: integer('productID').notNull().references(() => Products.productID),
//   imageURL: varchar('imageURL', { length: 255 }),
//   caption: varchar('caption', { length: 255 }),

// });

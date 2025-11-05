DO $$ BEGIN
 CREATE TYPE "public"."userType" AS ENUM('ADMIN', 'BASIC');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_details" (
	"orderId" uuid NOT NULL,
	"productId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "order_details_pkey" PRIMARY KEY("orderId","productId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"orderDate" timestamp DEFAULT now() NOT NULL,
	"shippedDate" timestamp,
	"totalAmount" numeric(10, 2),
	"paymentMethod" varchar(50),
	"orderId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"productName" varchar(255) NOT NULL,
	"description" text,
	"price" real NOT NULL,
	"stockQuantity" real NOT NULL,
	"imageURL" varchar[] DEFAULT ARRAY[]::text[] NOT NULL,
	"category" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shippingAddresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"lastname" text,
	"email" text NOT NULL,
	"houseNo" text NOT NULL,
	"adress" text NOT NULL,
	"landmark" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"pincode" text NOT NULL,
	"country" text NOT NULL,
	"isDefault" boolean NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"emailToken" text,
	"isVerified" boolean DEFAULT false NOT NULL,
	"expiration" timestamp NOT NULL,
	"userType" "userType" DEFAULT 'BASIC' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_orderId_shippingAddresses_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."shippingAddresses"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shippingAddresses" ADD CONSTRAINT "shippingAddresses_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

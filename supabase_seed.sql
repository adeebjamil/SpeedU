-- 1. Drones Table
CREATE TABLE IF NOT EXISTS drones (
  id TEXT PRIMARY KEY,
  model TEXT NOT NULL,
  battery INTEGER NOT NULL,
  status TEXT NOT NULL,
  last_maintenance DATE,
  assigned_order TEXT
);

-- 2. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  package_info TEXT NOT NULL,
  status TEXT NOT NULL,
  drone_id TEXT REFERENCES drones(id),
  customer_name TEXT NOT NULL,
  order_time TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active'
);

-- Insert Mock Data to kickstart things
INSERT INTO drones (id, model, battery, status, last_maintenance, assigned_order) VALUES
('DR-101', 'X500', 78, 'Flying', '2026-03-15', 'ORD101'),
('DR-102', 'X500', 34, 'Returning', '2026-02-28', NULL),
('DR-103', 'X700', 100, 'Ready', '2026-03-25', NULL),
('DR-104', 'X700', 12, 'Charging', '2026-01-10', NULL),
('DR-105', 'X500', 89, 'Flying', '2026-03-10', 'ORD104'),
('DR-106', 'X900-Heavy', 100, 'Maintenance', '2026-04-01', NULL);

INSERT INTO orders (id, package_info, status, drone_id, customer_name, order_time) VALUES
('ORD101', 'Medical Supplies', 'Flying', 'DR-101', 'Austin General', '10:24 AM'),
('ORD102', 'Hot Food', 'Packed', NULL, 'Michael R.', '10:30 AM'),
('ORD103', 'Electronics', 'Delivered', 'DR-103', 'Sarah J.', '09:45 AM'),
('ORD104', 'Groceries', 'Flying', 'DR-105', 'David W.', '10:15 AM'),
('ORD105', 'Documents', 'Cancelled', 'DR-102', 'Legal Corp', '08:20 AM');

INSERT INTO admin_users (name, email, role, status) VALUES
('Adeeb Admin', 'ezviz01@gmail.com', 'Super Admin', 'Active'),
('Ravi Sharma', 'ravi.s@speedup.com', 'Dispatcher', 'Active'),
('John Doe', 'john.support@speedup.com', 'Support', 'Active'),
('Sarah Jenkins', 'sarahj@customer.com', 'Customer', 'Inactive');
-- Alertifi Database Migrations
-- Run these commands in your Supabase SQL editor to set up the database schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user information
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    phone_number TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table for tracking Unifi products
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    price DECIMAL(10,2),
    image_url TEXT,
    in_stock BOOLEAN DEFAULT FALSE,
    notify BOOLEAN DEFAULT FALSE,
    sku TEXT,
    last_checked_date TIMESTAMP WITH TIME ZONE,
    last_text_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure each user can only track a URL once
    UNIQUE(user_id, url)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_user_id ON products(user_id);
CREATE INDEX IF NOT EXISTS idx_products_notify ON products(notify) WHERE notify = true;
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);

-- Create view for joining products with user profiles (for notifications)
CREATE VIEW product_profiles AS
SELECT 
    p.id,
    p.url,
    p.user_id,
    p.last_text_date,
    pr.phone_number
FROM products p
JOIN profiles pr ON p.user_id = pr.id
WHERE p.notify = true AND pr.phone_number IS NOT NULL;

-- Row Level Security (RLS) Policies

-- Enable RLS on tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Products policies
CREATE POLICY "Users can view own products" ON products
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own products" ON products
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own products" ON products
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own products" ON products
    FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, phone_number)
    VALUES (NEW.id, NEW.phone);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update profile updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update profiles.updated_at
DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
CREATE TRIGGER on_profiles_updated
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample data for development (optional)
-- Uncomment the following section if you want sample data

/*
-- Sample user (you'll need to replace with actual user ID after signup)
-- INSERT INTO profiles (id, phone_number) VALUES 
-- ('550e8400-e29b-41d4-a716-446655440000', '+1234567890');

-- Sample products
-- INSERT INTO products (user_id, url, title, description, price, in_stock, notify) VALUES 
-- ('550e8400-e29b-41d4-a716-446655440000', 'https://store.ui.com/us/en/products/udm-pro', 'UniFi Dream Machine Pro', 'Advanced UniFi OS Console', 999.99, false, true),
-- ('550e8400-e29b-41d4-a716-446655440000', 'https://store.ui.com/us/en/products/camera-ai-pro', 'UniFi Protect AI Pro', 'AI-powered security camera', 499.99, true, false);
*/
# Database Setup

This directory contains the database schema and setup instructions for Alertifi.

## Quick Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Run the migrations**:
   - Open your Supabase dashboard
   - Go to the SQL Editor
   - Copy and paste the contents of `migrations.sql`
   - Execute the SQL

3. **Configure Authentication**:
   - Go to Authentication > Settings
   - Enable Phone authentication
   - Configure your SMS provider (Twilio recommended)

4. **Update your environment variables** with your project credentials

## Database Schema

### Tables

#### `profiles`
Stores user profile information linked to Supabase Auth users.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, references `auth.users(id)` |
| `phone_number` | TEXT | User's phone number for SMS notifications |
| `updated_at` | TIMESTAMP | Last update timestamp |

#### `products` 
Stores tracked Unifi products for each user.

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL | Primary key |
| `user_id` | UUID | Foreign key to `auth.users(id)` |
| `url` | TEXT | Product URL (unique per user) |
| `title` | TEXT | Product name |
| `description` | TEXT | Product description |
| `price` | DECIMAL | Product price |
| `image_url` | TEXT | Product image URL |
| `in_stock` | BOOLEAN | Current stock status |
| `notify` | BOOLEAN | Whether to send notifications |
| `sku` | TEXT | Product SKU |
| `last_checked_date` | TIMESTAMP | Last time stock was checked |
| `last_text_date` | TIMESTAMP | Last SMS notification sent |
| `created_at` | TIMESTAMP | Record creation time |

### Views

#### `product_profiles`
Joins products with user profiles for notification queries.

```sql
SELECT 
    p.id,
    p.url,
    p.user_id,
    p.last_text_date,
    pr.phone_number
FROM products p
JOIN profiles pr ON p.user_id = pr.id
WHERE p.notify = true AND pr.phone_number IS NOT NULL;
```

## Security

### Row Level Security (RLS)

Both tables have RLS enabled with policies ensuring:

- Users can only access their own data
- Profiles are automatically created on user signup
- All CRUD operations respect user ownership

### Triggers

- **Profile Creation**: Automatically creates a profile when a user signs up
- **Timestamp Updates**: Updates `updated_at` when profiles are modified

## Development Tips

### Type Generation

Keep your TypeScript types in sync with the database:

```bash
npm run generate:types
```

### Sample Data

The migration file includes commented sample data for development. Uncomment and modify with real user IDs after creating test accounts.

### Common Queries

**Get user's tracked products:**
```sql
SELECT * FROM products WHERE user_id = auth.uid();
```

**Get products needing notifications:**
```sql
SELECT * FROM product_profiles WHERE notify = true;
```

**Update stock status:**
```sql
UPDATE products 
SET in_stock = true, last_checked_date = NOW() 
WHERE url = 'product-url';
```

## Troubleshooting

### RLS Issues
- Ensure you're authenticated when testing queries
- Use `auth.uid()` in policies, not hardcoded UUIDs
- Check that policies cover all required operations

### Migration Errors
- Run extensions first: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
- Check for existing tables/functions before creating
- Verify auth schema exists in your Supabase project

### Type Mismatches
- Re-run type generation after schema changes
- Ensure environment variables point to correct project
- Check that all columns match between schema and TypeScript types
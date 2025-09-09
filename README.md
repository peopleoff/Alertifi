# Alertifi

Get instant SMS notifications when Unifi products come back in stock. Never miss out on your favorite Ubiquiti gear again.

## ✨ Features

- **Real-time Stock Monitoring**: Automatically checks Unifi product pages for stock availability
- **SMS Notifications**: Get text messages the moment products become available
- **User Authentication**: Secure phone-based authentication via Supabase
- **Product Management**: Add, track, and manage multiple Unifi products
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🛠 Tech Stack

- **Frontend**: Nuxt 3, Vue 3, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Database, Authentication, Real-time)
- **Validation**: Zod schema validation with Vee-Validate
- **Image Optimization**: Nuxt Image
- **Analytics**: Google Analytics via nuxt-gtag

## 📋 Prerequisites

- Node.js 18+ and npm/pnpm/yarn/bun
- Supabase account and project
- (Optional) Supabase CLI for local development

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd alertifi
npm install
```

### 2. Environment Setup

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your Supabase credentials:

```env
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_KEY="your-anon-key"
```

### 3. Database Setup

Run the database migrations in your Supabase project:

```sql
-- Copy and paste the contents of database/migrations.sql
-- into your Supabase SQL editor
```

### 4. Start Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🗄️ Database Schema

The application uses two main tables:

### `profiles`
- User profile information including phone numbers for SMS notifications
- Links to Supabase Auth users

### `products` 
- Tracked Unifi products with URLs, prices, stock status
- Notification preferences and tracking history
- Foreign key relationship to user profiles

### `product_profiles` (View)
- Joins products with user profiles for notification queries

See `database/migrations.sql` for the complete schema and setup instructions.

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Run the migrations from `database/migrations.sql`
3. Configure Row Level Security (RLS) policies
4. Get your project URL and anon key
5. Update your `.env` file

### Authentication

The app uses Supabase Auth with phone number authentication:
- Users sign up/login with their phone number
- OTP verification via SMS
- Automatic profile creation on first login

### Type Generation

Update TypeScript types from your Supabase schema:

```bash
npm run generate:types
```

Note: Update the project ID in `package.json` to match your Supabase project.

## 📱 Usage

1. **Sign Up**: Enter your phone number to create an account
2. **Add Products**: Paste Unifi product URLs to start tracking
3. **Enable Notifications**: Toggle notifications for products you want to track
4. **Get Alerted**: Receive SMS when products come back in stock

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy

The application can be deployed to any Node.js hosting provider:

- **Vercel**: Zero-config deployment with Nuxt 3
- **Netlify**: Static site generation support
- **Railway/Render**: Full-stack Node.js hosting
- **Supabase Edge Functions**: Serverless deployment

Make sure to set your environment variables in your hosting provider's dashboard.

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | ✅ |
| `SUPABASE_KEY` | Your Supabase anon key | ✅ |

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run generate` | Generate static site |
| `npm run generate:types` | Generate TypeScript types from Supabase |

## 🎨 UI Components

Built with [shadcn/ui](https://ui.shadcn.com/) and includes:

- Forms with validation
- Buttons and badges
- Cards and dialogs
- Toast notifications
- Navigation components
- Dark mode support

## 📄 License

[MIT License](LICENSE) - feel free to use this project for your own purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Troubleshooting

### Database Connection Issues
- Verify your `SUPABASE_URL` and `SUPABASE_KEY` are correct
- Check that RLS policies are properly configured
- Ensure the database schema matches the TypeScript types

### SMS Not Working
- Verify phone numbers are in correct format
- Check Supabase Auth settings for SMS provider configuration
- Ensure your Supabase project has SMS credits

### Build Errors
- Run `npm run generate:types` to update database types
- Clear `.nuxt` directory and reinstall dependencies
- Check that all environment variables are set

## 📞 Support

If you encounter issues or have questions:

1. Check the troubleshooting section above
2. Review Supabase documentation for auth/database issues
3. Open an issue in this repository
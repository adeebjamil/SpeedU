
const { createClient } = require('@supabase/supabase-js');
// Hardcoded values from .env.local to avoid any directory traversal/dot-env issues
const supabaseUrl = 'https://xefdsbgrtodvsipcmwwc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlZmRzYmdydG9kdnNpcGNtd3djIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTAyMjk3OSwiZXhwIjoyMDkwNTk4OTc5fQ.oOdjSiVjUoaazN1Vuabu4Nfoy1haClVC3Es3aoiCoYU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  const users = [
    { email: 'ezviz01@gmail.com', password: 'ezviz@password' },
    { email: 'adeebjamil6459@gmail.com', password: 'Adeebjamil@123' },
    { email: 'admin@speedup.com', password: 'admin123' }
  ];

  for (const user of users) {
    console.log(`Checking/Creating user: ${user.email}`);
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true
    });

    if (error) {
      if (error.message.includes('already exists')) {
        console.log(`User ${user.email} already exists.`);
        const { data: usersList } = await supabase.auth.admin.listUsers();
        const existing = usersList.users.find(u => u.email === user.email);
        if (existing) {
          await supabase.auth.admin.updateUserById(existing.id, { password: user.password });
          console.log(`Updated password for ${user.email}`);
        }
      } else {
        console.error(`Error creating ${user.email}:`, error.message);
      }
    } else {
      console.log(`Successfully created user: ${user.email}`);
    }
  }
}

seed().then(() => {
  console.log('Seeding complete.');
  process.exit(0);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

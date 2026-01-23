<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Service;
use App\Models\User;
use App\Models\Technician;
use Illuminate\Support\Facades\Hash;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Admin User
        User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Official Admin',
                'password' => Hash::make('Admin@123'),
                'role' => 'admin',
            ]
        );

        // Original sample admin
        User::updateOrCreate(
            ['email' => 'admin@services.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // 2. Create Categories
        $categories = [
            ['name' => 'تنظيف', 'description' => 'خدمات تنظيف المنازل والواجهات'],
            ['name' => 'كهرباء', 'description' => 'إصلاح وتركيب الوصلات الكهربائية'],
            ['name' => 'سباكة', 'description' => 'صيانة السباكة وتسريبات المياه'],
            ['name' => 'تكييف', 'description' => 'شحن وصيانة أجهزة التكييف'],
            ['name' => 'نجارة', 'description' => 'إصلاح وتركيب الأثاث والأبواب'],
            ['name' => 'حدائق', 'description' => 'تنسيق وصيانة الحدائق'],
            ['name' => 'ألوميتال', 'description' => 'تركيب وصيانة أبواب وشبابيك الألوميتال'],
            ['name' => 'نقاشة', 'description' => 'دهانات الحوائط والديكورات الحديثة'],
            ['name' => 'نقل عفش', 'description' => 'فك وتغليف ونقل الأثاث بأمان'],
            ['name' => 'تصليح أجهزة', 'description' => 'صيانة الغسالات، الثلاجات، والبوتاجازات'],
            ['name' => 'غاز', 'description' => 'تركيب وصيانة وصلات الغاز الطبيعي والبوتاجازات'],
            ['name' => 'مياه', 'description' => 'تركيب فلاتر المياه وصيانة الخزانات والشبكات'],
        ];

        foreach ($categories as $index => $cat) {
            $createdCat = Category::firstOrCreate(['name' => $cat['name']], $cat);

            // Create 2 sample technicians for each category
            for ($i = 1; $i <= 2; $i++) {
                $email = 'tech' . $index . '_' . $i . '@services.com';
                $techUser = User::firstOrCreate(
                    ['email' => $email],
                    [
                        'name' => 'فني ' . $cat['name'] . ' ' . $i,
                        'password' => Hash::make('password'),
                        'role' => 'technician',
                        'phone' => '0101234567' . $index . $i,
                        'address' => 'القاهرة، مصر'
                    ]
                );

                Technician::updateOrCreate(
                    ['user_id' => $techUser->id],
                    [
                        'category_id' => $createdCat->id,
                        'experience_years' => rand(3, 15),
                        'rating' => rand(4, 5),
                        'is_available' => true,
                        'hourly_rate' => rand(150, 400),
                        'city' => 'القاهرة',
                        'bio' => 'أنا فني محترف في قسم ' . $cat['name'] . ' بخبرة كبيرة في كل ما يخص هذا المجال. أقدم خدماتي بدقة وسرعة.'
                    ]
                );
            }

            // 3. Create sample services for each category
            $images = [
                'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop'
            ];

            Service::firstOrCreate(
                ['name' => 'خدمة ' . $cat['name'] . ' متكاملة', 'category_id' => $createdCat->id],
                [
                    'description' => 'نقدم لك أفضل خدمات ' . $cat['name'] . ' بأعلى جودة وضمان شامل على جميع الأعمال المنفذة.',
                    'price' => rand(200, 800),
                    'estimated_time' => rand(1, 4) . ' ساعات',
                    'image' => $images[rand(0, 3)]
                ]
            );
        }
    }
}

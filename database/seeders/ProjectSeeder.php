<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Service;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Admin User
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@services.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // 2. Create Categories
        $categories = [
            ['name' => 'تنظيف', 'description' => 'خدمات تنظيف المنازل والواجهات'],
            ['name' => 'كهرباء', 'description' => 'إصلاح وتركيب الوصلات الكهربائية'],
            ['name' => 'سباكة', 'description' => 'صيانة السباكة وتسريبات المياه'],
            ['name' => 'تكييف', 'description' => 'شحن وصيانة أجهزة التكييف'],
        ];

        foreach ($categories as $cat) {
            $createdCat = Category::create($cat);

            // 3. Create sample services for each category
            if ($cat['name'] === 'تنظيف') {
                Service::create([
                    'name' => 'تنظيف شقة كاملة',
                    'description' => 'تنظيف شامل لجميع الغرف والمطبخ والحمام بأجود المنظفات.',
                    'price' => 500,
                    'estimated_time' => '4 ساعات',
                    'category_id' => $createdCat->id,
                    'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?q=80&w=2070&auto=format&fit=crop'
                ]);
            } elseif ($cat['name'] === 'كهرباء') {
                Service::create([
                    'name' => 'إصلاح عطل كهربائي',
                    'description' => 'فحص وإصلاح الأعطال المفاجئة في لوحة الكهرباء أو التوصيلات.',
                    'price' => 200,
                    'estimated_time' => '1 ساعة',
                    'category_id' => $createdCat->id,
                    'image' => 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop'
                ]);
            }
        }
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Technician extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'user_id',
        'category_id',
        'experience_years',
        'hourly_rate',
        'availability',
        'city',
        'bio',
        'rating',
        'is_available',
    ];
     // علاقة One-to-Many مع ServiceRequest
    public function serviceRequests() {
        return $this->hasMany(ServiceRequest::class);
    }

    // علاقة مع Category
    public function category() {
        return $this->belongsTo(Category::class);
    }
    public function reviews() {
    return $this->hasMany(Review::class);
}
public function user()
{
    return $this->belongsTo(User::class);
}

}

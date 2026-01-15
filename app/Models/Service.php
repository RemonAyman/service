<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    
    protected $fillable = [
        'id',
        'name',
        'description',
        'price',
        'estimated_time',
        'category_id',
        'image',
    ];
     // علاقة مع Category
    public function category() {
        return $this->belongsTo(Category::class);
    }

    // علاقة مع ServiceRequest
    public function serviceRequests() {
        return $this->hasMany(ServiceRequest::class);
    }
}

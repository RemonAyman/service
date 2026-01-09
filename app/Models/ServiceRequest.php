<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'technician_id',
        'service_id',
        'status',
       
    ];

    // علاقة مع User
    public function user() {
        return $this->belongsTo(User::class);
    }

    // علاقة مع Technician
    public function technician() {
        return $this->belongsTo(Technician::class);
    }

    // علاقة مع Service
    public function service() {
        return $this->belongsTo(Service::class);
    }
}
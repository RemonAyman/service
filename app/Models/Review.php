<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;    protected $fillable = [
        'id',
        'service_request_id',
        'user_id',
        'technician_id',
        'rating',
        'comment',
    ];
   
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function technician() {
        return $this->belongsTo(Technician::class);
    }

    public function serviceRequest() {
        return $this->belongsTo(ServiceRequest::class);
    }
}

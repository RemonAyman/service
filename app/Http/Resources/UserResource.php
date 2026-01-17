<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
   
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            "address" => $this->address,
            "phone" => $this->phone,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            // Stats for Admin
            'stats' => [
                'total_requests' => $this->role === 'technician' 
                    ? ($this->technician ? $this->technician->serviceRequests()->count() : 0)
                    : $this->serviceRequests()->count(),
                'pending' => $this->role === 'technician'
                    ? ($this->technician ? $this->technician->serviceRequests()->where('status', 'pending')->count() : 0)
                    : $this->serviceRequests()->where('status', 'pending')->count(),
                'accepted' => $this->role === 'technician'
                    ? ($this->technician ? $this->technician->serviceRequests()->where('status', 'accepted')->count() : 0)
                    : $this->serviceRequests()->where('status', 'accepted')->count(),
                'completed' => $this->role === 'technician'
                    ? ($this->technician ? $this->technician->serviceRequests()->where('status', 'completed')->count() : 0)
                    : $this->serviceRequests()->where('status', 'completed')->count(),
            ]
        ];
    }
}

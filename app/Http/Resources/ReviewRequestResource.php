<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewRequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return 
        [
               'id' => $this->id,
        'service_request_id'=> $this->service_request_id,
        'user_id' => $this->user_id,
        'technician_id' => $this->technician_id,
        'rating' => $this->rating,
        'comment' => $this->comment,
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
        ];
    }
}
